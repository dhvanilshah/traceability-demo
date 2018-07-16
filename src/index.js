import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QRGen from './App';
import Copy from './Copy';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAkukTBsbt9SyUIqdNqcyK0iyUciYFFbB4",
    authDomain: "ot-tracebility.firebaseapp.com",
    databaseURL: "https://ot-tracebility.firebaseio.com",
    projectId: "ot-tracebility",
    storageBucket: "ot-tracebility.appspot.com",
    messagingSenderId: "492250369502"
  };

firebase.initializeApp(config);

ReactDOM.render(<QRGen msg="Getting Identifiaction Number..."/>, document.getElementById('root'));

getOysterData(window.location.hash.substring(1));

function getOysterData(key) {
  if(key){
    var refloc = 'bags/' + key;
    firebase.database().ref(refloc).once('value').then(function(snapshot){
      const bagData = snapshot.val()
      const status = bagData.ConsumerReady;
      if(status){
        loadConsumerEnd(bagData);
      } else{
        loadFarmEnd(bagData, key);
      };
    });
  } 
  else {
    ReactDOM.render(<QRGen msg="No Data Found" isHidden={false}/>, document.getElementById('root'));
  };
}
function loadConsumerEnd(){
  console.log("cons");
}
function loadFarmEnd(bagData, key){
  const history = bagData.history.sort();
  ReactDOM.render(<Copy bagData={bagData} history={history} keyval={key}/>, document.getElementById('root'));
}

registerServiceWorker();

