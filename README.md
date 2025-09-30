- As the issuer, deploy the smart contract GAVINNFT with initial_owner being the issuer's address.
- Deploy the website on a specific URI.
- After that, mint the next NFT with the choosen URI as metadata and to: holder's address. It will return the NFT ID.

For vanilla version:
- Third parties can consult the tokenURI with the NFT ID on tokenURI(uint256 tokenID)
- Once accessed, they have to enter their address on username and their own password to access it and identify themselves.
- If they are allowed to view the data, it will be shown to them; else a warning will appear.


For onchain access version:
- As the issuer, deploy AccesosNFT.sol with holder = the address of the holder of the NFT which access is going to be controlled.
- As the holder, give permission = true to a verifier address.
- Third parties can consult the tokenURI with the NFT ID on tokenURI(uint256 tokenID)
- When accessing the URI, they will be prompted to connect their wallet
- When verifying the access they will sign a transaction in order to do so
- If they have access, they will see the data, else they won't.

## Sepolia
- GAVINNFT.sol: 0x8730Bc786060d20eA57E691f19196C460bc5E8B4 
- AccesosNFT.sol: 0xC7cE6B5CcFbCE95574a0970A3aD348E887540E59

## Ethereum 
- GAVINNFT.sol: 0x63FA89eD879179743B332aCC13a7556E94d14e6c 
- AccesosNFT.sol: 0xDCE176Ca20F545286EFA1b4afcfb4D7CCE1AA463
## Polygon 
- GAVINNFT.sol: 0x84887D6979F87B82230307eFE0F4A54C024a0990 
- AccesosNFT.sol: 0x7c177Bdc428D80d95d53Fd39bdF5dca56eB22E92
## Arbitrum 
- GAVINNFT.sol: 0xA940aa59D0a9f58C5b8ffB47Cc76cc6343bB2C40
- AccesosNFT.sol: 0xf8b841dc2680C7aecB0d841e716Ecd1D3BfF7bD2


## config.js
  - CONTRACT_ADD: Contract Address in the deployed chain.
  - CONTRACT_ABI: Route to where the JSON containing the ABI of the deployed contract is, by default '../abi/AccesosNFT.json'
  - BLOCKCHAIN_RPC: RPC used to connect to the blockchain where the smart contract was deployed

