<template>
    <div class="main-container">
        <div class="header">New Products</div>
        <br>
        <main class="product-container" >
          
        <div class="work-wrap" v-for="shop in myShops" :key="shop.id">
            
        <div class="prac">
            <img :src="shop.image" alt="" class="pika">
            <br><br>
            <div class="product-name">{{shop.name}}</div>
            
            <div class="price">{{ shop.price }}</div>
            
            <br>
        </div>
  
        </div>
        <div class="left-arrow"> <img src="./arrow.svg" alt="" class="arrow"></div>
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
    font-size:3rem;
    font-family: var(--cool-font);
    padding-top:10px;
    
}
main{
    display:flex;
    
    align-items: center;
    justify-content:space-evenly;
    margin:1rem;
    gap: 1.5rem;
    max-width:100%;


}
.prac{
    padding-left:1rem;
    cursor:pointer;
    
}
img{
    height:300px;
    max-width:300px;
}

</style>

<script setup>
import {ref} from 'vue';
import pika from './pikachu.webp';
import mtg from './mtg.webp'
import cardcase from './cardcase.png'
const myShops = ref([
    {
        id:1,
        image: mtg,
        name: 'MTG Commander Masters',
        price: '$99.99',
        quant: 3,
        category: 'MTG',

    },
    {
        id:2,
        image: cardcase,
        name: 'Pokemon Pack Watch Twenty Seven',
        price: '$99.99',
        quant: 3,
        category: 'Pokemon',

    },
    {
        id:3,
        image: mtg,
        name: 'MTG Commander Masters',
        price: '$99.99',
        quant: 3,
        category: 'Yugioh',

    },
    {
        id:3,
        image: cardcase,
        name: 'Yugioh Grindin and Shinin',
        price: '$99.99',
        quant: 3,
        category: 'Yugioh',

    },
]);
</script>