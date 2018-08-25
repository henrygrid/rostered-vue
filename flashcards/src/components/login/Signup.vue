<template>
  <div class="container">
    <div class="login__background">
      <div class="login__modal signup-modal">
        <h1 class="login__modal__header">Register</h1>
        <form class="login__modal__login-form" v-on:submit="signUp">
          <label class="login__modal__login-form__label">Email</label>
          <input id="email" v-model="email" class="login__modal__login-form__input" type="text" />
          <label class="login__modal__login-form__label">Username</label>
          <input id="username" v-model="username" class="login__modal__login-form__input" type="text" />
          <label class="login__modal__login-form__label">Password</label>
          <input id="password1" v-model="password1" class="login__modal__login-form__input" type="password" />
          <label class="login__modal__login-form__label">Retype Password</label>
          <input id="password2" v-model="password2" class="login__modal__login-form__input" type="password" />
          <input id="submit-button" class="login__modal__login-form__button" type="submit" />
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Router from 'vue-router';
import $ from 'jquery';
import firebase from 'firebase';

  export default {
    name: 'Signup',
    data: function() {
      return {
        email: '',
        password1: '',
        password2: '',
        username: '',
      }
    },
    methods: {
      signUp: function(e) {
        e.preventDefault();
        if (this.password1 === this.password2) {
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password2).then(
            (result) => {
              console.log(result);
              this.$router.replace('home');
              firebase.auth().currentUser.sendEmailVerification()
              .then(function() {
                console.log("Verification Email Sent");
              })
              .catch(function(error) {
                console.log(error);
              });
            }).catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode + " " + errorMessage);
            });

        }

      },
    },
  }
</script>
