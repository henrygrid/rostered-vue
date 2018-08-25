// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import firebase from './firebase.js';
import firebase from 'firebase';

Vue.config.productionTip = false;

// Initialize Firebase
 let app;
 let config = {
   apiKey: "AIzaSyA-DtI-pj3NUd_Zwb8mj8L3cQom6zO8vKk",
   authDomain: "rostered-26b64.firebaseapp.com",
   databaseURL: "https://rostered-26b64.firebaseio.com",
   projectId: "rostered-26b64",
   storageBucket: "rostered-26b64.appspot.com",
   messagingSenderId: "911681674419"
 };
 firebase.initializeApp(config);
  // export const provider = new firebase.auth.GoogleAuthProvider();
  // export const auth = firebase.auth();



firebase.auth().onAuthStateChanged(function(user) {
  if(!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>',
    });
  }
});
