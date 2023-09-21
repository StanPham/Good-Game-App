<template>
    <div class="header-bg">
      <div class="menu-icon" @click="toggleMobileMenu">
        <img :src="burger" alt="" class="burger icon-white" >
      </div>
        <div class="title">Good Game</div>
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
            <a href="#">EVENTS</a>
            <a href="#">CONTACT</a>
            <a href="#">XYZ123</a>
        </div>

        <button class="login click" @click.stop="login">LOGIN</button>
       
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
    
    <TheSignup v-if="isSignupVisible" @some-event="callback" @close-this="throwback"/>
    <TheLogin v-if="isLoginVisible" @other-event="callback"/>
    
   
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
}
.space-wrappa{
    display:flex;
    min-width:40%;
    justify-content: space-between;
    
    
}

    .title{
        padding-left:40px;
        font-size: 1.7rem;
        width:24%;
        min-width: max(24%, 180px);
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

.login{
    margin-left: auto;
    padding-right: 20px;
}
.click{
  cursor: pointer;
}

@media (max-width: 767px) {
  /* Show hamburger icon and hide desktop menu items */
  .menu-icon {
    display: block;
   
  }

  .space-wrappa {
    display: none;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items:center;
  min-width: 100vw;
  background-color: black;
  height:auto;
  
  
  justify-content: center;
  margin-top: -2.2rem;
 
  
 
  
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
import burger from './burger.svg';
import TheSignup from './TheSignup.vue';
import TheLogin from './TheLogin.vue';

export default {
  components: {
    TheSignup,
    TheLogin,
    
  },
  name: 'TheHeader',
  data() {
    return {
      burger: burger,
      isMobileMenuOpen: false,
      isSignupVisible: false,
      isLoginVisible:false,
      
    };
  },
  
 
  
methods: {

    login() {
      
      this.isLoginVisible = !this.isLoginVisible;
    },
    
    callback(){
      this.isSignupVisible = !this.isSignupVisible;
      this.isLoginVisible = !this.isLoginVisible;
    },

    throwback(){
      this.isSignupVisible = !this.isSignupVisible;
    },
    
    
    toggleMobileMenu() {
      console.log('Toggling mobile menu');
      
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      console.log(this.isMobileMenuOpen);
    },
    
  },
  
 
  

};
</script>