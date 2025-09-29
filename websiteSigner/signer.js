
const contractAddress = CONFIG.CONTRACT_ADD;
console.log('cA: ', contractAddress);
//../ en local , ./ en github
const farfe = await fetch(CONFIG.CONTRACT_ABI)
const abiJSON = await farfe.json();
console.log('asfasfasfasfasfasfas');

//For users with no extension just to check list of consent
let web3 = new Web3(CONFIG.BLOCKCHAIN_RPC);
let accounts;
let userAccount;
let contract;
let abicontent;
let firmaValidacion;
let result;
var nonce;

abicontent = abiJSON.abi;
contract = new web3.eth.Contract(abicontent, contractAddress);

async function connectwallet(){
    if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    web3 = new Web3(window.ethereum);

    abicontent = abiJSON.abi;
    contract = new web3.eth.Contract(abicontent, contractAddress);

    try {  // Request account access  
        await window.ethereum.enable(); 
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        console.log("Connected account:", userAccount);
    } catch(e) {  
        console.log("User denied account connection: ", e);
    }
    }else {
        console.log("Please install MetaMask!");
    }
}

document.getElementById('connect_wallet').addEventListener('click', async() => {
    console.log('MetaMaskasfasf !');

   connectwallet();
  }
);


async function firmaNonce(holdervalue){
    nonce = await contract.methods.getNonce(holdervalue).call({from: userAccount});
  
    const hashCodeCert = web3.utils.keccak256(nonce);
    console.log("buenast tardes,", hashCodeCert, nonce);
  
    try {
    let signature = await web3.eth.personal.sign(hashCodeCert, userAccount, "");
  
    let { r, s, v } = parseSignature(signature);
    firmaValidacion = {
      _hashCodeCert: hashCodeCert,
      _r: r,
      _s: s,
      _v: v
    };
      console.log('FirmaValidacion:', firmaValidacion);
      return firmaValidacion;
    } catch (error) {
      console.error("Signing failed:", error);
    }
  }

  function parseSignature(signature) {
    let r = "0x" + signature.slice(2, 66);
    let s = "0x" + signature.slice(66, 130);
    let v = parseInt(signature.slice(130, 132), 16);
    if (v < 27) v += 27;  // Ensure v is 27 or 28
  
    return { r, s, v };
  }


//// CONTRACT FUNCTIONALITIES


document.getElementById('signature_verification').addEventListener('click', async() => {

    firmaValidacion = await firmaNonce(userAccount);

    try{
        console.log(userAccount, firmaValidacion);
        result = await contract.methods.verifyAccess(firmaValidacion).call({
          from: userAccount});
        console.log('resultado', result);
        console.log("User has permission to access data:", result);
        document.getElementById('permission_access').innerHTML = result;
        if (result) {
            document.body.innerHTML = "<h1 style='text-align:center;'>GAVIN-TULACIONES!! YOU CAN ACCESS THE DATA YOU WERE GIVEN ACCESS TO!!</h1>";
    
        } else {
            console.log("No permission access found.");
            document.body.innerHTML = "<h1 style='text-align:center;'>USER NOT ALLOWED TO FETCH DATA!!</h1>";

        }
        
    
      }catch (error) {
        console.error('Check permission failed: ', error);
      }

       
    });