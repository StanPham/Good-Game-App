<script setup>
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseAppAuth } from '@/firebase'
import {ref} from 'vue'

import burger from '../images/burger.svg';
import person from '../images/person.svg';
import router from '../router'


const user = ref(null)
const isAdmin = ref(false)
const isMobileMenuOpen = ref(false);
const userClickedProfile = ref(false);

const submitSignOut = async () => {
     await signOut(firebaseAppAuth).then((res) => {}).catch((error) =>{
        console.log(error.code)
        alert(error.message)
     })
     router.push('/');
  }

  onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
    if(currentUser) {
        currentUser.getIdTokenResult().then(idTokenResult => {
            isAdmin.value = idTokenResult.claims.admin ? true : false
        })
    }
})
const profileClicked = () => userClickedProfile.value = !userClickedProfile.value;

const toggleMobileMenu = () => isMobileMenuOpen.value = !isMobileMenuOpen.value;

const goHome = () => {
    router.push('/');
};

const goEvent = () => {
    router.push('/event');
};

const goEventTwo = () => {
    router.push('/event');
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const goSignup = () => {
    router.push('/login');
};

const goSignupTwo = () => {
    router.push('/login');
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const navigateToShop = (category) => {
    router.push({ name: 'shop', query: { category } });
};

const outsideClickHandler = () => {
    if (isMobileMenuOpen.value) {
        isMobileMenuOpen.value = false;
    }
};

</script>

<template>
    <div class="header-bg">
      <div class="menu-icon" @click.stop="toggleMobileMenu">
        <img :src="burger" alt="" class="burger icon-white" >
      </div>
        <div class="title cool-font" @click="goHome">Good Game</div>
        <div class="space-wrappa">
<!--         
            <div class="dropdown">
                <button class="dropbtn ">SHOP
                  
                </button>
                <div class="dropdown-content">
                  <a @click="navigateToShop('mtg')">Magic: The Gathering</a>
                  <a @click="navigateToShop('yug')">YuGiOh</a>
                  <a @click="navigateToShop('pok')">Pokemon</a>
                  <a @click="navigateToShop('ddd')">D&D</a>
                    <a href="#">Board Games</a>
                    <a href="#">Accessories</a>
                </div>
            </div> -->
            <a @click="goEvent">EVENTS</a>
            <a style="text-decoration: line-through;">COMING SOON</a>
            <a style="text-decoration: line-through;">COMING SOON</a>
            <!-- <a href="#">CONTACT</a>
            <a href="#">XYZ123</a> -->
         
        
   
    </div>
    <div class="login-container">
        <div v-if="user" @click="profileClicked">
         
        
          {{ user?.email }}
        <button type="button" @click="submitSignOut">Sign Out</button>
        </div>
        <div v-else>
          <button class="login click" @click="goSignup">LOGIN</button> 
          <!-- <img :src="person" alt="" class="person icon-white"> -->
        </div>
      </div>
    <div v-if="isMobileMenuOpen" class="mobile-menu" v-click-outside="outsideClickHandler">
      <a class="mobile-login" @click="goSignupTwo" href="#">LOGIN</a>
      <a href="#" @click="goEventTwo">EVENTS</a>
     
     
     
  </div>
</div>
    
    <!-- <TheSignup v-if="isSignupVisible" @some-event="callback" @close-this="throwback"/> -->
    <!-- <TheLogin v-if="isLoginVisible" @other-event="callback"/> -->
    
   
</template>

<style scoped>
.mobile-menu{
  display:none;
}
.mobile-login{
  background-color: var(--btn-color);
  width:100%;
}

.icon-white{
 filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
}
.burger{
  padding-top:5px;
}
  .menu-icon{
    display:none;
    padding-left:.8rem;
  }
    .header-bg{
        background-color: rgba(88, 85, 88, 0.466);
        height: 2.8rem;
        position: fixed;
        min-width:100vw;
        display:flex;
        align-items: center;
        color:white;
        top:0;
        z-index:999;
      
        
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
.header-bg a:hover {
 background-color: white;
 color:black;
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
    padding-right: 2rem;
  
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
  .login-container{
    display:none;
  }
  
  .menu-icon {
    display: block;
   
  }

  .space-wrappa {
    display: none;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    position:fixed;
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




export default {
 

  
  name: 'TheHeader',
  data() {
    return {
      burger: burger,
      isMobileMenuOpen: false,
      userClickedProfile: false,
      person: person,
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
    goEventTwo(){
      this.$router.push('/event');
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    goSignup(){
      this.$router.push('/login');
     
      
    },
    goSignupTwo(){
      this.$router.push('/login');
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      
    },
    navigateToShop(category) {
        this.$router.push({ name: 'shop', query: { category } });
    },

    outsideClickHandler() {
        if (this.isMobileMenuOpen) {
            this.isMobileMenuOpen = false;
        }
    }
    
  }
  
}

  
 
  


</script>