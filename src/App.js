import React, { Component } from 'react';
import './App.css';
import DwvComponent from './DwvComponent';
import DndComponent from "./dnd/DndComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <DndComponent />
      </div>
    );
  }
}

export default App;
