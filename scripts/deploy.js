const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const YourContract = await hre.ethers.getContractFactory("UNCollaboration");
  const yourContract = await YourContract.deploy();

  await yourContract.deployed();

  console.log("UNCollaboration deployed to:", yourContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


/* 
npm install --save-dev @openzeppelin/contracts
npm install --save-dev ethers
*/
