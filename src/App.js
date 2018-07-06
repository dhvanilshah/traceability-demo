import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.props.msg}</h1>
        </header>
        {!this.props.isHidden && <Button />}
      </div>
    );
  }
}

const Button = () => (
  <button> ADD NEW BAG </button>
  )

export default App;
