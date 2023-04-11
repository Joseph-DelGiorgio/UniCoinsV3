require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require("@nomicfoundation/hardhat-chai-matchers");
require('dotenv').config();

const { GOERLI_PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
