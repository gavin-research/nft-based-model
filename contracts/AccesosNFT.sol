// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Strings.sol";
//0xF558d4CDEF7AD329430315F7b03983d2A67148f6 holder
//dio a acceso a 0x8CfD243eCcfAE1FF8899369A8CA9A024253D69E3
//en sepolia  0xC7cE6B5CcFbCE95574a0970A3aD348E887540E59
contract AccesosNFT {

    mapping(address => uint256) private nonce_sign; 
    mapping(address => bool) private access;

    address public holder_data;

    struct SignatureRSV {
        bytes32 _hashCodeCert;
        bytes32 _r;
        bytes32 _s;
        uint8 _v;
    }

    event AccessPermission(address verifier, bool access);

    constructor(address _holder_data){
        holder_data = _holder_data;
    }

    modifier onlyHolder(address _add){
        require(_add == holder_data);
        _;
    }

    ///// Signer check /////
    function _getSigner(SignatureRSV memory signed) internal pure returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, signed._hashCodeCert));
        address signer = ecrecover(prefixedHashMessage, signed._v, signed._r, signed._s);        
        
        return signer;
    }

/// get Nonce for signatures //
    function getNonce(address holder) public view returns (uint256){
        return nonce_sign[holder];
    }

    function verifyAccess(SignatureRSV calldata signed) public view returns (bool){
        address signer = _getSigner(signed);  
        require(msg.sender == signer, "Message Sender does not have access to this wallet account");
        require(signed._hashCodeCert == keccak256(abi.encodePacked(Strings.toString(nonce_sign[signer]))), "Wrong signature. Access denied - Authentication Failed");

        return access[msg.sender];
    }

    function modifyAccess(address _verifier, bool _access) public onlyHolder(msg.sender){
        emit AccessPermission(_verifier, _access);
        access[_verifier] = _access;
    }
}