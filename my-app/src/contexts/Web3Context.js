import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/contexts/Web3Context.js'
import UNCollaborationArtifact from '../abis/UNCollaboration.json';

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
  const [volunteerKPIs, setVolunteerKPIs] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

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

      // ...

      setLoading(false); 
    };
    loadBlockchainData();
  }, [web3]);

  useEffect(() => {
    const fetchVolunteerKPIs = async () => {
      if (!contract) return;
      setLoading(true); // Set loading state to true

      try {
        const address = '0x98a0Fa7f492282aa06EC2714F388f53d15266fF3';
        const completedTasks = await contract.methods.getCompletedTasks(address).call({ from: account });
        const onTimeCompletionRate = await contract.methods.getOnTimeCompletionRate().call({ from: account });
        const managerRatings = await contract.methods.getManagerRatings().call({ from: account });
        const otherMetrics = await contract.methods.getOtherMetrics().call({ from: account });

        setVolunteerKPIs({
          completedTasks,
          onTimeCompletionRate,
          managerRatings,
          otherMetrics,
        });
    
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching volunteer KPIs:', error);
        setLoading(false);
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

  // Initialize contract
  useEffect(() => {
  const initContract = async () => {
  if (!web3) return;
  const networkId = await web3.eth.net.getId();
  const networkData = UNCollaborationArtifact.networks[networkId];
  if (!networkData) {
    alert('UNCollaboration contract not deployed to detected network.');
    return;
  }
  const uncollaborationContract = new web3.eth.Contract(
    UNCollaborationArtifact.abi,
    networkData.address
  );
  setContract(uncollaborationContract);
};
initContract();
}, [web3]);

useEffect(() => {
if (web3 && account && contract) {
  setLoading(false);
} else {
  setLoading(true);
}
}, [web3, account, contract]);

return (
  <Web3Context.Provider
    value={{
      web3,
      account,
      contract,
      volunteerKPIs,
      loading,
    }}
  >
    {children}
  </Web3Context.Provider>
);
}
