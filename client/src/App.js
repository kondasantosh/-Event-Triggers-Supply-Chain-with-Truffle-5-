import React, { Component } from "react";
import itemmanagerContract from "./contracts/Itemmanager.json";
import itemContract from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { Load:false, cost:0 ,itemname:"example_1"};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
       this.networkId = await this.web3.eth.net.getId();
      
      this.itemmanager = new this.web3.eth.Contract(
        itemmanagerContract.abi,
        itemmanagerContract.networks[this.networkId] && itemmanagerContract.networks[this.networkId].address,
      );
      this.item = new this.web3.eth.Contract(
        itemContract.abi,
        itemContract.networks[this.networkId] && itemContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods./
      this.ListenToPayment();
      this.setState({ Load:true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  
  ListenToPayment=()=>{
    let self=this;
    this.itemmanager.events.SupplyChainStep().on("data",async function(evt){
      console.log(evt);
      if(evt.returnValues._step=== "1"){
      let obj=await self.itemmanager.methods.items(evt.returnValues._itemindexed).call();
      console.log(obj);
      alert("item"+obj._identifier+"was paid ,deliver it now");
      }
      console.log(evt);
    });

  }
  
  HandleInputChange=(event) =>{
    const target =event.target;
    const value = target.type==="checkbox"? target.checked : target.value;
    const name=target.name;
    this.setState({
      [name]:value

    })
  }
  handleInputChange=(event) =>{
    const target =event.target;
    const value = target.type==="checkbox"? target.checked : target.value;
    const name=target.name;
    this.setState({
      [name]:value

    })
  }
  handleSubmit = async() =>{
    const {cost,itemname} =this.state;
    console.log(itemname, cost, this.itemManager);
    let result =await this.itemmanager.methods.createitem(itemname,cost).send({from:this.accounts[0]});
    console.log(result);
    alert("Send "+cost+" Wei to "+result.events.SupplyChainStep.returnValues._address);
  }

  render() {
    if (!this.state.Load) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Event Trigger // Supply chain </h1>
        <h2>Items</h2>
        <h2>Add Items</h2>
        Item name:<input type="text" name="itemname" value={this.state.itemname} onChange={this.handleInputChange}/>
        Cost in Wei :<input type="text" name="cost" value={this.state.cost}  onChange={this.HandleInputChange}/>
        <button type="button" onClick={this.handleSubmit}>Create new item</button>
      </div>
    );
  }
}

export default App;
