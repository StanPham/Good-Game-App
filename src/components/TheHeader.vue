
<template>
    <div class="header-bg">
      <div class="menu-icon" @click="toggleMobileMenu">
        <img :src="burger" alt="" class="burger icon-white" >
      </div>
        <div class="title" @click="goHome">Good Game</div>
        <div class="space-wrappa">
        
            <div class="dropdown">
                <button class="dropbtn">SHOP
                  
                </button>
                <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
            <a @click="goEvent">EVENTS</a>
            <a href="#">CONTACT</a>
            <a href="#">XYZ123</a>
        </div>
      <div class="login-container">
        <div v-if="userLogged" @click="profileClicked">
          <img :src="user.avatar" alt="User avatar" />
          <span>{{ user.name }}</span>
          <div v-if="userClickedProfile" class="profile-clicked">
          </div>
        
          
        </div>
        <div v-else>
          <button class="login click" @click.stop="$emit('login-clicked')">LOGIN</button>
        </div>
      </div>
    </div>
    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <a href="#">EVENTS</a>
      <a href="#">CONTACT</a>
      <a href="#">XYZ123</a>
      <div class="dropdown">
                <button class="dropbtn">SHOP
                  
                </button>
                <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
  </div>
    
    <!-- <TheSignup v-if="isSignupVisible" @some-event="callback" @close-this="throwback"/> -->
    <!-- <TheLogin v-if="isLoginVisible" @other-event="callback"/> -->
    
   
</template>

<style scoped>

.icon-white{
 filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
}
  .menu-icon{
    display:none;
  }
    .header-bg{
        background-color: black;
        height: 2.8rem;
        position: fixed;
        min-width:100vw;
        display:flex;
        align-items: center;
        color:white;
        top:0;
        
    }
    .header-bg a {
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  cursor:pointer;
}
.space-wrappa{
    display:flex;
    min-width:40%;
    justify-content: space-between;
    
    
}

    .title{
        padding-left:2rem;
        font-size: 1.6rem;
        width:24%;
        min-width: max(24%, 180px);
        cursor:pointer;
       
    }

    .dropdown {
      
        overflow: hidden;
        

    }
    .dropdown .dropbtn {
        text-align:center;
        font-size: 16px;
        border: none;
        outline: none;
        color: white;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit; /* Important for vertical align on mobile phones */
        margin: 0; /* Important for vertical align on mobile phones */

        
    }

    .dropdown:hover .dropbtn {
  background-color: white;
  color:black;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: black;
 
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown-content a {
  float: none;

  padding: 12px 16px;
  display: block;
  text-align: left;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content a:hover {
  background-color: white;
  color: black;
}

.login-container{
    margin-left: auto;
    padding-right: 20px;
}
.click{
  cursor: pointer;
}
.profile-clicked{
  height:200px;
  width:200px;
  background-color: red;
}

@media (max-width: 767px) {
  
  .menu-icon {
    display: block;
   
  }

  .space-wrappa {
    display: none;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    position:absolute;
    align-items:center;
  min-width: 100vw;
  background-color: rgb(0, 0, 0);
  height:auto;
  top: 2.8rem;
  z-index:999;
  
  
  justify-content: center;
 
 
  
 
  
  }
  .mobile-menu a{
    
  font-size: 16px;
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 14px 16px;
  }
 
}

</style>

<script>
import { useUserStore } from '@/stores/counter.js'
import burger from './burger.svg';
// import TheSignup from './TheSignup.vue';
// import TheLogin from './TheLogin.vue';

export default {
 

  components: {
    // TheSignup,
    // TheLogin,
    
  },
  name: 'TheHeader',
  data() {
    return {
      burger: burger,
      isMobileMenuOpen: false,
      userClickedProfile: false,
      // isSignupVisible: false,
      // isLoginVisible:false,
      
    };
  },
  
 
  
methods: {

    
    profileClicked(){
      userClickedProfile = !userClickedProfile;
    },
    
    toggleMobileMenu() {
      console.log('Toggling mobile menu');
      
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      console.log(this.isMobileMenuOpen);
    },
    goHome(){
      this.$router.push('/');
    },
    goEvent(){
      this.$router.push('/event');
    },
    
  }
}

  
 
  


</script>