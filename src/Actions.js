import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Actions.css';
import Restaurant from './Restaurant'

class Actions extends Component {

  restaurant(){
    const keyVal = this.props.keyval;
    const bagData = this.props.bagData;
    ReactDOM.render(<Restaurant keyval={keyVal} bagData={bagData}/>, document.getElementById('root'));
  }

  render() {
    return (
      <div className="Actions List">
        <h1>Actions</h1>
        <ul>
          <li><button onClick={this.restaurant.bind(this)}>Restaurant</button></li>
          <li><button>Supplier</button></li>
          <li><button>Courier</button></li>
        </ul>
      </div>
    );
  }
}

export default Actions;
