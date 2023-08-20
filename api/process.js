
async function process(data){
 
    let last_sale
    let lowerValue
    let valuation


const dataToProcess= data 
console.log("dataToProcess",dataToProcess)
if (dataToProcess.spamornot == true){

return "collection is flagged as scam"

}
else{
    if(dataToProcess.nftsales.data.nftSales.length == 0 ){
        last_sale = false 
        lowerValue = dataToProcess.floorprice.openSea.floorPrice
        console.log(lowerValue)
    }
    else{
        last_sale = dataToProcess.nftsales.data.nftSales[0].sellerFee.amount
        lowerValue = Math.min(dataToProcess.floorprice.openSea.floorPrice, last_sale);
        console.log(lowerValue)

    }
    console.log(lowerValue,"lowervalue")
    rank = dataToProcess.nftRank
    console.log(rank,"rank")
    totalSupply = dataToProcess.totalsupply
    
    percent = rank / totalSupply
    console.log(percent,"percent")
    const deduction =  lowerValue * (percent/100)

    valuation = lowerValue - deduction


    console.log("valuation",valuation)


}
console.log("valuationoutside",valuation)
return valuation


}
module.exports = { process };