<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const amount = ref('1');
const route = useRoute();
const productID = route.params.name; 

const productData = ref(null);

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
</script>


<template>
<div class="main-contain">
  
  
  <div class="product-container" v-if="productData">
      <img :src="productData.img" alt="Product Image" class="product-img">
    <div class="product-text">
      <h1>{{ productData.name }}</h1>
      <p>{{ productData.desc }}</p>
      <p class="price">{{ productData.price }}</p>
      <br>
      <div class="quantity-wrap">
        <select v-model="amount">
          <option v-for="num in productQuantityOptions" :key="num" :value="num">
            {{ num }}
          </option>
        </select>
        <button class="reserve-btn">Reserve Now</button>
      </div>
    </div>
  </div>

  <div v-else>
    Loading...
  </div>
</div>
</template>

<style scoped>
select{
  width:20%;
  border-radius:1rem;
  background-color: rgb(0, 0, 0);
  font-size:1.5rem;
  text-align: center;
}
.reserve-btn{
  font-size:1.5rem;
  background:var(--btn-color);
  padding:1rem;
  border-radius:1rem;
}
.quantity-wrap{
  display:flex;
  padding-bottom:1rem;
  gap:1rem;
}
.price{
  font-weight:bold;
  padding-top:1rem;
  font-size:1.8rem;
}
p{
  font-size:1.4rem;
}
.main-contain{
  margin-top:3rem;
 
  
}

.product-container{
  display:flex;
  justify-content: center;
  align-items:center;
 flex-wrap:wrap;
 background:black;
 gap:2rem;

 
}

.product-img{
  width:clamp(500px, 50%, 50rem);
  height: clamp(500px, 20vh, 40rem);
}

.product-text{
  text-align:left;
  min-width:22rem;
  max-width:25rem;
  padding:.5rem;
}
</style>