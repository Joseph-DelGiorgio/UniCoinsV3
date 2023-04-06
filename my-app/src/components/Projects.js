import React, { useState, useEffect } from 'react';
import ProjectList from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProjectList.js';
import ProposeProject from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProposeProject.js';
import ProjectPage from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProjectPage.js';
const Projects = ({ web3, contract, account }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [contract]);

  const fetchProjects = async () => {
    if (contract) {
      const projectCount = await contract.methods.getProjectCount().call();
      const fetchedProjects = [];

      for (let i = 0; i < projectCount; i++) {
        const project = await contract.methods.projects(i).call();
        fetchedProjects.push(project);
      }

      setProjects(fetchedProjects);
    }
  };

  const updateProjects = async () => {
    fetchProjects();
  };

  return (
    <div className="container">
       <ProjectPage />
      <h1>Projects</h1>
      <ProjectList projects={projects} web3={web3} />
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Budget: {web3.utils.fromWei(project.budget, 'ether')} ETH</p>
          </li>
        ))}
      </ul>

      {/* Include the ProposeProject component */}
      <ProposeProject web3={web3} account={account} contract={contract} updateProjects={updateProjects} />
    </div>
  );
};

export default Projects;




