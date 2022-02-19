
// TODO 
// Use SSM instead of Env Variables
// Add listen for ERC1155 events
// Put system in place to prevent duplicate tx/Nonce collisions -- Test concurrency
// Better error handling

let endpointURI;
let contractAddress;
let walletAddress;
let walletPrivateKey;
let chainId;

let chain ="SKALE"

if (chain == "RINKEBY"){
    endpointURI = "https://rinkeby.infura.io/v3/ca42c79b2cd64cd59b28c04c06df2a6f"
    contractAddress = "0x11660c7bc676E9453C9Aa957eaE55845c9C8D619"
    walletAddress = "0x9D60c7529bcB2510e6e059C52b7Ac538dAB8798A"
    walletPrivateKey = process.env.ETHWALLETPRIVKEY;
    chainId = 4;
}

if (chain == "SKALE"){
    endpointURI = "wss://hack-proxy-0.skalenodes.com/v1/ws/glamorous-tania-australis"
    contractAddress = "0x0551454F5BDc71c26eFE37EB3344484200423923"
    walletAddress = "0x5F3feb74f82C5c7033Cf9135eb44672DB84D48f6"
    walletPrivateKey = process.env.SKALEPRIVKEY;
    chainId = 1;
}

const Web3 = require('web3')
const web3 = new Web3(endpointURI)

const contractABI = require("./contract-abi.json");

let myContract = new web3.eth.Contract(contractABI, contractAddress);

// Not currently working 
// const AWS = require('aws-sdk');
// const ssm = new AWS.SSM();
//  async function getP()
//  {
//     var params = {
//         Name: '/ethdenver-hackathon/contract_address', 
//         WithDecryption: true
//     };
//     var request = await ssm.getParameter(params).promise();
//     return request.Parameter.Value;          
// }

// async function getParam()
// {
//     var resp = await getP();
//     console.log(resp);
// }


exports.handler = async (event) => {
    console.log(event)
    
    if (event["command"] == "newBadge") {
        let badgeCreatorAddr = event["newBadgeOptions"]["badgeCreator"]
        let badgeName  = event["newBadgeOptions"]["badgeName"]
        let metadataURI = event["newBadgeOptions"]["metadataURI"] 
        await createNewBadge(walletAddress, badgeName, metadataURI)
    }
    else if (event["command"] == "mint") {
        let toAddress = event["mintOptions"]["toAddress"]
        let tokenId  = event["mintOptions"]["tokenId"]
        await mint(toAddress, tokenId);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Executed successfully'),
    };
    return response;

};

async function createNewBadge(badgeCreatorAddr, badgeName, metadataURI, limit=0) {
    const nonce = await web3.eth.getTransactionCount(badgeCreatorAddr, 'latest'); //get latest nonce
  
    //the transaction
    const tx = {
      'from': badgeCreatorAddr,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
    //   'maxPriorityFeePerGas': 2999999987,
      'data': myContract.methods.createNewBadge(limit, badgeName, metadataURI).encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, walletPrivateKey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

async function mint(toAddress, tokenID, quantity=1) {
    const nonce = await web3.eth.getTransactionCount(toAddress, 'latest'); //get latest nonce
  
    //the transaction
    const tx = {
      'from': toAddress,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
    //   'maxPriorityFeePerGas': 2999999987,
      'data': myContract.methods.mint(toAddress, tokenID, quantity, [] ).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, walletPrivateKey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
  }

// createNewBadge(walletAddress, "JS Badge", "s3.com/metadata1.json")

// mint(walletAddress, 1);



