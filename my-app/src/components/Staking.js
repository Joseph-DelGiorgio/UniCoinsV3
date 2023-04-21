import React, { useState, useContext } from "react";
import { Web3Context } from "../contexts/Web3Context.js";
import "/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/Staking.css";
import Dashboard from "./Dashboard";
import ProjectContext from "./ProjectContext.js";
import UNCollaborationABI_JSON from '../abis/UNCollaboration.json';



//import { Contract } from "@ethersproject/contracts";

const Staking = ({ balance, stakingPosition }) => {
  const { UNCollaborationContract, account, web3 } = useContext(Web3Context);

  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);

  const handleStake = async () => {
    try {
      console.log("Starting handleStake...");
      if (UNCollaborationContract && account) {
        console.log("UNCollaborationContract and account are valid...");
        const weiAmount = window.web3.utils.toWei(stakeAmount, "ether");
        console.log("weiAmount:", weiAmount);
        await UNCollaborationContract.methods
          .stakeTokens(weiAmount)
          .send({ from: account });
        console.log("Staking successful");
      }
    } catch (error) {
      console.error("Error while staking:", error);
    }
  };

  const handleUnstake = async () => {
    try {
      if (UNCollaborationContract && account) {
        await UNCollaborationContract.methods
          .unstakeTokens(unstakeAmount)
          .send({ from: account });
      }
    } catch (error) {
      console.error("Error while unstaking:", error);
    }
  };

  const initialProjects = [];
  const initialTasks = [];

  const addProject = (project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <ProjectContext.Provider value={{ projects, tasks, addProject }}>
      <div>
        <h2>Staking</h2>
        <div>
          <input
            className="input-field"
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <button className="button" onClick={handleStake}>
            Stake
          </button>
        </div>
        <div>
          <input
            className="input-field"
            type="number"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
          />
          <button className="button" onClick={handleUnstake}>
            Unstake
          </button>
        </div>
        <p>Your Staking Balance: {balance} Tokens</p>
        <p>Your Staking Position: {stakingPosition} Tokens</p>
      </div>
      <Dashboard />
    </ProjectContext.Provider>
  );
};

export default Staking;
