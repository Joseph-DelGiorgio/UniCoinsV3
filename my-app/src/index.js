import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './components/App';
import { Web3Provider } from './contexts/Web3Context'; // Add this import

//check notes

const AppWrapper = () => {
  return (
    <Web3Provider> {/* Add the Web3Provider wrapper here */}
      <App/>
    </Web3Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AppWrapper />
    </Router>
  </React.StrictMode>
);
