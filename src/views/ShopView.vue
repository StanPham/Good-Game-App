<template>
    <div class="body-wrapper">
  

    <div class="search">
        <img src="../images/search.svg" alt="deez" class="search-icon">
        <input type = "text" class="input-box" placeholder="Search">
    </div>
    <div class="cat-wrap">
    <label for="product-select"></label>

    <select name="products" id="product-select" v-model="selectedCategory">
    <option value="">--Please choose a category--</option>
    <option value="mtg">Magic: The Gathering</option>
    <option value="yug">Yugioh</option>
    <option value="pok">Pokemon</option>
    <option value="ddd">D&D</option>
    <option value="oth">Accessories</option>
    
    </select>
    </div>
    <!-- <div class="filter">
        <img src="../components/filter.svg" alt="deez" class="filter-icon">
        <button class="filter-button">Filter By</button>
    </div> -->

    <div class="main-container">
        <div class="desktop-categories"></div>
    <main class="product-container" >
        <div class="work-wrap" v-for="shop in filteredShops" :key="shop.id">
            <router-link :to="`/product/${shop.name}`" class="link">
        <div class="prac">
            <img :src="shop.image" alt="" class="pika">
            <div class="product-name">{{shop.name}}</div>
            <div class="price">{{ shop.price }}</div>
            <p class="quant">Quantity: {{shop.quant}}</p>
            <br>
        </div>
    </router-link>
        </div>
   
    </main>
</div>
</div>
    
</template>

<style scoped>
.main-container{
    margin-top:1rem;
}
.link{
    text-decoration: none;
    width:100%;
  
}
.search-icon{
    width:20px;
    height:20px;
    position:absolute;
    top: 45%;
    left: 15%;
   
}
.filter-icon{
    width:20px;
    margin-left:10px;
}
.filter{
   
    margin-top:1rem;
    margin-left:1rem;
    display:flex;
    width:clamp(1px,40%,15rem);
    border-radius: 1rem;
    background-color: white;
    border:black 1px solid;
}
.filter-button{
    
   
    
    color:black;
    padding: 2px 1rem;
  
   position:relative;
   
}

.input-box{
    width:clamp(20rem, 50%,90vw);
    background-color: rgb(238, 235, 235);
    border-radius: 20px;
    border: 1px solid #21272b;
    padding-left:50px;
    max-height: 30px;
    height:30px ;
    color:black;
   
}
.search{
  width:100vw;
  padding-top:1rem;
  display:flex;
  justify-content: center;
  position:relative;
 
   
}

select{
    background-color: rgb(0, 0, 0);
    font-size:1.5rem;
   
}

.cat-wrap{
   display:flex;
   justify-content: center;
   padding-top:1rem;
}
.body-wrapper{
    margin-top:3rem;
}
.quant{
    font-size: .8rem;
    padding-top:.2rem;
}
.price{
    font-weight: bold;
}
.header{
    background-color: grey;
    width:100%;
    
}
main{
    /* display:flex;
   
  justify-content: space-between;
    flex-wrap:wrap; */
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(9.5rem,1fr));
   padding:5%;
    gap: 1.3rem;
    width:clamp(100px, 100%,60rem) ;
    background:rgb(0, 0, 0);


}
.prac{
    padding:1rem;
   
   display:flex;
   justify-content: flex-start;
   flex-direction: column;
  
    
}
img{
    height: clamp(150px, 20vh, 40rem);
    width:clamp(75%, 75%, 50rem);
}
.work-wrap{
    
    /* width:clamp(150px,20vw,40rem);  */
    background:rgb(29, 28, 28);
   
    border:rgb(73, 69, 69) 1px solid;
    border-radius:.5rem;
 
 
}

.product-name{
    padding-top:.5rem;
}

</style>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import {ref, computed} from 'vue';
import pika from '../images/pikachu.webp'
import booster from '../images/booster.png'
const selectedCategory = ref("");
const myShops = ref([
    {
        id:1,
        image: booster,
        name: 'Wilds of Eldraine Set Boosters',
        price: '$99.99',
        quant: 3,
        category: 'mtg',

    },
    {
        id:2,
        image: booster,
        name: 'Pokemon Pack Watch Twenty Seven',
        price: '$99.99',
        quant: 3,
        category: 'Pokemon',

    },
    {
        id:3,
        image: booster,
        name: 'Yugioh Grindin and Shinin',
        price: '$99.99',
        quant: 3,
        category: 'Yugioh',

    },
    {
        id:3,
        image: booster,
        name: 'Yugioh Grindin and Shinin',
        price: '$99.99',
        quant: 3,
        category: 'Yugioh',

    },
    {
        id:3,
        image: booster,
        name: 'Yugioh Grindin and Shinin',
        price: '$99.99',
        quant: 3,
        category: 'Yugioh',

    },
    {
        id:3,
        image: booster,
        name: 'Yugioh Grindin and Shinin',
        price: '$99.99',
        quant: 3,
        category: 'Yugioh',

    },
]);
const categoryMapping = {
    mtg: 'mtg',
    yug: 'Yugioh',
    pok: 'Pokemon',
    ddd: 'D&D',
    oth: 'Accessories'
};
const filteredShops = computed(() => {
    if (!selectedCategory.value) return myShops.value;  
    
    const actualCategory = categoryMapping[selectedCategory.value];
    return myShops.value.filter(shop => shop.category === actualCategory);
});

const route = useRoute();
watch(route, (newRoute) => {
    if (newRoute.query.category) {
        selectedCategory.value = newRoute.query.category;
    }
});

</script>