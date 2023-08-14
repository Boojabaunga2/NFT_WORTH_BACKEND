const Moralis = require("moralis").default;
require('dotenv').config();
const { EvmChain } = require("@moralisweb3/common-evm-utils");

// Initialize Moralis SDK only once
Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
  // ...and any other configuration
});

async function getTransactionsCount(address,collectionAddress) {
  const chain = EvmChain.ETHEREUM;
  const nftTransfers = await Moralis.EvmApi.nft.getNFTContractTransfers({
    address,
    chain,
  });



  const transactionCount = nftTransfers.result.length;

  console.log("Number of transactions:", transactionCount);

  return transactionCount;
}

module.exports = { getTransactionsCount };