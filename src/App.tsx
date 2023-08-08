import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/forms/Login/LoginPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
