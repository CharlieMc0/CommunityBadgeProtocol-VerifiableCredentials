
// TODO 
// Setup for Skale - And use SSM 
// Add token creation event to 1155.sol and listen
// Put system in place to prevent duplicate tx/Nonce collisions
// Figure out why pulling from SSM doesn't work and Move params and secrets to SSM 

const endpointURI = "https://rinkeby.infura.io/v3/ca42c79b2cd64cd59b28c04c06df2a6f"
const contractAddress = "0x11660c7bc676E9453C9Aa957eaE55845c9C8D619"
const walletAddress = "0x9D60c7529bcB2510e6e059C52b7Ac538dAB8798A"
const walletPrivateKey = process.env.WALLETPRIVKEY;

const chainId = 4

const Web3 = require('web3')
const web3 = new Web3(endpointURI)

const contractABI = require("./contract-abi.json");

let myContract = new web3.eth.Contract(contractABI, contractAddress);

const AWS = require('aws-sdk');
const ssm = new AWS.SSM();

 async function getP()
 {
    var params = {
        Name: '/ethdenver-hackathon/contract_address', 
        WithDecryption: true
    };
    var request = await ssm.getParameter(params).promise();
    return request.Parameter.Value;          
}

async function getParam()
{
    var resp = await getP();
    console.log(resp);
}



exports.handler = async (event) => {
    // TODO implement
    console.log(event)

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };

    console.log(event["command"])
    
    if (event["command"] == "newBadge") {
        let badgeCreatorAddr = event["newBadgeOptions"]["badgeCreator"]
        let badgeName  = event["newBadgeOptions"]["badgeName"]
        let metadataURI = event["newBadgeOptions"]["metadataURI"] 
        await createNewBadge(walletAddress, badgeName, metadataURI)
    }
    if (event["command"] == "mint") {
        let toAddress = event["mintOptions"]["toAddress"]
        let tokenId  = event["mintOptions"]["tokenId"]
        await mint(toAddress, tokenId);
    }

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
      'maxPriorityFeePerGas': 2999999987,
      'data': myContract.methods.createNewBadge(limit, badgeName, metadataURI).encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, walletPrivateKey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

async function mint(toAddress,tokenID, quantity=1) {
    const nonce = await web3.eth.getTransactionCount(toAddress, 'latest'); //get latest nonce
  
    //the transaction
    const tx = {
      'from': toAddress,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'maxPriorityFeePerGas': 2999999987,
      'data': myContract.methods.mint(toAddress, tokenID, quantity, [] ).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, walletPrivateKey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
  }

// createNewBadge(walletAddress, "JS Badge", "s3.com/metadata1.json")

// mint(walletAddress, 1);


