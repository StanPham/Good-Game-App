<script setup>
import { signOut, onAuthStateChanged } from 'firebase/auth'
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

      <img src="../images/GG_Logo.png" alt="" class="logo-med click" @click="goHome">

      <div class="title-container" >
        <div class=" title" @click="goHome">Good Game</div>
      </div>
       
      <div class="links-wrappa flex grow">
        <!--
          <div class="dropdown flex-c column">
              <button class="dropbtn ">SHOP</button>
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
          <div v-if="user.displayName">
            Welcome, {{ user?.displayName }}!
            <button type="button" @click="submitSignOut">Sign Out</button>
          </div>
          <div v-else>
            {{ user?.email }}
            <button type="button" @click="submitSignOut">Sign Out</button>
          </div>
        </div>
        <div v-else>
          <button class="login click cool-font" @click="goSignup">LOGIN</button> 
        </div>
    </div>

    <div v-if="isMobileMenuOpen" class="mobile-menu" v-click-outside="outsideClickHandler">
      <a class="mobile-login" @click="goSignupTwo" href="#">LOGIN</a>
      <a href="#" @click="goEventTwo">EVENTS</a>
      <a v-if="user" @click="profileClicked">
        {{ user?.email }}
        <button type="button" @click="submitSignOut">Sign Out</button>
      </a>
    </div>
</div>
</template>

<style scoped>

.logo-med{
  width:55px;
  height:55px;
  margin-left:2rem;
  margin-bottom:5px;
}
.mobile-menu{
  display:none;
}

.icon-white{
  filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
}

.burger{
  padding-top:.3rem;
}
.menu-icon{
  display:none;
  padding-left:.8rem;
}
.header-bg{
  background-color: rgb(17, 17, 17);
  position: fixed;
  min-width:100vw;
  display:flex;
  align-items: center;
  top:0;
  z-index:999;
}

.header-bg a {
  float: left;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size:1.2rem;
  font-family: 'JockeyOne';
  letter-spacing: 2px;
  position:relative;
}

.header-bg a:hover,
.login:hover {
  text-shadow: 0 0 5px rgb(236, 5, 236), 0 0 12px rgb(236, 5, 236), 0 0 20px rgb(236, 5, 236), 0 0 30px rgb(236, 5, 236);
}

.header-bg a:after{
  content: "";
  position: absolute;
  background: var(--btn-color);
  height: 2px;
  width: 0%;
  left: 0;
  bottom: 2%;
  transition: 0.3s;
}

.header-bg a:hover:after{
  width:100%;
}

.links-wrappa{
  height:100%;
  gap:1.5rem;
}

.title-container{
  padding-left:.8rem;
  font-size: 1.6rem;
  width:18%;
  min-width: max(18%, 180px);
}

.title{
  display:inline-block;
  cursor:pointer;
  letter-spacing: -2px;
}

/*start shop button css*/
.dropdown {
  overflow: hidden;
}

.dropdown .dropbtn {
  text-align:center;
  font-size: 1rem;
  border: none;
  outline: none;
  padding: 1rem;
}

.dropdown:hover .dropbtn,
.dropdown-content a:hover {
  background-color: white;
  color:black;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: black;
  min-width: 10rem;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  top:var(--header-height);
}

.dropdown-content a {
  padding: .8rem 1rem;
  display: block;
  text-align: left;
}

.dropdown:hover .dropdown-content {
  display:flex;
  flex-direction: column;
}
/*end shop button css*/

.login-container{
  margin-left: auto;
  padding-right:2rem;
}

.mobile-login{
  background:var(--btn-color);
}

@media (max-width: 767px) {
  .login-container{
    display:none;
  }
  
  .menu-icon {
    display: block;
   
  }

  .links-wrappa {
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
    top: var(--header-height);
    z-index:999;
    justify-content: center;
  }
  
  
  .mobile-menu a{
    font-size: 1rem;
    text-align: center;
    display:flex;
    justify-content: center;
    text-decoration: none;
    padding: 1rem;
    width:100%;
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