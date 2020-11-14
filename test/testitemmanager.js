const itemmanager = artifacts.require("./itemmanager.sol");

contract("itemmanager",accounts=>{
    it("...should be able to add an item",async function(){

        const itemManagerInstance= await itemmanager.deployed();
        const itemName="test1";
        const itemPrice=500;

       const result=await itemManagerInstance.createitem(itemName,itemPrice,{from:accounts[0]}); 
       console.log(result.logs[0].args);
       assert.equal(result.logs[0].args._itemindexed, 0, "There should be one item index in there");
       
       const item = await itemManagerInstance.items(0);
       console.log(item);
       assert.equal(item._identifier, itemName, "The item has a different identifier");

    })
})