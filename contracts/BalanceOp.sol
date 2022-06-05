pragma solidity 0.8.0;

import "./Storage.sol";

contract BalanceOp is Storage{

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
  function setBalance(string memory name,uint256 toSet) public {
    _uintStorage[name] = toSet;
  }

}