import React, { useState, useEffect } from 'react';
import ProjectList from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProjectList.js';
import ProposeProject from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProposeProject.js';
import '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/Projects.css'
const Projects = ({ web3 }) => {
  const [projects, setProjects] = useState([]);

  return (
    <div className="container">
      <h1>Projects</h1>
      <ProjectList projects={projects} web3={web3} />
      <ProposeProject web3={web3} setProjects={setProjects} />
    </div>
  );
};

export default Projects;
