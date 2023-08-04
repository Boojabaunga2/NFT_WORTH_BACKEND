const { Network, Alchemy } = require('alchemy-sdk');
require('dotenv').config();

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Function to process the collection address and NFT ID
async function isSpam(collectionAddress, nftId) {
  try {
    // Print the NFT floor price for a contract
    const Spam = await alchemy.nft.isSpamContract(collectionAddress);
    console.log('isSpam', Spam);
    return Spam
  } catch (error) {
    console.error('Error:', error.message);

    // Handle the error and return an appropriate response
    return { success: false};
  }
}

// Export the processInputs function
module.exports = { isSpam };