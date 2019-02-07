import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyC61xG33zHVfxFg1w3GAi1TuM-tLdGurtg",
    authDomain: "panneauxpub-a4d7c.firebaseapp.com",
    databaseURL: "https://panneauxpub-a4d7c.firebaseio.com",
    storageBucket: "panneauxpub-a4d7c.appspot.com"
};
var configfire = firebase.initializeApp(config);
export default configfire ;