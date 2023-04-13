import { Web3Provider, useWeb3 } from '../contexts/Web3Context.js';
import { Magic } from 'magic-sdk';
import AppNavbar from './AppNavbar';
import Tasks from './Tasks';
import Task from './Task';
import Projects from './Projects';
import Staking from './Staking';
import ProposeProject from './ProposeProject';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Home from './Home';
import './Styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Navigation.css';
import Dashboard from './Dashboard';
import ProjectContext from './ProjectContext';
import MoonPay from './MoonPay';
import UNCollaborationABI_JSON from '../abis/UNCollaboration.json';
import Badges from "./Badges";

const UNCollaborationAddress = '0xc91844c59e730e5a3cc89ed2a2d42d81238a0062';
const magic = new Magic('pk_live_BFAD4177F785E96E');

const App = () => {
  const { web3, contract: UNCollaborationContract } = useWeb3() || {};
  const [appAccount, setAccount] = useState(null);
  const [collabContract, setCollabContract] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [connected, setConnected] = useState(false);
  const [projects, setProjects] = useState([]);
  const [volunteerAddress, setVolunteerAddress] = useState(null);
  const [poapBadges, setPoapBadges] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initContracts = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const UNCollaboration = new web3.eth.Contract(UNCollaborationABI.abi, UNCollaborationAddress);
        setCollabContract(UNCollaboration);
      }
    };

    initContracts();
  }, [web3]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (UNCollaborationContract) {
        const taskCount = await UNCollaborationContract.methods.getTaskCount().call();
        const fetchedTasks = [];

        for (let i = 0; i < taskCount; i++) {
          const task = await UNCollaborationContract.methods.tasks(i).call();
          fetchedTasks.push(task);
        }

        setTasks(fetchedTasks);
      }
    };

    fetchTasks();
}, [UNCollaborationContract]);

const addTask = async (taskDescription, reward, volunteer) => {
  if (UNCollaborationContract) {
    await UNCollaborationContract.methods
      .addTask(taskDescription, reward, volunteer)
      .send({ from: appAccount }); // Updated to appAccount
  }
};

const completeTask = async (taskIndex) => {
  if (UNCollaborationContract) {
    await UNCollaborationContract.methods
      .completeTask(taskIndex)
      .send({ from: appAccount }); // Updated to appAccount
  }
};

const proposeProject = async (title, description, budget) => {
  if (UNCollaborationContract) {
    await UNCollaborationContract.methods
      .proposeProject(title, description, web3.utils.toWei(budget, 'ether'))
      .send({ from: appAccount }); // Updated to appAccount
  }
};


const [balance, setBalance] = useState(0);
const [stakingPosition, setStakingPosition] = useState(0);

const stakeTokens = async (amount) => {
// Implement your staking functionality here
};

const unstakeTokens = async (amount) => {
// Implement your unstaking functionality here
};

const connectWallet = async () => {
if (window.ethereum) {
try {
await window.ethereum.request({ method: 'eth_requestAccounts' });
const accounts = await web3.eth.getAccounts();
setAccount(accounts[0]);
} catch (error) {
console.log('Error connecting to wallet:', error);
}
} else {
console.log('Please install MetaMask!');
}
};

const disconnectWallet = () => {
setAccount(null);
};
const addProject = (project) => {
  // Add your implementation to add a project
};

const login = async () => {
  if (!appAccount) {
    const user = await magic.auth.loginWithMagicLink({ email: 'your@email.com' });
    setConnected(true);
    setAccount(user.getIssuer()); // set account to the user's Ethereum address
  }
};

const logout = async () => {
  if (appAccount) {
    await magic.user.logout();
    setConnected(false);
    setAccount(null);
  }
};


return (
  <Web3Provider
    value={{
      web3: web3 || null,
      appAccount,
      contract: UNCollaborationContract,
      addTask,
      completeTask,
      proposeProject,
    }}
  >
    <ProjectContext.Provider value={{ projects, addProject }}>
      <div className="App">
        <AppNavbar
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          account={appAccount}
          connected={connected}
        />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home web3={web3} account={appAccount} UNCollaborationContract={UNCollaborationContract} />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task/:id" element={<Task tasks={tasks} completeTask={completeTask} />} />
          <Route path="/projects" element={<Projects web3={web3} account={appAccount} />} />
          <Route path="/staking" element={<Staking stakeTokens={stakeTokens} unstakeTokens={unstakeTokens} balance={balance} stakingPosition={stakingPosition} />} />
          <Route path="/propose-project" element={<ProposeProject />} />
          <Route path="/badges" element={<Badges provider={web3?.currentProvider} volunteerAddress={volunteerAddress} poapBadges={poapBadges} />} />
          <Route path="/moonpay" element={<MoonPay />} />
        </Routes>
      </div>
    </ProjectContext.Provider>
  </Web3Provider>
);
};
export default App;
