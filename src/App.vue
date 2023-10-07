<template>

 <TheHeader :user="user" @login-clicked="showLoginPage"/>
 
 <main class="global-main">
  
 <router-view></router-view>
 
</main>
<div class="wrap">
<TheFooter />
</div>
</template>

<style>

.wrap{
  padding-top:2.8rem;
  display:none;
}
  html{
    background: rgb(34, 0, 73);
    /* background: linear-gradient(to top, rgba(46,0,102,1) 0%, rgba(142,100,192,1) 100%, rgba(107,10,133,1) 100%); */
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
@media(min-width:930px){
  .wrap{
    display:block;
  }
}
</style>

<script>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'



export default {
  components: {
    TheHeader,
    TheFooter,
   

  },
  data() {
    return {
      user: null,
      

    };
  },
  methods: {
    showLoginPage(){
      this.$router.push('/login');
    },
    onUserLoggedIn(user) {
      this.user = user;
      this.showLoginPage = false;
    },

  },
};
</script>