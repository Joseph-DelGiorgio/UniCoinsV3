// useLocalData.js
import { useState } from 'react';

const useLocalData = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return { projects, setProjects, tasks, setTasks, addProject, addTask };
};

export default useLocalData;
