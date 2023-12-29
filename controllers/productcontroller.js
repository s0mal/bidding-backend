const getAllProducts = async (req, res) => {
    try {
      // Assuming you have a Sequelize model named 'Product'
      // Fetch all products from the database
      const products = await Product.findAll();
      // Send the list of products as a JSON response
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle errors and send an Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  };
  
  const createProduct = async (req, res) => {
    try {
      // Assuming you have a Sequelize model named 'Product'
      // Create a new product in the database using data from the request body
      const { name, description, price } = req.body;
      const newProduct = await Product.create({ name, description, price });
      // Send the newly created product as a JSON response
      res.json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle errors and send an Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  };
  
  const getProductById = async (req, res) => {
    try {
      // Assuming you have a Sequelize model named 'Product'
      const productId = req.params.id;
      // Fetch a product by ID from the database
      const product = await Product.findByPk(productId);
      if (product) {
        // Send the product details as a JSON response
        res.json(product);
      } else {
        // If no product is found, send a 404 status and message
        res.status(404).send('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      // Handle errors and send an Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      // Assuming you have a Sequelize model named 'Product'
      const productId = req.params.id;
      // Update product details in the database based on data from the request body
      const { name, description, price } = req.body; // here the req body is the request sent by client from frontend
      const [updatedRows] = await Product.update( // here sequelize 'update' is used
        { name, description, price },// here new name, new description, new price is updated
        { where: { id: productId } } // where id column matches the productid
      );
      if (updatedRows > 0) {
        // If at least one row is updated, send a success message
        res.send('Product updated successfully');
      } else {
        // If no rows are updated, the product was not found
        res.status(404).send('Product not found');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      // Handle errors and send an Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      // Assuming you have a Sequelize model named 'Product'
      const productId = req.params.id;
      // Delete a product from the database based on its ID
      const deletedRows = await Product.destroy({ where: { id: productId } });
      if (deletedRows > 0) {
        // If at least one row is deleted, send a success message
        res.send('Product deleted successfully');
      } else {
        // If no rows are deleted, the product was not found
        res.status(404).send('Product not found');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle errors and send an Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  };
  
  const getProductBids = async (req, res) => {
    try {
      // Assuming you have a Sequelize model named 'Bid' and a proper association between Product and Bid
      const productId = req.params.id;
      // Fetch all bids for a specific product from the database
      const product = await Product.findByPk(productId, { include: Bid });
      if (product) {
        // Access the bids associated with the product
        const bids = product.Bids || [];
        // Send the list of bids for the product as a JSON response
        res.json(bids);
      } else {
        // If no product is found, send a 404 status and message
        res.status(404).send('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product bids:', error);
      // Handle errors and send an Internal Server Error response
      res.status(500).send('Internal Server Error');
    }
  };
  
  // ... other controller functions for product-related operations
  
  module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductBids,
    // ... other controller functions
  };