const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
  console.log("request: ",request)
  console.log("response: ",response)
});

exports.createAppointment = functions.https.onRequest((req, res) => {
  const date = new Date().getTime()
  const newAppointmentRef = admin.database().ref('appointments/').push();
  newAppointmentRef.set({
    date: date,
    time: "13.45",
    location: 'New Appointment App',
    address: "38 The Broadway, Wimbledon, London SW19 1RQ, UK",
    postcode: "SW209BT",
    optician:"John Barnes",
    homeLocation: { lat: 51.4149653, lng: -0.2402061999999887 },
    placeId: 'whatever',
    type:"Eye test",
    for: "Myself",
    additional:"No additional info",
    phoneNumber: "020 8542 4434",
  });
  res.send("appointment created!");
});
