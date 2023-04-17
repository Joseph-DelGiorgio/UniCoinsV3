import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import UNCollaborationArtifact from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/abis/UNCollaboration.json';

// Create Web3 context
export const Web3Context = createContext();
const contract = new web3.eth.Contract(UNCollaborationArtifact.abi, networkData.address);

// Custom hook for easier access to the Web3 context
export function useWeb3() {
  return useContext(Web3Context);
}

// Web3Provider component for managing Web3 state and contracts
export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [volunteerKPIs, setVolunteerKPIs] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

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
      setLoading(true); // Set loading state to true

      // Get accounts
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Get network ID
      const networkId = await web3.eth.net.getId();

      // Load UNCollaboration contract
      if (UNCollaborationArtifact.abi && UNCollaborationArtifact.networks) {
        const collaborationContractData = UNCollaborationArtifact.networks[networkId];
        if (collaborationContractData) {
          const contractInstance = new web3.eth.Contract(UNCollaborationArtifact.abi, collaborationContractData.address);
          setContract(contractInstance);
        } else {
          alert('UNCollaboration contract not deployed on the connected network.');
        }
      } else {
        console.error("UNCollaborationArtifact.abi or UNCollaborationArtifact.networks is not defined");
      }

      setLoading(false); // Set loading state to false
    };

    loadBlockchainData();
  }, [web3]);
  
  // Fetch volunteer KPIs
  useEffect(() => {
    const fetchVolunteerKPIs = async () => {
      if (!contract) return;
      setLoading(true); // Set loading state to true

      try {
        // Replace with the appropriate contract methods and parameters
        const completedTasks = await contract.methods.getCompletedTasks().call({ from: account });
        const onTimeCompletionRate = await contract.methods.getOnTimeCompletionRate().call({ from: account });
        const managerRatings = await contract.methods.getManagerRatings().call({ from: account });
        const otherMetrics = await contract.methods.getOtherMetrics().call({ from: account });

        setVolunteerKPIs({
          completedTasks,
          onTimeCompletionRate,
          managerRatings,
          otherMetrics,
        });

        setLoading(false); // Set loading state to false
      } catch (error) {
        console.error('Error fetching volunteer KPIs:', error);
        setLoading(false); // Set loading state to false
      }
    };

    fetchVolunteerKPIs();
  }, [contract, account]);

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = async (accounts) => {
      setAccount(accounts[0]);
    };
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
    
  }, []);

  // Prepare value for the Web3 context
  const value = {
  web3,
  account,
  contract,
  volunteerKPIs, // Include volunteerKPIs in the context value
  loading,
  };
  
  // Provide the context value to children components
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
  }
