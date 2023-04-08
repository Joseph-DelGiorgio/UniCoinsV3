// ProjectContext.js
import { createContext } from 'react';

const ProjectContext = createContext({
  projects: [],
  tasks: [],
  addProject: () => {},
});

export default ProjectContext;
