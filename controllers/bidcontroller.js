// const Bid = require('../models/bid'); // Import the Bid model

const placeBid = async (req, res) => {
  try {
    // Extract relevant data from the request body
    const { productId, userId, amount } = req.body;

    // Validate bid data
    if (!productId || !userId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid bid data' });
    }

    // Save the bid to the database
    const newBid = new Bid({
      productId,
      userId,
      amount,
    });

    const savedBid = await newBid.save();

    res.json(savedBid);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getBidsForProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Retrieve all bids for a specific product from the database
    const bids = await Bid.find({ productId });

    res.json(bids);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getBidsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve all bids placed by a specific user from the database
    const bids = await Bid.find({ userId });

    res.json(bids);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getWinningBidForProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the highest bid for the given product ID
    const winningBid = await Bid.findOne({
      productId: productId,
    }).sort({ amount: -1 }).limit(1);

    if (winningBid) {
      res.json(winningBid);
    } else {
      res.status(404).json({ message: 'No winning bid found for the product.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  placeBid,
  getBidsForProduct,
  getBidsByUser,
  getWinningBidForProduct,
  // ... other controller functions
};


