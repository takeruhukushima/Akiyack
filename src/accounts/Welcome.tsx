// Welcome.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './accounts_css/welcome.css';

const Welcome: React.FC = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
        <h1>Welcome to AKIYACK</h1>
        <p>Log in with your AKIYACK account to continue</p>
        <div className="button-container">
          <Link to="/signin" className="button login">Log in</Link>
          <Link to="/signup" className="button signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;