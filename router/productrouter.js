const express = require('express');
const productController = require('../controllers/productController');

// Create a router instance
const router = express.Router();

// Product routes
router.get('/products', productController.getAllProducts);//to get
router.post('/products', productController.createProduct);// to create
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);// to update
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/:id/bids', productController.getProductBids);

// Export the router for use in other files (e.g., mainRouter.js)
module.exports = router;