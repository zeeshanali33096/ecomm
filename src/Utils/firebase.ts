import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/messaging";

import { Deferred } from "./deferred";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const Auth = firebase.auth();
export const DB = firebase.firestore();
export const Storage = firebase.storage();
export const Messaging = firebase.messaging();

export const signInWithGoogle = async () => {
  const deferred = new Deferred();
  Auth
    .signInWithPopup(provider)
    .then((result) => {
      deferred.resolve(result);
    })
    .catch((error) => {
      deferred.reject(error);
    });

  return deferred.promise;
};

export const initMessaging = async () => {
  try {
    const token = await Messaging.getToken({
      vapidKey:
        "BKfyr3dm3pGpk41y-Q-5EjwmyB3GN5QtIhaEE-aNbOXrTdKTgKIG36c1uCyLm_mjS30zza1iFD6a_fDgXEbr9YQ",
    });
    return token;
  } catch (err) {
    console.log({ err });
  }
};
