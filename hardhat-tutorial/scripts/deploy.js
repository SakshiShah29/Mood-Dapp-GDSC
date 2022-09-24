const {ethers}=require("hardhat");

async function main(){
   /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so moodContract here is a factory for instances of our moodContract.
  */
  const moodContract=await ethers.getContractFactory("MoodDiary");
  //here we deploy the contract
  const deployedmoodContract=await moodContract.deploy();

  //wait for it to get deployed
  await deployedmoodContract.deployed()

  console.log("Mood Contract Address:",deployedmoodContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });