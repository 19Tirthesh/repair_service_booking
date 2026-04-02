const RepairRequest = require('../models/RepairRequest');
const User = require('../models/User');

const populateRefs = [
    { path: 'customer_id', select: 'name email role' },
    { path: 'technician_id', select: 'name email role' },
];

const resolveCustomerId = async (req) => {
    if (req.user.role === 'admin' && req.body.customer_id) {
        const u = await User.findById(req.body.customer_id);
        if (!u) return { error: 'customer_id not found' };
        return { customerId: u._id };
    }
    return { customerId: req.user._id };
};

const customerIdOf = (doc) => {
    const c = doc.customer_id;
    return c && c._id ? c._id : c;
};

const canView = (req, doc) => {
    if (req.user.role === 'admin' || req.user.role === 'technician') return true;
    return String(customerIdOf(doc)) === String(req.user._id);
};

const createRepairRequest = async (req, res) => {
    try {
        const { issue_title, description, priority, status } = req.body;
        if (!issue_title || !description) {
            return res.status(400).json({ message: 'issue_title and description are required' });
        }

        const { customerId, error } = await resolveCustomerId(req);
        if (error) return res.status(400).json({ message: error });

        const doc = await RepairRequest.create({
            customer_id: customerId,
            issue_title,
            description,
            priority: priority || 'medium',
            status: status || 'open',
        });
        const populated = await RepairRequest.findById(doc._id).populate(populateRefs);
        res.status(201).json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRepairRequests = async (req, res) => {
    try {
        const filter = {};
        if (req.user.role === 'customer') {
            filter.customer_id = req.user._id;
        }
        const list = await RepairRequest.find(filter).populate(populateRefs).sort({ created_at: -1 });
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRepairRequestById = async (req, res) => {
    try {
        const doc = await RepairRequest.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Repair request not found' });
        if (!canView(req, doc)) {
            return res.status(403).json({ message: 'Not authorized to view this request' });
        }
        const populated = await RepairRequest.findById(doc._id).populate(populateRefs);
        res.json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateRepairRequest = async (req, res) => {
    try {
        const doc = await RepairRequest.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Repair request not found' });
        if (!canView(req, doc)) {
            return res.status(403).json({ message: 'Not authorized to update this request' });
        }

        const { issue_title, description, priority, status, technician_id } = req.body;
        const isCustomer = req.user.role === 'customer';
        const isTechOrAdmin = req.user.role === 'technician' || req.user.role === 'admin';

        if (isCustomer) {
            if (String(customerIdOf(doc)) !== String(req.user._id)) {
                return res.status(403).json({ message: 'Not authorized' });
            }
            if (!['open', 'assigned'].includes(doc.status)) {
                return res.status(400).json({ message: 'Cannot edit request in current status' });
            }
            if (issue_title !== undefined) doc.issue_title = issue_title;
            if (description !== undefined) doc.description = description;
            if (priority !== undefined) doc.priority = priority;
        }

        if (isTechOrAdmin) {
            if (issue_title !== undefined) doc.issue_title = issue_title;
            if (description !== undefined) doc.description = description;
            if (priority !== undefined) doc.priority = priority;
            if (status !== undefined) doc.status = status;
            if (technician_id !== undefined) {
                if (technician_id === null || technician_id === '') {
                    doc.technician_id = null;
                } else {
                    const tech = await User.findById(technician_id);
                    if (!tech) return res.status(400).json({ message: 'technician_id not found' });
                    if (tech.role !== 'technician' && tech.role !== 'admin') {
                        return res.status(400).json({ message: 'Assigned user must be a technician or admin' });
                    }
                    doc.technician_id = technician_id;
                }
            }
        }

        await doc.save();
        const populated = await RepairRequest.findById(doc._id).populate(populateRefs);
        res.json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteRepairRequest = async (req, res) => {
    try {
        const doc = await RepairRequest.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Repair request not found' });

        if (req.user.role === 'admin') {
            await doc.deleteOne();
            return res.json({ message: 'Repair request removed', id: doc.id });
        }

        if (req.user.role === 'customer' && String(customerIdOf(doc)) === String(req.user._id)) {
            if (!['open', 'cancelled'].includes(doc.status)) {
                return res.status(400).json({ message: 'Only open or cancelled requests can be deleted by customer' });
            }
            await doc.deleteOne();
            return res.json({ message: 'Repair request removed', id: doc.id });
        }

        return res.status(403).json({ message: 'Not authorized to delete this request' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createRepairRequest,
    getRepairRequests,
    getRepairRequestById,
    updateRepairRequest,
    deleteRepairRequest,
};
