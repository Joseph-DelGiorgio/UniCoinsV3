import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import UNCollaborationABI from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/abis/UNCollaboration.json';

// Create Web3 context
export const Web3Context = createContext();

// Custom hook for easier access to the Web3 context
export function useWeb3() {
  return useContext(Web3Context);
}

// Web3Provider component for managing Web3 state and contracts
export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();

  // Initialize Web3
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3Instance);
      } else {
        alert('Please install MetaMask to use this app.');
      }
    };
    initWeb3();
  }, []);

  // Load blockchain data
  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!web3) return;

      // Get accounts
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Get network ID
      const networkId = await web3.eth.net.getId();

      // Load UNCollaboration contract
      if (UNCollaborationABI && UNCollaborationABI.networks) {
        const collaborationContractData = UNCollaborationABI.networks[networkId];
        if (collaborationContractData) {
          const contractInstance = new web3.eth.Contract(UNCollaborationABI.abi, collaborationContractData.address);
          setContract(contractInstance);
        } else {
          alert('UNCollaboration contract not deployed on the connected network.');
        }
      } else {
        console.error("UNCollaborationABI or UNCollaborationABI.networks is not defined");
      }
    };

    loadBlockchainData();
  }, [web3]);

  // Prepare value for the Web3 context
  const value = {
    web3,
    account,
    contract,
  };

  // Provide the context value to children components
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}
