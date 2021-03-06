import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebast.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });
  
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;

      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photoURL: photoURL,
      }
      setUser(signedInUser);

      console.log(displayName, email, photoURL);
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
  }

  const handleSigOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email:'',
        photo: '',
      }
      setUser(signedOutUser);
      console.log(res);
    })
    .catch(err => {
     
    });
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSigOut}>Sign out</button> :
        <button onClick={handleSignIn}>Sign in</button>
      }

      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""></img> 
        </div> 
      }
    </div>
  );
}

export default App;