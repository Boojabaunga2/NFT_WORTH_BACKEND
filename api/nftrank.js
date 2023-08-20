const { Network, Alchemy } = require('alchemy-sdk');
require('dotenv').config();
const sdk = require('api')('@nftport/v0#1900g1olewpx69w');
sdk.auth(process.env.NFTPORT_API_KEY);

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Function to process the collection address and NFT ID
async function Rank(collectionAddress, nftId) {
  try {
    const total=await sdk.retrieveContractNfts({
      chain: 'ethereum',
      page_number: '1',
      page_size: '1',
      include: 'metadata',
      refresh_metadata: 'false',
      contract_address: collectionAddress
    })
    // Print the NFT floor price for a contract
    const contractMetadata = await alchemy.nft.getContractMetadata(collectionAddress);
    console.log('contractMetadata', contractMetadata);
    const totalSupply = total.data.total
    const rarity = await alchemy.nft.computeRarity(collectionAddress, nftId);
    console.log(rarity)
    const computeRank = (rarity, totalSupply) => {
        let rank = 0;
        for (const key in rarity) {
          rank += rarity[key].prevalence;
        }
        rank = (rank / rarity.length) * totalSupply;
        return rank
    };
    const rank = computeRank(rarity, totalSupply);

    // Perform additional operations with the inputs

    // Return the result of the processing
    return {
      "totalsupply":totalSupply,
      "rank" : rank

    };
  } catch (error) {
    console.error('Error:', error.message);

    // Handle the error and return an appropriate response
    return { success: false};
  }
}

// Export the processInputs function
module.exports = { Rank };