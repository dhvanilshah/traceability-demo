import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { QRCode } from 'react-qr-svg';
import './style.css';
import * as firebase from 'firebase';

var today = new Date();
var key;

class App extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			showResults: false,
			quantity: 100,
			farm: 'Farm',
			date: "7/11/18 "+ today.getHours() + ":" + today.getMinutes(),
			type: 'Eastern Oyster',
			key: ''
		}

		this.handleChangeQuant = this.handleChangeQuant.bind(this);
		this.handleChangeFarm = this.handleChangeFarm.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChangeType = this.handleChangeType.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}
		
	handleChangeQuant = (event) => {
		this.setState({quantity: event.target.value});
	}

	handleChangeFarm = (event) => {
		this.setState({farm: event.target.value});
	}

	handleChangeDate = (event) => {
		this.setState({date: event.target.value});
	}

	handleChangeType = (event) => {
		this.setState({type: event.target.value});
	}

	handleSubmit = () =>{
		var data = {
			ConsumerReady: false,
			count: this.state.quantity,
			farm: this.state.farm,
			handoffs: 1,
			type: this.state.type,
			history: {
				1: {
					location: this.state.farm,
					timestamp: this.state.date
				}
			}
		}

		key = firebase.database().ref('bags').push(data).key
		this.setState({key: key});

		this.setState(prev => ({showResults: !prev.showResults}));
	};

	render() {
		return (
			<div className="App">
				<h1> Enter Bag Data </h1> 
				<form>
					<fieldset id="form_inputs">
						<legend> Bag Data </legend>
							<p><label for="input_quant">Quantity</label><input id="input_quant" value={this.state.quantity} onChange={this.handleChangeQuant} type="number"/></p>
							<p><label for="input_loc">Farm/Location</label><input id="input_loc" value={this.state.farm} onChange={this.handleChangeFarm} type="text"/></p>
							<p><label for="input_date">Time</label><input id="input_date" value={this.state.date} onChange={this.handleChangeDate} type="date"/></p>
							 <p><label for="input_type">Type</label><input id="input_type" value={this.state.type} onChange={this.handleChangeType} type="text"/></p>
					</fieldset>
					<fieldset id="qr_gen">
						<div>
        					<input type='button' value = 'Generate QR Code' onClick={this.handleSubmit} />
       						 {this.state.showResults ? results(this.state.key) : null}
      					</div>
					</fieldset>	
				</form>			
			</div>
    		);
  	}
}

const results = (key) => (<QRCode level="H" style={{ width: 128, alignItems: "center", justifyContent:'center'}} value={'http://ot-tracebility.firebaseapp.com/#'+(key)} /> );

export default App;

