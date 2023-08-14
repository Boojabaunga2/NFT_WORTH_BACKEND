const axios = require('axios');



const apiKey = 'HEZ1Z3959DCDJV5Y1YPZIQQJ1934RSNWRV';

async function getTransactions(address){
const walletAddress = address; // Replace with the actual wallet address

const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;

async function getTransactionsCount() {
    try {
      const response = await axios.get(apiUrl);
      const transactions = response.data.result;
      console.log("transactions", transactions);
  
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
      const twentyFourHoursAgo = currentTime - 24 * 60 * 60;
      console.log("currentTime", currentTime);
      console.log("twentyFourHoursAgo", twentyFourHoursAgo);
  
      const transactionsInLast24Hours = transactions.filter(tx => parseInt(tx.timeStamp) >= twentyFourHoursAgo);
      console.log("transactionsInLast24Hours", transactionsInLast24Hours);
  
      const numberOfTransactions = transactionsInLast24Hours.length;
      console.log("numberOfTransactions", numberOfTransactions);
        
      return numberOfTransactions;
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      throw error;
    }
  }

const getTransaction = getTransactionsCount()
return getTransaction
}
module.exports = { getTransactions }