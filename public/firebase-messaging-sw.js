importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyBmD4p0RRrz7MRBmtsD5uEkbcZZCWUclYU",
    authDomain: "myproject-394d2.firebaseapp.com",
    projectId: "myproject-394d2",
    storageBucket: "myproject-394d2.appspot.com",
    messagingSenderId: "63079153994",
    appId: "1:63079153994:web:d68e620bbc672743f541b3",
    measurementId: "G-GKQJ58MKYD",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
