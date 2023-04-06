// ProjectList.js
import React from 'react';

const ProjectList = ({ projects }) => {
  return (
    <ul>
      {projects.map((project, index) => (
        <li key={index}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Budget: {project.budget} ETH</p>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
