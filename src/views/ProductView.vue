<script setup>
import { httpsCallable } from 'firebase/functions';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db, firebaseAppAuth, firebaseFunctions } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth'
import router from '../router'

const amount = ref('1');
const route = useRoute();
const productID = route.params.name; 
const productData = ref(null);
const originalProductName = ref('');

const user = ref(null)
const createReservationResponse = ref(false)
const reservationSuccess = ref(false)
const isAdmin = ref(false)

const badReserve = ref(null)

const badReserveRedirects = event => {
  if (event.target.tagName === 'A' && event.target.dataset.action) {
    if (event.target.dataset.action === 'goProfile') {
      router.push('/user')
    }
    if(event.target.dataset.action === 'goSignup') {
      router.push('/signup')
    }
  }
}

onMounted(async () => {
  const productDoc = doc(db, 'shop', productID); 
  const productSnapshot = await getDoc(productDoc);
  if (productSnapshot.exists()) {
    productData.value = productSnapshot.data();
    originalProductName.value = productData.value.name;
    firstVariant();
  } else {
    console.log("No such product!");
  }
});

const productQuantityOptions = computed(() => {
  const maxQuantity = 2;
  const quantity = productData.value?.quant || 0;
  const limitedQuantity = Math.min(quantity, maxQuantity);
  return Array.from({ length: limitedQuantity }, (_, i) => i + 1);
});

const goHome = () => router.push('/');
const goShop = () => router.push('/shop');

onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
    if(currentUser) {
        currentUser.getIdTokenResult().then(idTokenResult => {
            isAdmin.value = idTokenResult.claims.admin ? true : false
        })
    }
})

const makeReservation = async () => {
  if(user.value == null){
    return badReserve.value = `You must be logged in and verify your phone number and email to make reservations. <a class="italic underline pink" data-action="goSignup">Signup here.</a>`;
  } else if (!user.value.phoneNumber && !user.value.emailVerified) {
    return badReserve.value = `You must have a verified phone number and email to make reservations. <a class="italic underline pink" data-action="goProfile">Visit Profile Page</a>`
  } else if (!user.value.phoneNumber) {
    return badReserve.value = `You must have a verified phone number to make reservations. <a class="italic underline pink" data-action="goProfile">Visit Profile Page</a>`
  } else if (!user.value.emailVerified) {
    return badReserve.value = `You must have a verified email to make reservations. <a class="italic underline pink" data-action="goProfile">Visit Profile Page</a>`
  }
  
  console.log("productID:")
  console.log(productID)
  console.log("Quantity:")
  console.log(amount.value)
  const createReservation = httpsCallable(firebaseFunctions, 'addreservation');
    await createReservation({ 
      productID: productID,
      quantity: amount.value
    })
    .then((result) => {
      if(result.data.state === "pass"){
        createReservationResponse.value = "Reservation Success!"
        reservationSuccess.value = true;
      } else {
        switch(result.data.message) {
            case "unverified-email":
                createReservationResponse.value = "Email is not verified, see profile page."  
                break
            case "unverified-phone":
                createReservationResponse.value = "Phone is not verified, see profile page."
                break
            case "large-quantity":
                createReservationResponse.value = "You cannot reserve more than 3 of one item."
                break
            case "product-not-found":
                createReservationResponse.value = "Sorry, this product does not exist."
                break  
            case "low-quantity":
                createReservationResponse.value = "Sorry, this item is out of stock."
                break 
            case "too-many-reservations":
                createReservationResponse.value = "You can only have a maximum of 2 reservations."
                break 
            case "product-already-reserved":
                createReservationResponse.value = "You already have a reservation of this product."
                break   
            default:
                createReservationResponse.value = "An error occured, please try again later"
        }
    
        reservationSuccess.value = false;
        console.log('xd');
      }
    
    }).catch(err => {
        console.log(err);
        
        
    });
}

function firstVariant(){
  if(productData.value.variants && productData.value.variants.length > 0){
    productData.value.name = originalProductName.value + ': ' + productData.value.variants[0].varName;
    productData.value.price = productData.value.variants[0].varPrice;
    productData.value.quant = productData.value.variants[0].varQuantity;
  }
}

const updateVariant = (variant) => {
  productData.value.name = originalProductName.value + ': ' + variant.varName;
  productData.value.price = variant.varPrice;
  productData.value.quant = variant.varQuantity;
};

</script>

<template>
  <div class="main-wrapper flex-c-c">
    <div class="product-container flex-c-c wrap rc rel" v-if="productData">
      <nav class="breadcrumbs flex pad abs">
        <a class="underline" @click="goHome">Home</a>
        <div>></div>
        <a class="underline" @click="goShop">Shop</a>
        <div>></div>
        <a class="test">{{ productData.name }}</a>
      </nav>
      <img :src="productData.img" alt="Product Image" class="product-img">
      <div class="product-text">
        <h1>{{ productData.name }} </h1>
        <p class="font-med">{{ productData.desc }}</p>
        <p class="price pad-top bold">{{ productData.price }}</p>
        
        <div class="flex gap title">
          <button 
            class="variants" 
            v-for="variant in productData.variants" 
            :key="variant.varName" 
            @click="updateVariant(variant)">
              {{ variant.varName }}
          </button>
        </div> 
        <br>

        <div v-if="productData.quant!=0" class="flex gap pad-bot">
          <select v-model="amount">
            <option v-for="num in productQuantityOptions" :key="num" :value="num">
              {{ num }}
            </option>
          </select>
          <button class="btn-even-pad" @click="makeReservation">Reserve Now</button>
        </div>
        <div v-else class="title-scale" style="font-style:italic">Sold Out</div>

        <div v-if="badReserve" class="grey pad font-med rc">
          <span @click="badReserveRedirects" v-html="badReserve"></span>
        </div>
        <div v-if="createReservationResponse" :class="{'grey': !reservationSuccess, 'blink-bg': !reservationSuccess}" class="pad-small title italic flex align-c gap">
          <img v-if="!reservationSuccess" src="../images/caution.png" alt="" class="caution">
          {{ createReservationResponse }}
        </div>
        <p class="italic light pad-top">Reserved items must be paid for and picked up in store. </p>
      </div>
      
    </div>
    
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<style scoped>
.blink-bg{
    animation: blinkingBackground 1s 2;
}
@keyframes blinkingBackground{
    0%   {background-color: rgb(37, 37, 37);;}
    50% {background-color: rgb(80, 80, 80);;}
}
.main-wrapper{
  margin-top: calc(var(--header-height) + 1vmax );
}
.variants{
  background:rgb(29, 28, 28);
  border:rgb(73, 69, 69) 1px solid;
  padding: .3em .5em;
}

.variants:hover{
  background:rgb(44, 43, 43);
}

.variants:focus{
  background:rgb(61, 60, 60);
  border:rgb(121, 115, 115) 1px solid;
}

.breadcrumbs{
  top:0;
  left:0;
  gap:.5rem;  
}

.test{
  width:200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}

select{
  width:20%;
  border-radius:1rem;
  background-color: rgb(0, 0, 0);
  font-size:1.5rem;
  text-align: center;
}

.price{
  font-size:1.8rem;
}

.product-container{
  background:black;
  gap:2rem;
  width:clamp(350px, 80rem, 100%);
  padding-bottom:2rem;
}

.product-img{
  width:clamp(250px,500px,90%);
  height:450px;
  margin-top:4rem;
}

.product-text{
  text-align:left;
  min-width:22rem;
  max-width:25rem;
  padding:.5rem;
}

@media(max-width:1000px){

  .product-img{
    margin-top:0;
  }
}
</style>