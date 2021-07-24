const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3=require('web3');
const{interface,bytecode}=require('./compile');

const provider= new HDWalletProvider(
      'edge reward bike chaos quantum rigid violin kingdom grunt motion heart napkin',
      'https://rinkeby.infura.io/v3/3163ab6bb0504d459cff776cc6c01b5e'
);

const web3 = new Web3(provider);

//Reason to make this function is to use async await
const deploy=async()=>{                
    const accounts=await web3.eth.getAccounts();

    console.log('Attempting to deploy from account',accounts[0] );
    const result =await new web3.eth.Contract(JSON.parse(interface))//interface is ABI
     .deploy({data:bytecode})
     .send({gas:'1000000',from:accounts[0]});
     
     console.log(interface);
     console.log('Contract deployed to ',result.options.address);
};
deploy();
//When node deploy.js throws assert error then check which version of solc u r using.Otherwise follow these steps:
// npm uninstall solc
// npm i --save solc@0.4.17
// node delpoy.js
