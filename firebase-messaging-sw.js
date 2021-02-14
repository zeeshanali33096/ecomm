importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

firebase.initializeApp({
  apiKey: "AIzaSyCWL8zEKsKgDyJUlr8-hVS8pvXWObzl7BQ",
  authDomain: "ecommerce-xyz.firebaseapp.com",
  projectId: "ecommerce-xyz",
  storageBucket: "ecommerce-xyz.appspot.com",
  messagingSenderId: "277360168933",
  appId: "1:277360168933:web:9ae278dc819c76f052290c",
  measurementId: "G-FCKN49NL5D",
});

const initMessaging = firebase.messaging();
