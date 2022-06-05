pragma solidity 0.8.0;

import "./BalanceOp.sol";

contract BalanceOpUpdated is BalanceOp {

  constructor() public {
    initialize(msg.sender);
  }

  function initialize(address _owner) public {
    require(!_initialized);
    owner = _owner;
    _initialized = true;
  }
}