

<template>
 
 <TheHeader :user="user" @login-clicked="showLoginPage = true" />
 <main class="global-main">
 <LoginPage v-if="showLoginPage" @user-logged-in="onUserLoggedIn" @some-event="theyWannaSignup" />
 <SignupPage v-if="showSignupPage" @other-event="theyWannaLogin"/>
 <router-view></router-view>
</main>
    
</template>

<style>
  
  body{
    margin-top: 5rem;
  }
  html{
    background: rgb(46,0,102);
    background: linear-gradient(to top, rgba(46,0,102,1) 0%, rgba(142,100,192,1) 100%, rgba(107,10,133,1) 100%);
    height:100vh;
   
  }
  
  button, input[type="button"], input[type="submit"] {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
}
</style>

<script>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import LoginPage from './views/LoginPage.vue';
import SignupPage from './views/SignupPage.vue';

export default {
  components: {
    TheHeader,
    LoginPage,
    SignupPage,
  },
  data() {
    return {
      user: null,
      showLoginPage: false,
      showSignupPage: false,
    };
  },
  methods: {
    onUserLoggedIn(user) {
      this.user = user;
      this.showLoginPage = false;
    },
    theyWannaSignup(){
      this.showLoginPage = false;
      this.showSignupPage = true;
      
    },
    theyWannaLogin(){
      this.showSignupPage = false;
      this.showLoginPage = true;
    }
  },
};
</script>