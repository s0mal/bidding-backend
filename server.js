const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');


// Enable CORS for all routes
app.use(cors());


// Import individual routers and controllers
const userRouter = require('./router/userrouter');
const bidderController = require('./controllers/bidcontroller');
const sellerController = require('./controllers/sellercontroller');
const productRouter = require('./router/productrouter'); // Import the product router

// Main router logic
const mainRouter = express.Router();

// product router
mainRouter.use('/products', productRouter);

// Define routes using controllers
mainRouter.get('/users', userRouter);
mainRouter.post('/users', userRouter);
mainRouter.get('/bids', bidderController.getAllBids);
mainRouter.post('/bids', bidderController.placeBid);
mainRouter.get('/sellers', sellerController.getAllSellers);
mainRouter.post('/sellers', sellerController.createSeller);

// Use the main router
app.use('/api', mainRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});