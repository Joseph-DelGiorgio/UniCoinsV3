// Tasks.js
import React, { useState } from 'react';
import Task from './Task';
import Modal from 'react-modal';
import '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/components/Tasks.css';
import sdgs from '/Users/josephdelgiorgio/UniCoinsV3/my-app/src/assets/sdgs.png'

const customStyles = {
  // ... (same as before)
};

Modal.setAppElement('#root');

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projectManagerAddress, setProjectManagerAddress] = useState('');
  const [volunteerAddress, setVolunteerAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [hoursContributed, setHoursContributed] = useState('');

  const completeTask = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: true };
        }
        return task;
      });
    });
  };

  const handleAddProjectManager = () => {
    setTasks([...tasks, { id: tasks.length, projectManager: projectManagerAddress }]);
    setProjectManagerAddress('');
  };

  const handleAddVolunteer = () => {
    setTasks([...tasks, { id: tasks.length, volunteer: volunteerAddress }]);
    setVolunteerAddress('');
  };

  const handleMintTokens = () => {
    setTasks([...tasks, { id: tasks.length, reward: mintAmount }]);
    setMintAmount('');
  };

  const handleAwardBadge = () => {
    setTasks([...tasks, { id: tasks.length, description: badgeDescription, hoursContributed }]);
    setBadgeDescription('');
    setHoursContributed('');
  };

  return (
    <div className="container">
      <div className="page-content">
      <img
        className="tasks-image"
        src={sdgs} // Use the imported image as the source
        alt="A description of the image"
      />
      </div>
       

      <div className="project-manager-actions">
        <h3>Project Manager Actions</h3>
        <div className="form-group">
          <label htmlFor="projectManagerAddress">Add Project Manager:</label>
          <input
            type="text"
            id="projectManagerAddress"
            className="form-control"
            value={projectManagerAddress}
            onChange={(e) => setProjectManagerAddress(e.target.value)}
          />
          <button onClick={handleAddProjectManager}>Add Project Manager</button>
        </div>
        <div className="form-group">
          <label htmlFor="volunteerAddress">Add Volunteer:</label>
          <input
            type="text"
            id="volunteerAddress"
            className="form-control"
            value={volunteerAddress}
            onChange={(e) => setVolunteerAddress(e.target.value)}
          />
          <button onClick={handleAddVolunteer}>Add Volunteer</button>
        </div>
        <div className="form-group">
          <label htmlFor="mintAmount">Mint Tokens:</label>
          <input
            type="number"
            id="mintAmount"
            className="form-control"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
          />
          <button onClick={handleMintTokens}>Mint Tokens</button>
        </div>
        <div className="form-group">
          <label htmlFor="badgeDescription">Award Badge:</label>
          <input
            type="text"
            id="badgeDescription"
            className="form-control"
            value={badgeDescription}
            onChange={(e) => setBadgeDescription(e.target.value)}
          />
          <input
            type="number"
            id="hoursContributed"
            className="form-control"
            value={hoursContributed}
            onChange={(e) => setHoursContributed(e.target.value)}
          />
          <button onClick={handleAwardBadge}>Award Badge</button>
        </div>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <Task key={index} index={index} task={task} completeTask={completeTask} />
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
