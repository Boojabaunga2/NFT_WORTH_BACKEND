const { Core } =  require('@quicknode/sdk')
require('dotenv').config();



const core = new Core({
  endpointUrl: "https://special-responsive-film.discover.quiknode.pro/5b06e6610f4e4e9469a3c3eaccc69f5d370cbc6e",
})
async function soldOut(collectionAddress) {
    try {
      // Print the NFT floor price for a contract
      const sold = await core.client
      .qn_fetchNFTCollectionDetails({
        contracts: [collectionAddress],
      })
      console.log('soldoutornot', sold);
      return Spam
    } catch (error) {
      console.error('Error:', error.message);
  
      // Handle the error and return an appropriate response
      return { success: false};
    }
  }
  
  // Export the processInputs function
  module.exports = { soldOut };
