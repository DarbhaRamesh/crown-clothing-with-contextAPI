import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBIyHutZ_-6ob8PKiGtr_l52uQbEd6R3-U",
  authDomain: "crown-clothing-c1ded.firebaseapp.com",
  databaseURL: "https://crown-clothing-c1ded.firebaseio.com",
  projectId: "crown-clothing-c1ded",
  storageBucket: "crown-clothing-c1ded.appspot.com",
  messagingSenderId: "418697605162",
  appId: "1:418697605162:web:2ef62a3a63996dc0989353",
  measurementId: "G-P0VC9EEVD2"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
