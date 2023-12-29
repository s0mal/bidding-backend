const express = require('express');
const router = express.Router();

// Importing userController, bidderController, and sellerController
const userController = require('../controllers/usercontroller');
const bidderController = require('../controllers/biddercontroller');
const sellerController = require('../controllers/sellercontroller');

// User routes
router.get('/users', userController.getAllUsers); // GET request to fetch all users
router.post('/users', userController.createUser); // POST request to create a new user
router.get('/users/:id', userController.getUserById); // GET request to fetch user by ID
router.put('/users/:id', userController.updateUser); // PUT request to update user details by ID
router.delete('/users/:id', userController.deleteUser); // DELETE request to delete user by ID
router.get('/users/:id/bids', userController.getUserBids); // GET request to fetch bids for a specific user
router.get('/users/:id/transactions', userController.getUserTransactions); // GET request to fetch transactions for a specific user

// Bidder routes
router.post('/bidders', bidderController.createBidder); // POST request to create a new bidder
router.put('/bidders/:id', bidderController.updateBidder); // PUT request to update bidder details by ID
router.delete('/bidders/:id', bidderController.deleteBidder); // DELETE request to delete bidder by ID

// Seller routes
router.get('/sellers', sellerController.getAllSellers); // GET request to fetch all sellers
router.post('/sellers', sellerController.createSeller); // POST request to create a new seller
router.get('/sellers/:sellerId', sellerController.getSellerById); // GET request to fetch seller by ID

// Exporting the router to be used in other files
module.exports = router;