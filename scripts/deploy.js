const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying the contract with the account:", deployer.address);

  const UNCollaboration = await ethers.getContractFactory("UNCollaboration");
  const unCollaboration = await UNCollaboration.deploy();

  console.log("UNCollaboration contract address:", unCollaboration.address);
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
