pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract NongjiToken is ERC20 {

  /////////////////////////////////////////
  // ERC20
  string public name = "NongjiToken";
  string public symbol = "NGJ";
  uint8 public decimals = 3;
  uint public INITIAL_SUPPLY = 10000000;

  constructor() public {
    _mint(msg.sender, INITIAL_SUPPLY);
  }

  /////////////////////////////////////////
  // for test set,get
  uint storedNum = 0;
  string storedTxt = "";

  function setNum(uint value) public {
    storedNum = value;
  }

  function getNum() public view returns (uint) {
    return storedNum;
  }
  
  function setTxt(string memory value) public {
    storedTxt = value;
  }

  function getTxt() public view returns (string memory) {
    return storedTxt;
  }
  
  /////////////////////////////////////////
  // business logic

}
