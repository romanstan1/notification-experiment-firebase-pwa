import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash'
import moment from 'moment'

class Homepage extends Component {
  state = {
    appointments: [],
    input:''
  }

  componentDidMount() {
    const time1 = moment().add(0,'days').format()
    const time2 = moment().add(0,'days').format()

    this.today = moment(time1).startOf('hour')
    this.tomorrow = moment(time2).endOf('hour')

    const dbRef = firebase.database().ref('appointments/')
    dbRef.on('value', (snapshot) => {
      const appointments = _.values(snapshot.val());
      const keys = _.keys(snapshot.val());
      const addIds = appointments.map((appointment, i) => {
        return {...appointment, uuid: keys[i]}
      })
      this.setState({appointments: addIds})
    })
  }

  pushUserData = () => {
    const db = firebase.database()
    const appointRef = db.ref('appointments/')
    const newAppointmentRef = appointRef.push();
    newAppointmentRef.set({
      date: moment().format(),
      location: this.state.input,
      address: "38 The Broadway, Wimbledon, London SW19 1RQ, UK",
      postcode: "SW209BT",
      optician:"John Barnes",
      homeLocation: {
        lat: 51.4149653,
        lng: -0.2402061999999887
      },
      placeId: 'whatever',
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
        <h2>Appointments</h2>
        {this.state.appointments.map((appointment, i) =>
          <div className='appointment' key={i}>
            <div>
              <p className='location'>{appointment.location}</p>
              <p className='date'>{moment(appointment.date).format("LLL")}</p>
              <p className='today'> Is today? : {moment(appointment.date).isBetween(this.today,this.tomorrow)? 'true': 'false' }</p>
              <button value={appointment.uuid} onClick={this.handleDelete}>Delete</button>
            </div>
          </div>
        )}
        <input type="text" value={this.state.input} onChange={this.handleInput}/>
        <button onClick={this.pushUserData}>Push</button>
      </div>
    );
  }
}

export default Homepage;
