pragma solidity ^ 0.7.0;

contract Ownable{
    //defining owner variable for later use
    address public owner;
    //creating constructor to assign owner's address
    constructor(){
        owner=msg.sender;
    }
    //creating modifier so that later defined functions is only for owner use
    modifier Onlyowner(){
        require(owner==msg.sender,"Your not the owner");
        _;
    }
    //Defining a function which returns bool of  owners address
    
    function isowner() public view returns(bool){
      return (owner==msg.sender);
    }
    
    
}