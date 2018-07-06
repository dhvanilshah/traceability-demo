import React, { Component } from 'react';
import './Actions.css';
import jsPDF from 'jspdf'
import * as firebase from 'firebase';


class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    var newHandoffCount = (this.props.bagData.handoffs + 1);
    console.log(newHandoffCount);

  }

  handleSubmit(event) {
    event.preventDefault();
    var pdf = new jsPDF();
    var farm = this.props.bagData.farm
    var count = this.props.bagData.count;
    var price = 1;
    var item = 'Easter Oyster'
    var billto = this.state.value;
    var newHandoffCount = (this.props.bagData.handoffs + 1);
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var refloc = 'bags/' + this.props.keyval + '/history/' +  newHandoffCount;
    var handoffsUpdate = 'bags/' + this.props.keyval;
    var data = {
      location: billto,
      timestamp: time
    }

    firebase.database().ref(refloc).update(data);
    firebase.database().ref(handoffsUpdate).update({handoffs: newHandoffCount});

    pdf.text(30, 30, farm);
    pdf.text(30, 50, count + " Oysters");
    pdf.text(30, 60, "$"+(count*price));
    pdf.text(30, 70, item);
    pdf.text(30, 80, 'Bill to' + billto);
    pdf.text(30, 90, 'Delivered At' + time);
    window.location.reload();
    pdf.save('invoice.pdf');
  }



  render() {
    return (
      <div className="RestaurantPage">
        <h1>Enter Restaurant Name</h1>
        <ul>
          <li>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          </li>
          <li><button>Search Nearby</button></li>
        </ul>
      </div>
    );
  }
}


export default Restaurant;
