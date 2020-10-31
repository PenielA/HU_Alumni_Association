import React from 'react';
import howard_logo from './iconography/HowardUniversity_logo.jpg';
import Login from './components/Login.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={howard_logo} className="App-logo" alt="logo" />
          <p>
            Welcome Howard Alum!
          </p>
        
          <Login promptText="Login"/>
      </header>
    </div>
  );
}

export default App;
