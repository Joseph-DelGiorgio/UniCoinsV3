import React, { useState } from 'react';
import ProjectList from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProjectList.js';
import ProposeProject from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/ProposeProject.js';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

  return (
    <div>
      <h1>Projects</h1>
      <ProjectList projects={projects} />
      <ProposeProject setProjects={setProjects} />
    </div>
  );
};

export default ProjectPage;
