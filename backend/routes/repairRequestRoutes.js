const express = require('express');
const {
    createRepairRequest,
    getRepairRequests,
    getRepairRequestById,
    updateRepairRequest,
    deleteRepairRequest,
} = require('../controllers/repairRequestController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', createRepairRequest);
router.get('/', getRepairRequests);
router.get('/:id', getRepairRequestById);
router.put('/:id', updateRepairRequest);
router.delete('/:id', deleteRepairRequest);

module.exports = router;
