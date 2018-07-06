import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Copy.css';
import Actions from './Actions';

class Copy extends Component {

  handoff() {
    const keyVal = this.props.keyval;
    const bagData = this.props.bagData;
    console.log(keyVal)
    ReactDOM.render(<Actions keyval={keyVal} bagData={bagData}/>, document.getElementById('root'));
  }

  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.bagData.farm}</h1>
          <h2 className="App-title">{this.props.bagData.count} Count</h2>
        </header>
        <ul>
        {
          this.props.history.map( history => <li key={history.id}>{history.location} at {history.timestamp}</li>)
        }
        </ul>
        <button onClick={this.handoff.bind(this)}> Handoff </button>
      </div>
    );
  }
}



export default Copy;
