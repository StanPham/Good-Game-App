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
  <div class="view-top-margin outermost-container flex-c-c">
    <div class="product-container flex-c-c wrap rc" v-if="productData">
      <img :src="productData.img" alt="Product Image" class="product-img">
      <div class="product-text">
        <h1>{{ productData.name }}</h1>
        <p>{{ productData.desc }}</p>
        <p class="price">{{ productData.price }}</p>
        <br>
        <div v-if="productData.quant!=0" class="quantity-wrap">
          <select v-model="amount">
            <option v-for="num in productQuantityOptions" :key="num" :value="num">
              {{ num }}
            </option>
          </select>
          <button class="btn-even-pad">Reserve Now</button>
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
.outermost-container{
  height:100%;
}
select{
  width:20%;
  border-radius:1rem;
  background-color: rgb(0, 0, 0);
  font-size:1.5rem;
  text-align: center;
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

.product-container{
  background:black;
  gap:2rem;
  width:clamp(350px, 80rem, 100%);
}

.product-img{
  width:clamp(500px, 50%, 50rem);
  height: clamp(50%, 20vh, 40rem);
}

.product-text{
  text-align:left;
  min-width:22rem;
  max-width:25rem;
  padding:.5rem;
}
</style>