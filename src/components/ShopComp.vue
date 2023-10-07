<template>
    <div class="main-container">
        <div class="header">New Products</div>
        <main class="product-container" >
            <div class="left-arrow">xd</div>
        <div class="work-wrap" v-for="shop in myShops" :key="shop.id">
            
        <div class="prac">
            <img :src="shop.image" alt="" class="pika">
            <br>
            <div class="product-name">{{shop.name}}</div>
            
            <div class="price">{{ shop.price }}</div>
            
            <br>
        </div>
  
        </div>
        <div class="left-arrow">xd</div>
    </main>
    </div>
</template>

<style scoped>
.left-arrow{
    width:1px;
}
.main-container{
    background:black;
   
}
.quant{
    font-size: .8rem;
}
.price{
    font-weight: bold;
}
.header{
    background-color: purple;
    width:100%;
    text-align:center;
    font-size:3rem;
    font-family: var(--cool-font);
    
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
        name: 'Wilds of Eldraine Set Boosters',
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
        image: pika,
        name: 'Yugioh Grindin and Shinin',
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