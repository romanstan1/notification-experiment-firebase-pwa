import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import _ from 'lodash'
import uuidv1 from 'uuid/v1';

var config = {
  apiKey: process.env.FIREBASE_API_KEY_NOTIFICATION_EXPERIMENT,
  authDomain: "notification-experiment.firebaseapp.com",
  databaseURL: "https://notification-experiment.firebaseio.com",
  projectId: "notification-experiment",
  storageBucket: "notification-experiment.appspot.com",
  messagingSenderId: "563333451279"
};

class App extends Component {
  state = {
    appointments: [],
    input:''
  }

  componentWillMount() {
    console.log("will mount")
    firebase.initializeApp(config);
    const dbRef = firebase.database().ref('appointments/')
    dbRef.on('value', (snapshot) => {
      const appointments = _.values(snapshot.val());
      console.log("appointments",appointments)
      this.setState({appointments})
    })
  }

  writeUserData = () => {
    const id = uuidv1()
    firebase.database().ref('appointments/' + id).set({
      date: "27/01/2018",
      time: "13.45",
      location: this.state.input,
      address: "38 The Broadway, Wimbledon, London SW19 1RQ, UK",
      postcode: "SW209BT",
      optician:"John Barnes",
      homeLocation: {
        lat: 51.4149653,
        lng: -0.2402061999999887
      },
      placeId: id,
      type:"Eye test",
      for: "Myself",
      additional:"No additional info",
      phoneNumber: "020 8542 4434",
    });
  }

  handleInput = (e) => {
    this.setState({input: e.target.value})
  }
  handleDelete = (e) => {
    firebase.database().ref('appointments/' + e.target.value).remove()
  }

  render() {
    return (
      <div className="App">
        {this.state.appointments.map((appointment, i) =>
          <div className='appointment' key={i}>
            <p>{appointment.location}</p>
            <p>{appointment.time}</p>
            <p>{appointment.date}</p>
            <button value={appointment.placeId} onClick={this.handleDelete}>Delete</button>
          </div>
        )}
        <input type="text" value={this.state.input} onChange={this.handleInput}/>
        <button onClick={this.writeUserData}>Insert</button>
      </div>
    );
  }
}

export default App;
