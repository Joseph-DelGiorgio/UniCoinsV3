import React, { useState, useContext } from 'react';
import ProjectList from './ProjectList';
import ProposeProject from './ProposeProject';
import './Projects.css';
import ProjectContext from './ProjectContext';

const Projects = ({ web3 }) => {
  const [projects, setProjects] = useState([]);

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
