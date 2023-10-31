<script setup>
import {ref, defineProps} from 'vue';
import router from '../router'

const myShops = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

</script>

<template>
    <div class="main-container rc">
      <div class="header pad-top title-big-scale cool-font rc">New Products (coming soon)</div>
      <br>
      <main class="product-container pad">
        <div class="work-wrap" v-for="item in myShops.items" :key="item.id">
          <router-link :to="`/product/${item.id}`" class="link">
            <div class="pad-left click">
              <img :src="item.img" :alt="`Image of ${item.name}`" class="product-image">
              <br><br>
              <div class="product-name">{{ item.name }}</div>
              <div class="price">{{ item.price }}</div>
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
.arrow{
    width:50px;
    filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
    cursor: pointer;
}
.left-arrow{
    width:1px;
}
.main-container{
    background:black;
   
}
.quant{
    font-size: .8rem;
}
.product-name,
.price{
    font-size:1.1rem;
}
.price{
  padding-top:5px;
}
.header{
    background: rgba(12, 12, 12, 0.616);
    width:100%;
    text-align:center;   
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

