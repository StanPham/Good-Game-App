<script setup>
import {ref} from 'vue';
import pika from '../images/pikachu.webp';
import mtg from '../images/mtg.webp'
import cardcase from '../images/cardcase.png'
import gengar from '../images/gengar.png'
import snorlax from '../images/snorlax.png'
import bulba from '../images/bulba.png'
const myShops = ref([
    {
        id:1,
        image: gengar,
        name: 'Product #1',
        price: '$99.99',
        quant: 3,
        category: 'MTG',

    },
    {
        id:2,
        image: snorlax,
        name: 'Product #2',
        price: '$19.99',
        quant: 3,
        category: 'Pokemon',

    },
    {
        id:3,
        image: bulba,
        name: 'Product #3',
        price: '$99.99',
        quant: 3,
        category: 'Yugioh',

    },
    {
        id:3,
        image: gengar,
        name: 'Product #4',
        price: '$19.99',
        quant: 3,
        category: 'Yugioh',

    },
]);
</script>

<template>
    <div class="main-container">
        <div class="header pad-top title-big-scale cool-font">New Products (coming soon)</div>
        <br>
        <main class="product-container" >
          
        <div class="work-wrap" v-for="shop in myShops" :key="shop.id">
            
        <div class="pad-left click">
            <img :src="shop.image" alt="" class="pika">
            <br><br>
            <div class="product-name">{{shop.name}}</div>
            
            <div class="price">{{ shop.price }}</div>
            
            <br>
        </div>
  
        </div>
       
    </main>
    </div>
</template>

<style scoped>
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
    display:flex;
    align-items: center;
    justify-content:space-evenly;
    margin:1rem;
    gap: 1.5rem;
    max-width:100%;
}

img{
    height:300px;
    max-width:300px;
}

</style>

