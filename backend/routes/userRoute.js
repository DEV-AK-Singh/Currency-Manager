const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/jwtHandler');
const { authorizeRoles } = require('../middlewares/roleHandler');

// Route to create a new user (registration)
router.post('/register', userController.createUser);

// Route to login a user (authentication)
router.post('/login', userController.loginUser);

// Route to get users details
router.get('/', protect, authorizeRoles("admin", "user"), userController.getUsers);

// Route to get users details by ID
router.get('/:id', protect, authorizeRoles("admin", "user"), userController.getUser);

// Route to update user details by ID
router.put('/:id', protect, authorizeRoles("admin", "user"), userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', protect, authorizeRoles("admin", "user"), userController.deleteUser);

module.exports = router;
