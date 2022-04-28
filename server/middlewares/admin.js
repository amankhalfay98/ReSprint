const admin = require('firebase-admin');
const serviceAccount = require('../config/resprint-5588e-firebase-adminsdk-s9tp6-6a1706c27a');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://resprint-5588e-default-rtdb.firebaseio.com',
});

module.exports = admin;
