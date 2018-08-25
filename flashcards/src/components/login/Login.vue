<template>
  <div class="container">
    <div class="login__background">
      <loginForm></loginForm>
    </div>
  </div>
</template>


<script>
import Router from 'vue-router';
import $ from 'jquery';
import LoginForm from './LoginForm.vue';

  export default {
    name: 'Login',
    components: {
      LoginForm
    },
    data: function() {
      return {

      }
    },
    methods: {

    },
  }
</script>
