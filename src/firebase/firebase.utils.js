import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDLuJYCsAImFqEeNumZMlkaXKGXSlH0NkM",
    authDomain: "karunos-dn.firebaseapp.com",
    projectId: "karunos-dn",
    storageBucket: "karunos-dn.appspot.com",
    messagingSenderId: "956543297887",
    appId: "1:956543297887:web:c7030454fa5ca8f2f36eea",
    measurementId: "G-W4R1E9CF3F"
  };

  firebase.initializeApp(config);

  export const auth =firebase.auth();
  export const firestore = firebase.firestore();

//   const provider = new firebase.auth.GoogleAuthProvider();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase;