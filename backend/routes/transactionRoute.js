const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect } = require('../middlewares/jwtHandler');
const { authorizeRoles } = require('../middlewares/roleHandler');

// Route to create a new transaction
router.post('/', protect, authorizeRoles("admin","user"), transactionController.createTransaction);

// Route to get all transactions for a specific user
router.get('/:userId', protect, authorizeRoles("admin","user"), transactionController.getUserTransactions);

// Route to update a transaction's status
router.put('/:id', protect, authorizeRoles("admin"), transactionController.updateTransactionStatus);

// Route to delete a transaction
router.delete('/:id', protect, authorizeRoles('admin'), transactionController.deleteTransaction);

module.exports = router;