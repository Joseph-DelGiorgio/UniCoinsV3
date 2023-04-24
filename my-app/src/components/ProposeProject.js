import React, { useState, useContext } from 'react';
import './ProposeProject.css';
import ProjectContext from './ProjectContext';
import { Web3Context } from '../contexts/Web3Context';

const ProposeProject = () => {
  const { web3, contract, account } = useContext(Web3Context);
  const { addProject } = useContext(ProjectContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!web3) {
      alert('Web3 is not initialized. Please check your MetaMask connection.');
      return;
    }

    if (!contract) {
      alert('Contract is not initialized. Please check your configuration.');
      return;
    }

    if (!account) {
      alert('Account is not available. Please check your MetaMask connection.');
      return;
    }

    const newProject = {
      title,
      description,
      budget: parseFloat(budget).toFixed(2),
    };

    const budgetWei = web3.utils.toWei(budget, 'ether');
    try {
      await contract.methods.proposeProject(description, budgetWei).send({ from: account });
    } catch (error) {
      console.error('Error sending transaction:', error);
      return;
    }

    addProject(newProject);

    setTitle('');
    setDescription('');
    setBudget('');
  };

  return (
    <div className="container">
      <h1>Propose a New Project</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
      required
    />
    <label htmlFor="description">Description:</label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
    ></textarea>
    <label htmlFor="budget">Budget (ETH):</label>
    <input
      type="number"
      id="budget"
      value={budget}
      onChange={(e) => setBudget(e.target.value)}
      required
    />
    <button type="submit">Submit</button>
  </form>
</div>
);
};

export default ProposeProject;
