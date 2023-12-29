const processTransaction = async (req, res) => {
    try {
      // Assume you have models for User, Product, and Transaction
      const { userId, productId, amount } = req.body;
  
      // Logic to update product status, user balances, etc.
      // For example, create a new transaction record
      const transaction = await Transaction.create({
        userId,
        productId,
        amount,
        status: 'success', // Assuming a successful transaction
      });
  
      // Send a success response
      res.status(200).json(transaction);
    } catch (error) {
      // Handle any errors that occurred during the transaction processing
      console.error('Error processing transaction:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  const getTransactionsForUser = async (req, res) => {
    try {
      // Assume you have models for User and Transaction
      const userId = req.params.userId;
  
      // Logic to get all transactions for a specific user
      const transactions = await Transaction.findAll({
        where: { userId },// here userid column matches the userid variable
      });
  
      // Send the list of transactions as a response
      res.status(200).json(transactions);
    } catch (error) {
      // Handle any errors that occurred during the retrieval of transactions
      console.error('Error getting transactions for user:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  module.exports = {
    processTransaction,
    getTransactionsForUser,
  };








// const processTransaction = (req, res) => {
//     //  process a successful transaction
//     // For example, update product status, user balances, etc.
//     res.send('Process transaction');
//   };
  
//   const getTransactionsForUser = (req, res) => {
//     //  get all transactions for a specific user
//     // For example, retrieve a list of user transactions
//     res.send('Get transactions for user');
//   };
  
  
  
//   module.exports = {
//     processTransaction,
//     getTransactionsForUser,

//   };