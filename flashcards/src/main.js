// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex, { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import App from './App';
import router from './router';
// import firebase from './firebase.js';
import firebase from 'firebase';
import VuexPersist from 'vuex-persist'

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

  Vue.use(Vuex);

  const vuexPersist = new VuexPersist({
    key: 'my-app',
    storage: localStorage
  });

  const store = new Vuex.Store({
    state: {
      stats: {}
    },
    getters: {
      isData: function (state) {
        return state.stats;
      }
    },
    mutations: {
      getData: function (state, payload) {
        state.stats = payload;
      }
    },
    actions: {
      getFirebaseData: function(context) {
        // let initialState;

        firebase.database().ref('stats').on('value', (snapshot) => {
          context.commit('getData', snapshot.val());
        //   console.log(initialState);
        //
        //   this.state = initialState;
        });

      }
    },
    plugins: [vuexPersist.plugin]
  });

  // firebase.database().ref('stats').on('value', (snapshot) => {
  //   store.commit('getData', snapshot.val());
  // });

firebase.auth().onAuthStateChanged(function(user) {
  if(!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>',
      store: store,
      // computed: {
      //   ...mapState({
      //     stats: state => state.stats
      //   }),
      //   ...mapGetters([
      //     'isData'
      //   ]),
      //   ...mapActions([
      //     'getFirebaseData'
      //   ]),
      //   ...mapMutations([
      //     'getData'
      //   ]),
      // },
      created() {
        this.$store.dispatch('getFirebaseData');
      }
    });
  }
});
