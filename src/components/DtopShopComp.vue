<script setup>
import {ref, defineProps} from 'vue';
import router from '../router'

const myShops = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const goShop = () => router.push('/shop');

</script>

<template>
    <div class="black rc">
      <div class="header-container flex rc">
        <div class="header flex pad-top pad-bot title-big-scale cool-font rc">New Products
          <button class="main-btn-full margin-right" @click="goShop">View All Products</button>
        </div>
        
      </div>
      <main class="product-container pad">
        <div class="work-wrap" v-for="item in myShops.items" :key="item.id">
          <router-link :to="`/product/${item.id}`" class="link">
            <div class="pad-left click">
              <img :src="item.img" :alt="`Image of ${item.name}`" class="product-image">
              <br><br>
              <div class="font-med">{{ item.name }}</div>
              <div class="price font-med bold">{{ item.price }}</div>
              <br>
            </div>
          </router-link>
        </div>
      </main>
    </div>
  </template>

<style scoped>
.link{
  text-decoration:none;
}

.quant{
  font-size: .8rem;
}

.price{
  padding-top:5px;
}

.header-container{
  background: rgba(20, 20, 20, 0.616);
  width:100%;
  justify-content: flex-end;
}

.header{
  width:60%;
  text-align:center;   
  align-items:center;
  justify-content: space-between;
}

main{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width:100%;
}

img{
  height:300px;
  max-width:300px;
}

</style>

