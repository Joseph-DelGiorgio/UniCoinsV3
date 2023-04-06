// ProjectList.js
import React from 'react';
import '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProjectList.css';

const ProjectList = ({ projects, web3 }) => {
  return (
    <ul className="project-list">
      {projects.map((project, index) => (
        <li key={index} className="project-item">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Budget: {web3.utils.fromWei(project.budget, 'ether')} ETH</p>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
