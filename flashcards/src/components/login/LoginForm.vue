<template>
      <div class="login__modal">
        <h1 class="login__modal__header">Rostered</h1>
        <form class="login__modal__login-form" v-on:submit="login">
          <label class="login__modal__login-form__label">Email</label>
          <input id="email" v-model="email" class="login__modal__login-form__input" type="text" />
          <label class="login__modal__login-form__label">Password</label>
          <input id="password" v-model="password" class="login__modal__login-form__input" type="password" />
          <input id="submit-button" class="login__modal__login-form__button" type="submit" />
          <router-link to="/signup" class="login__modal__login-form__link">Sign Up</router-link>
          <router-link to="/resetpassword" class="login__modal__login-form__link">Forgot Password?</router-link>
        </form>
    </div>
</template>


<script>
import Router from 'vue-router';
import $ from 'jquery';
import firebase from 'firebase';

  export default {
    name: 'LoginForm',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (result) => {
            console.log(result);
            console.log("logged");
            this.$router.push('home');
          }
        ).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
      },
    },
  }
</script>
