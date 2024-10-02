const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const { nanoid }= require("nanoid");

exports.createTransaction = async (req, res) => {
  console.log(req.body);
  try {
    const { fromUser, toUser, amount } = req.body;
    const txnId = nanoid(10);
    // Check if both users exist
    const sender = await User.findOne({upiId: fromUser});
    const receiver = await User.findOne({upiId: toUser});
    if(!sender._id.equals(req.user._id)) {
      return res.status(401).json({ message: "Unauthorized Transaction Request.." });
    }
    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create the transaction
    const transaction = new Transaction({
      transactionId: txnId,
      fromUser: sender._id,
      toUser: receiver._id,
      amount,
      transactionDate: new Date().toLocaleString(),
    });
    await transaction.save();
    await User.findOneAndUpdate({ upiId: fromUser }, { $inc: { balance: -amount } });
    await User.findOneAndUpdate({ upiId: toUser }, { $inc: { balance: amount } });
    await Transaction.findOneAndUpdate({ transactionId: txnId }, { status: "success" });
    res.status(201).json({ message: "Transaction created", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    // Find the transaction and update the status
    const transaction = await Transaction.findByIdAndUpdate(id, { status }, { new: true });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction status updated", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction status", error });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    if(!req.user._id.equals(userId)) {
      return res.status(401).json({ message: "Unauthorized Transaction Request.." });
    }
    const transactions = await Transaction.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    }).populate("fromUser toUser", "name upiId phone").sort({ transactionDate: -1 });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    await transaction.remove();
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error });
  }
};