const { defaultAccounts } = require('ethereum-waffle');
const { hexStripZeros, getAddress } = require('ethers/lib/utils');
const { ethers } = require('hardhat');

async function main () {


const BalanceOp = await ethers.getContractFactory('BalanceOp');
 console.log('Deploying BalanceOp. . .');
 const balanceop=await BalanceOp.deploy();
 await balanceop.deployed();
 console.log('BalanceOp deployed to:', balanceop.address);
 const Proxy = await ethers.getContractFactory('Proxy');
 console.log('Deploying Proxy. . .');
 const proxy=await Proxy.deploy(balanceop.address);
 await proxy.deployed();
 console.log('Proxy deployed to:', proxy.address);



  //Create Proxy Balance to Fool HardHat
 var proxybalance = await hre.ethers.getContractAt("BalanceOp",proxy.address);
 

  //Set the balance through the proxy
  await proxybalance.setBalance("John",100);
  await proxybalance.setBalance("Larissa",5000);
 
  //Tested 
  var account = await proxybalance.getBalance("John");
  console.log("Before update: " + account);
  account = await proxybalance.getBalance("Larissa");
  console.log("Before update: " + account);


  //Deploy new version of balance

  const BalanceOpUpdated = await ethers.getContractFactory('BalanceOpUpdated');
  const balanceopupdated=await BalanceOpUpdated.deploy();
  proxy.upgrade(balanceopupdated.address);

  //Fool HardHat once again. It now thinks proxybalance has all functions.
  proxybalance = await hre.ethers.getContractAt("BalanceOpUpdated",proxy.address);
  //Initialize proxy state.
 
    

  proxybalance.initialize("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");



  //Check so that storage remained
  account = await proxybalance.getBalance("John");
  console.log("After update: " + account);
  account = await proxybalance.getBalance("Larissa");
  console.log("After update: " + account);


  //Set the balance through the proxy with NEW FUNC CONTRACT

  //Check so that setBalance worked with new func contract.
  await proxybalance.setBalance("John",200);
  await proxybalance.setBalance("Larissa",10000);
  account = await proxybalance.getBalance("John");
  console.log("After change: " + account);
  account = await proxybalance.getBalance("Larissa");
  console.log("After change: " + account);


}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });