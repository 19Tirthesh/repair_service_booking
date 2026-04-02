const mongoose = require('mongoose');

const repairRequestSchema = new mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        technician_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        issue_title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        priority: {
            type: String,
            required: true,
            enum: ['low', 'medium', 'high', 'urgent'],
            default: 'medium',
        },
        status: {
            type: String,
            required: true,
            enum: ['open', 'assigned', 'in_progress', 'completed', 'cancelled'],
            default: 'open',
        },
        created_at: { type: Date, default: Date.now },
    },
    { collection: 'repair_request' }
);

module.exports = mongoose.model('RepairRequest', repairRequestSchema);
