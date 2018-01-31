import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash'
import moment from 'moment'
import {setAppointments} from '../store/modules/actions'
import {connect} from 'react-redux'
require("firebase/firestore");


class Homepage extends Component {
  state = {
    input:''
  }

  componentDidMount() {
    const time1 = moment().add(0,'days').format()
    const time2 = moment().add(0,'days').format()

    this.today = moment(time1).startOf('hour')
    this.tomorrow = moment(time2).endOf('hour')

    const fs = firebase.firestore();

    const context = this

    fs.collection("appointments").get().then(snap => {
      const keys = snap.docs.map(doc => doc.id)
      const appointments = snap.docs.map(doc => doc.data())
      const addIds = appointments.map((appointment, i) => { return {...appointment, uuid: keys[i]} })
      // this.setState({appointments: addIds})
      this.props.dispatch(setAppointments(addIds))
    })
  }

  pushUserData = () => {
    const fs = firebase.firestore();
    fs.collection("appointments").add({
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
    })
    .then(docRef => console.log("Document written with ID: ", docRef.id))
    .catch(error => console.error("Error adding document: ", error))
  }

  handleInput = (e) => {
    this.setState({input: e.target.value})
  }
  handleDelete = (e) => {
    const fs = firebase.firestore();
    fs.collection("appointments").doc(e.target.value).delete()
    .then(()=> console.log("Document successfully deleted!"))
    .catch(error => console.error("Error removing document: ", error));
  }

  render() {
    return (
      <div className="App">
        <h2>Appointments</h2>
        {this.props.appointments.map((appointment, i) =>
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

export default connect(state => ({
  appointments: state.data.appointments
}))(Homepage)
