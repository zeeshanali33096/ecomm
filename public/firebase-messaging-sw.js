importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js");

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCWL8zEKsKgDyJUlr8-hVS8pvXWObzl7BQ",
    authDomain: "ecommerce-xyz.firebaseapp.com",
    projectId: "ecommerce-xyz",
    storageBucket: "ecommerce-xyz.appspot.com",
    messagingSenderId: "277360168933",
    appId: "1:277360168933:web:9ae278dc819c76f052290c",
    measurementId: "G-FCKN49NL5D",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const initMessaging = firebase.messaging();

initMessaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification?.title
    ? payload.notification?.title
    : "Title";
  const notificationOptions = {
    body: payload.notification?.body ? payload.notification?.body : "body",
    icon: payload.notification?.icon
      ? payload.notification?.icon
      : "/logo192.png",
  };

  console.log({
    self,
    registration: self.registration,
    notificationOptions: payload.notification,
  });

  self.registration.showNotification(notificationTitle, notificationOptions);
});
