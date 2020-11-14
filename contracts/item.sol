//
pragma solidity ^ 0.7.0;

import "./itemmanager.sol";

contract Item{
    uint public priceinwei;
    uint public paidwei;
    uint public index;
    
    Itemmanager parentContract;
    
    constructor(Itemmanager _parentContract,uint _priceinwei,uint _index)
    {
        parentContract=_parentContract;
        priceinwei=_priceinwei;
        index=_index;
    }
    receive() external payable {
        require(msg.value == priceinwei, "We don't support partial payments");
        require(paidwei == 0, "Item is already paid!");
         paidwei += msg.value;
        (bool success,) = address(parentContract).call{value :msg.value}(abi.encodeWithSignature("triggerpayment(uint256)", index));
        require(success, "Delivery did not work");
    }

 fallback () external {

 }

}