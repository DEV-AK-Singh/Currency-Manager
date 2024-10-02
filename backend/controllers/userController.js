const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const platformName = "aks#bank";
    const upiId = req.body.phone + "#" + platformName;
    const newUser = new User({
      upiId: upiId,
      name: req.body.name,
      phone: req.body.phone,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const { password, __v , ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: "User created successfully", user:{ token, ...others }});
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const { password : pw, __v , ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', user:{ token, ...others } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({},{password:0,__v:0});
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if(req.user.id !== id){
      return res.status(401).json({ message: "Unauthorized User Request.." });
    }
    const user = await User.findById(id).select(["-password", "-__v"]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    if(req.user.id !== id){
      return res.status(401).json({ message: "Unauthorized User Request.." });
    }

    const { name, password, balance } = req.body;

    const userUpdateObj = {};
    if(name){
      userUpdateObj.name = name;
    }
    if(password){
      userUpdateObj.password = password;
    }
    if(balance){
      userUpdateObj.balance = balance;
    }

    const updatedUser = await User.findByIdAndUpdate(id, userUpdateObj, { new: true }).select(["-password", "-__v"]);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if(req.user.id !== id){
      return res.status(401).json({ message: "Unauthorized User Request.." });
    }
    // const user = await User.findByIdAndDelete(id);
    const updatedUser = await User.findByIdAndUpdate(id, {
      status: "inactive",
    }, { new: true }).select(["-password", "-__v"]);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

