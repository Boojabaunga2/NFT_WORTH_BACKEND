const { Network, Alchemy } = require('alchemy-sdk');
require('dotenv').config();

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Function to process the collection address and NFT ID
async function Floor(collectionAddress, nftId) {
  try {
    // Print the NFT floor price for a contract
    const floorPrice = await alchemy.nft.getFloorPrice(collectionAddress);

    // Perform additional operations with the inputs

    // Return the result of the processing
    return floorPrice;
  } catch (error) {
    console.error('Error:', error.message);

    // Handle the error and return an appropriate response
    return { success: false,};
  }
}

// Export the processInputs function
module.exports = { Floor };