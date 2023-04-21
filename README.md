UniCoins V3 is a decentralized collaboration platform for volunteers and non-profit organizations built on the Ethereum blockchain. 
It enables volunteers to earn rewards by completing tasks and contributing to projects, and allows organizations to propose and manage projects.
 
Features:

Decentralized collaboration platform
Task management for volunteers
Project management for organizations
Rewards system for volunteers
Staking and unstaking functionality
Connects with MetaMask wallet
Login and logout functionality with Magic SDK
POAP Badges integration
MoonPay integration for purchasing crypto

Installation:

Clone this repository:
git clone https://github.com/your-repo/UniCoinsV3.git

Navigate to the project directory and install dependencies:
cd UniCoinsV3/my-app
npm install

Start the development server:
npm start

Components:
AppNavbar: Navigation bar for the app

Tasks: Displays the list of tasks available for volunteers

Task: Displays the details of a single task

Projects: Displays the list of projects available for organizations

Staking: Allows users to stake and unstake tokens

ProposeProject: Allows organizations to propose new projects

Home: Home page of the app

Dashboard: Displays volunteer KPIs (Key Performance Indicators)

Badges: Displays POAP badges for the volunteer

MoonPay: Integrates MoonPay for purchasing cryptocurrencies

Contexts:
Web3Context: Provides web3 instance, contract instance, and functions for interacting with the smart contract
ProjectContext: Provides project management-related functionality

Smart Contract
UNCollaboration.sol: Smart contract for managing tasks, projects, and rewards

Dependencies
React
web3
magic-sdk
react-router-dom
@poap-xyz/poap-badge
Note: This project uses MetaMask for wallet connectivity. Please ensure MetaMask is installed in your browser.
