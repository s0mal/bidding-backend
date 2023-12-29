// userController.js
// const { User } = require('../models/user');
// const BidController = require('../controllers/bidcontroller');
// const SellerController = require('../controllers/sellercontroller');


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).send('Invalid input');
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send('Email already in use');
    }

    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    // Validate input
    if (!username || !email) {
      return res.status(400).send('Invalid input');
    }

    // Update user details in the database
    const [updatedRows] = await User.update( // here await keyword is used to wait for the promise response to update
      { username, email },
      { where: { id: userId } }
    );

    if (updatedRows === 0) {
      return res.status(404).send('User not found');
    }

    res.send('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user from the database
    const deletedRows = await User.destroy({ where: { id: userId } });

    if (deletedRows === 0) {
      return res.status(404).send('User not found');
    }

    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Retrieve user details by ID from the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getUserBids = async (req, res) => {
  try {
    const userId = req.params.id;

    // Retrieve bids placed by the specific user from the database
    const userBids = await Bid.findAll({ where: { userId } });
    res.json(userBids);
  } catch (error) {
    console.error('Error fetching user bids:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const userId = req.params.id;

    // Retrieve transactions involving the specific user from the database
    const userTransactions = await Transaction.findAll({ where: { userId } });
    res.json(userTransactions);
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    res.status(500).send('Internal Server Error');
  }
};

// ... other controller functions for user-related operations


module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserBids,
  getUserTransactions,
};





