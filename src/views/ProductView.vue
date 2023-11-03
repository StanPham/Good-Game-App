<script setup>
import { ref, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db, firebaseAppAuth  } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth'
import router from '../router'

const amount = ref('1');
const route = useRoute();
const productID = route.params.name; 
const productData = ref(null);
const originalProductName = ref('');

const user = ref(null)
const isAdmin = ref(false)
const phoneNumber = ref('')

let badReserve = ref(false)


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
  const quantity = productData.value?.quant || 0;
  return Array.from({ length: quantity }, (_, i) => i + 1);
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

const makeReservation = () => {
   badReserve.value = true;
}

function firstVariant(){
  if(productData.value.variants){
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
  <div class="view-top-margin flex-c-c">
    <div class="product-container flex-c-c wrap rc rel" v-if="productData">
      <nav class="breadcrumbs flex pad abs">
        <a class="underline" @click="goHome">Home</a>
        <div>></div>
        <a class="underline" @click="goShop">Shop</a>
        <div>></div>
        <a>{{ productData.name }}</a>
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

        <div v-if="badReserve" class="grey rc">
          <div v-if="!user && !user?.phoneNumber" class="pad font-med">You must be logged in and have
           a verified phone number to make reservations. <a class="italic underline pink">Signup here.</a>
          </div>

          <div v-else-if="!user" class="pad font-med">You must be logged in to make reservations.</div>

          <div v-else="user && !user?.phoneNumber" class="pad font-med">You must have a verified phone 
           number to make reservations. Verify your phone number <a class="italic underline pink">here</a>
          </div> 
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
  .breadcrumbs{
    position:static;
  }
  .product-img{
    margin-top:0;
  }
}
</style>