// ProjectPage.js
import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList';
import Web3 from 'web3';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

  // Initialize web3
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

  // Fetch projects here, you can use useEffect to fetch projects when the component mounts
  // For demonstration purposes, I'll use a static list of projects
  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = [
        {
          title: 'Project 1',
          description: 'This is project 1',
          budget: '1000000000000000000' // 1 ETH in wei
        },
        {
          title: 'Project 2',
          description: 'This is project 2',
          budget: '2000000000000000000' // 2 ETH in wei
        }
      ];
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ProjectList projects={projects} web3={web3} />
    </div>
  );
};

export default ProjectPage;
