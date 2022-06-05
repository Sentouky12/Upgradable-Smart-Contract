pragma solidity 0.8.0;

import "./Storage.sol";

contract BalanceOp is Storage{
// "Forgot to  add" initialize so we can upgrade
// the smart contract later to fix it. 
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  constructor() public {
    owner = msg.sender;
  }

  
  
  

 
  function getBalance(string memory name) public view returns(uint256) {
    return _uintStorage[name];
  }
  function setBalance(string memory name,uint256 toSet) onlyOwner public {
    _uintStorage[name] = toSet;
  }

}
