//
pragma solidity ^ 0.7.0;

import "./item.sol";
import "./ownable.sol";

contract Itemmanager is Ownable{
    
    enum SupplyChainSteps{Created,Paid,Deliverd}
    
    struct N_items{
        Item _item;
        Itemmanager.SupplyChainSteps _steps;
        string _identifier;
    } 
    
    mapping(uint => N_items) public items;
    uint index;
    
    event SupplyChainStep(uint _itemindexed ,uint _step,address _address);
    
    function createitem(string memory _identifiers,uint _priceinweis) public Onlyowner{
        Item item =new Item(this,_priceinweis,index); 
        items[index]._item=item;
        items[index]._identifier=_identifiers;
        items[index]._steps=SupplyChainSteps.Created;
        emit SupplyChainStep(index,uint(items[index]._steps),address(item));
        index++; 
    }
    
    function triggerpayment(uint256 _index) public payable{
        Item item=items[_index]._item;
        require(address(item)==msg.sender,"Only items are allowed to update themselves");
        require(item.priceinwei()==msg.value,"Not Fully Paid yet");
        require(items[_index]._steps==SupplyChainSteps.Created,"Item is further in the supplychain");
        items[_index]._steps=SupplyChainSteps.Paid;
        emit SupplyChainStep(_index,uint(items[_index]._steps),address(item));
    }
    
    function triggerDelivery(uint _index) public Onlyowner{
         require(items[_index]._steps==SupplyChainSteps.Paid,"Item is further in the supplychain");
        items[_index]._steps=SupplyChainSteps.Deliverd;
         emit SupplyChainStep(_index,uint(items[_index]._steps),address(items[_index]._item));
    }
    
    
}
