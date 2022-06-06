pragma solidity 0.8.0;

contract Storage {
  uint256 public i;
  mapping (address => uint256) _addressx2storage;
  mapping (string => uint256) _uintStorage;
  mapping (string => address) _addressStorage;
  mapping (string => bool) _boolStorage;
  mapping (string => string) _stringStorage;
  mapping (string => bytes4) _bytesStorage;
  mapping (uint256 => uint256) _uint2Storage;
  address public owner;
  bool public _initialized;
}
