const sdk = require('api')('@alchemy-docs/v1.0#5jjp92zlkv855n7');
require('dotenv').config();


async function nftSale(collectionAddress,nftId){
    try{
    const getSales= sdk.getNFTSales({
    fromBlock: '0',
    toBlock: 'latest',
    order: 'asc',
    contractAddress: collectionAddress,
    tokenId: nftId,
    apiKey: process.env.ALCHEMY_API_KEY
  })

  console.log(getSales)
return getSales
}
catch(err){

    return err
}

}

module.exports = { nftSale };
