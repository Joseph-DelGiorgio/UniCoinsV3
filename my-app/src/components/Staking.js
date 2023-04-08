import React, { useState } from "react";
import "/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/Staking.css";
import Dashboard from "./Dashboard";
import ProjectContext from "./ProjectContext";

const Staking = ({ stakeTokens, unstakeTokens, balance, stakingPosition }) => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);

  const handleStake = () => {
    stakeTokens(stakeAmount);
  };

  const handleUnstake = () => {
    unstakeTokens(unstakeAmount);
  };

  // Replace with your initial projects and tasks data
  const initialProjects = [];
  const initialTasks = [];

  return (
    <ProjectContext.Provider value={{ projects: initialProjects, tasks: initialTasks }}>
      <div>
        <h2>Staking</h2>
        <div>
          <input
            className="input-field"
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <button className="button" onClick={handleStake}>Stake</button>
        </div>
        <div>
          <input
            className="input-field"
            type="number"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
          />
          <button className="button" onClick={handleUnstake}>Unstake</button>
        </div>
        <p>Your Staking Balance: {balance} Tokens</p>
        <p>Your Staking Position: {stakingPosition} Tokens</p>
      </div>
      <Dashboard />
    </ProjectContext.Provider>
  );
};

export default Staking;
