import React from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import './App.css';

function App() {
  return (
    <div className="container">
      <LeftPanel/>
      <RightPanel/>
    </div>
  );
}

export default App;
