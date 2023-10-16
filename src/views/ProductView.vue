<template>
    <div class="deez" style="margin-top:20rem">
<div v-if="productData">
    <h1>{{ productData.name }}</h1>
    <img :src="productData.img" alt="Product Image">
    <p>{{ productData.desc }}</p>
    <p>Price: {{ productData.price }}</p>
    <p>Quantity: {{ productData.quant }}</p>
</div>
<div v-else>
    Loading...
</div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

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
</script>