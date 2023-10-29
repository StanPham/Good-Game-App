<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import router from '../router'
import PhoneNumber from '../components/modals/PhoneNumber.vue';

const amount = ref('1');
const route = useRoute();
const productID = route.params.name; 
const productData = ref(null);
let verifiedPhoneNumber = ref(false);

onMounted(async () => {
  const productDoc = doc(db, 'shop', productID); 
  const productSnapshot = await getDoc(productDoc);
  if (productSnapshot.exists()) {
    productData.value = productSnapshot.data();
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

let phoneModal = () => verifiedPhoneNumber.value = true;
</script>

<template>
  <PhoneNumber v-if="verifiedPhoneNumber"/>
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
        <h1>{{ productData.name }}</h1>
        <p>{{ productData.desc }}</p>
        <p class="price pad-top bold">{{ productData.price }}</p>
        <br>
        <div v-if="productData.quant!=0" class="flex gap pad-bot">
          <select v-model="amount">
            <option v-for="num in productQuantityOptions" :key="num" :value="num">
              {{ num }}
            </option>
          </select>
          <button class="btn-even-pad" @click="phoneModal">Reserve Now</button>
        </div>
        <div v-else class="title-scale" style="font-style:italic">Sold Out</div>
      </div>
      
    </div>
    
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<style scoped>
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

p{
  font-size:1.4rem;
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