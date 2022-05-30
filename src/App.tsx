import React from 'react';
import './App.css';
import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  return (
    <div className="App">
      oi
    </div>
  );
}

export default App;
