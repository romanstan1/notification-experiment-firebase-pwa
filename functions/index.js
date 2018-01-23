const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuidv1 = require('uuid/v1');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
  console.log("request: ",request)
  console.log("response: ",response)
});


exports.createAppointment = functions.https.onRequest((req, res) => {
  const id = uuidv1()
  admin.database().ref('appointments/'+ id).set({
    date: "7/01/2019",
    time: "99.45",
    location: 'FUNCTION APPOINTMENT!',
    address: "38 The Broadway, Wimbledon, London SW19 1RQ, UK",
    postcode: "SW209BT",
    optician:"John Barnes",
    homeLocation: {
      lat: 51.4149653,
      lng: -0.2402061999999887
    },
    placeId: 121,
    type:"Eye test",
    for: "Myself",
    additional:"No additional info",
    phoneNumber: "020 8542 4434",
  });
  res.send("appointment created!");
});
