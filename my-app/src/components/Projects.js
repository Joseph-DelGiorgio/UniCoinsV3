import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import ProposeProject from "./ProposeProject";
import "./Projects.css";
import ProjectContext from "./ProjectContext";
import { useWeb3 } from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/contexts/Web3Context.js';

const Projects = () => {
  const { web3, contract, account } = useWeb3();
  const [projects, setProjects] = useState([]); // Add this line

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      <div className="container">
        <h1>Projects</h1>
        <ProjectList projects={projects} web3={web3} />
        <ProposeProject web3={web3} addProject={addProject} />
      </div>
    </ProjectContext.Provider>
  );
};

export default Projects;

