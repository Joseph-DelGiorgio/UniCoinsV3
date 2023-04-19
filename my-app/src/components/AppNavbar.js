import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './AppNavbar.css';

const AppNavbar = ({ connectWallet, disconnectWallet, account, connected, handleLogin, handleLogout }) => {
  const [balance, setBalance] = useState(0);
  const [role, setRole] = useState('Unknown');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchBalanceAndRole = async () => {
      // Remove the contract-related code since it's not being used in this component
    };

    fetchBalanceAndRole();
  }, [account]);

  const handleConnectWallet = async () => {
    await connectWallet();
    setIsConnected(true);
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
    setIsConnected(false);
  };

  return (
    <Navbar expand="lg" className="app-navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/tasks">Tasks</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/badges">Badges</Nav.Link>
            <Nav.Link href="/staking">Staking</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/moonpay">MoonPay</Nav.Link>
          </Nav>
          <div>
            {isConnected ? (
              <>
                {account && (
                  <Navbar.Text className="ml-3">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </Navbar.Text>
                )}
                <Button className="disconnect-wallet-btn" onClick={handleDisconnectWallet}>
                  Disconnect Wallet
                </Button>
              </>
            ) : (
              <Button className="connect-wallet-btn" onClick={handleConnectWallet}>Connect Wallet</Button>
            )}

            {connected ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  required="required"
                  placeholder="Enter your email"
                />
                <button type="submit">Send</button>
              </form>
            )}
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
