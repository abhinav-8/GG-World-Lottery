//import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react';
import web3 from './web3';
import lottery from './lottery';
class App extends Component {
 state={
   manager:'',
   players:[],
   balance:'',
   value:'',
   message:'',
   //lastWinner:''
 } ;

 async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players=await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    //const lastWinner = await lottery.methods.lastWinner().call();
    this.setState({manager,players,balance});
  }
//this is a way to define method or function,it provides the luxury to not worry about value of 'this'
//it will automatically set the value of 'this' to our component
  onSubmit = async(event) =>{
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message:'Waiting on tranaction success...'});

    await lottery.methods.enter().send({
      from:accounts[0],
      value: web3.utils.toWei(this.state.value,'ether')
    });

    this.setState({message:'You have been entered!'});
  };

  onClick = async() =>{
    const accounts = await web3.eth.getAccounts();


    this.setState({message:'Waiting on transaction success...!'});


    await lottery.methods.pickWinner().send({
       from:accounts[0]
    });
    /*const lastWinner = await lottery.methods.lastWinner().call();
    this.setState({message:'The lottery is won by '+lastWinner});*/
    this.setState({message:'Winner has been picked,check your account balance'});
  };

  render() { 
     return (
      <div className="Header">
        {/* <h2 align="center">Lottery Contract</h2>  */}
       <p>
       <div class="wrapper"> <marquee behavior="alternate"><span class="marquee">This contract is managed by {this.state.manager }.
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether!</span></marquee> </div>
         
        
         </p> 
              
       
        {/* <hr/> */}

        <form onSubmit={this.onSubmit}>
          <h2>Want to try your luck?</h2>
          <div>
            <label><b>Amount of Ether to enter</b></label>
            <br></br> <br></br>
            <input className="Enter"
             value={this.state.value}
             onChange={event => this.setState({value:event.target.value})}
            />
          </div>
          <br></br>
          <button className="button1" ><b>Enter</b></button>
        </form>

    {/* <hr/> */}

          <h4>Ready to pick a winner?</h4>
          <button className="button2"onClick={this.onClick}><b>Pick a winner!</b></button>

        {/* <hr/> */}

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
