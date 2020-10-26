import React from 'react';
import logo from './logo.svg';
import Text from './Text.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome Howard Alum!
        </p>
        <a
   
        >
        </a>
            <Text promptText="Login"/>
      </header>
    </div>
  );
}

export default App;
