import React, { useState, useContext } from 'react';
import '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProposeProject.css';
import ProjectContext from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProjectContext.js';

const ProposeProject = ({ web3 }) => {
  const { addProject } = useContext(ProjectContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      title,
      description,
      budget: parseFloat(budget).toFixed(2), // Store budget as a string with 2 decimal places
    };

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
