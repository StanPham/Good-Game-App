<script setup>
import { collection, onSnapshot} from "firebase/firestore"; 

import { db } from "@/firebase"


import { useRoute } from 'vue-router';
import { onMounted, ref, watch, computed} from 'vue';
import pika from '../images/pikachu.webp'
import booster from '../images/booster.png'
const selectedCategory = ref("");
const searchQuery = ref("");

const setActiveTab = (tabName) => {
  selectedCategory.value = tabName;
};
const myShops = ref([]);

onMounted( () => {
 onSnapshot(collection(db, 'shop'), (querySnapshot) => {
   const tmpItems = [];
   querySnapshot.forEach((doc) => {
     const item = {
       id: doc.id,
       name: doc.data().name,
       category: doc.data().category,
       price: doc.data().price,
       quant: doc.data().quant,
       desc: doc.data().desc,
       img: doc.data().img,

       
     }
     tmpItems.push(item)
   });
   myShops.value = tmpItems;
 
 });
 
})

const categoryMapping = {
    mtg: 'Magic: The Gathering',
    yug: 'Yugioh',
    pok: 'Pokemon',
    ddd: 'D&D',
    oth: 'Accessories',
    '':'All Products'
};

const filteredShops = computed(() => {
    let results = myShops.value;
    
    if (selectedCategory.value) {
        const actualCategory = categoryMapping[selectedCategory.value];
        results = results.filter(shop => shop.category === actualCategory);
    }
    
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        results = results.filter(shop => 
            shop.name.toLowerCase().includes(query) || 
            shop.category.toLowerCase().includes(query)
        );
    }
    
    return results;
});


const route = useRoute();
watch(route, (newRoute) => {
    if (newRoute.query.category) {
        selectedCategory.value = newRoute.query.category;
    }
});

</script>
<template>
    <div class="body-wrapper">
  

    <div class="search">
        <div class="search-container">
        <img src="../images/search.svg" alt="deez" class="search-icon">
        <input type = "text" class="input-box" placeholder="Search" v-model="searchQuery">
    </div>
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
        <div class="desktop-categories">
            <div class="button-wrapper">
            <button @click="setActiveTab('')" class="cat-btn">All Products</button>
            
            <button @click="setActiveTab('mtg')" class="cat-btn">Magic: The Gathering</button> 
            <button @click="setActiveTab('yug')" class="cat-btn">YuGiOh</button> 
            <button @click="setActiveTab('pok')" class="cat-btn">Pokemon</button> 
            <button @click="setActiveTab('oth')" class="cat-btn">Accessories</button> 
            
        </div>
        </div>
        <div class="title-wrap">
            <div class="results">{{ categoryMapping[selectedCategory] }}: {{ filteredShops.length }} RESULTS </div>
        
    <main class="product-container" >
        
        <div class="work-wrap" v-for="shop in filteredShops" :key="shop.id">
            <router-link :to="`/product/${shop.id}`" class="link">
        <div class="prac">
            <img :src="shop.img" alt="" class="pika">
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
</div>
    
</template>

<style scoped>
.results{
    font-size:1.1rem;
    margin-left:1rem;
}
.cat-btn:hover,
.cat-btn:focus{
    background:white;
    color:black;
}
.cat-btn{
   
   border-radius:1rem;
   width:100%;
   padding:.5rem;
}
.cat-btn{
   
    border-radius:1rem;
    width:100%;
    padding:.5rem;
}
.button-wrapper{
    padding:1rem;
    display:flex;
    flex-direction: column;
    gap:1rem;
    font-size:1.3rem;
}

.desktop-categories{
    display:none;
    width:20%;
    background: black;
    border-radius: 1rem;
    margin-top:1.4rem;
 
}
.main-container{
    margin-top:1rem;
    display:flex;
  
  
   justify-content: center;
   gap:1rem;
}
.link{
    text-decoration: none;
    width:100%;
  
}
.search-icon{
    width:20px;
    height:20px;
    position:absolute;
    top: 20%;
    left: 1rem;
   
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
    width:100%;
    background-color: rgb(238, 235, 235);
    border-radius: 20px;
    border: 1px solid #21272b;
    padding-left:50px;
    max-height: 30px;
    height:30px ;
    color:black;
   
}
.search-container{
    position:relative;
    width:70%;
    display:flex;
    justify-content:center;
}
.search{
  width:100vw;
  padding-top:1rem;
  display:flex;
  justify-content: center;
 
 
   
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
    font-size:1.15rem;
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
    grid-template-columns: repeat(auto-fit, minmax(10rem,1fr));
   padding:clamp(10px,3%,1.5rem);
    gap: 1.3rem;
    width:100%;
    background:rgb(0, 0, 0);
  
    border-radius:1rem;
  


}
.title-wrap{
    width:clamp(100px, 100%,70rem) ;
}
.prac{
    padding:1rem;
   
   display:flex;
   justify-content: flex-start;
   flex-direction: column;
  
    
}
img{
    height: clamp(150px, 20vh, 40rem);
    width:clamp(100%, 75%, 50rem);
}
.work-wrap{
    
    /* width:clamp(150px,20vw,40rem);  */
    background:rgb(29, 28, 28);
   
    border:rgb(73, 69, 69) 1px solid;
    border-radius:.5rem;
    max-width:250px;
    
   
 
}

.product-name{
    padding-top:.5rem;
    font-size:1.5rem;
}

@media(min-width:763px){
  main{
    grid-template-columns: repeat(auto-fit, minmax(13rem,1fr));
  }
}
@media(min-width:1450px){
    .desktop-categories{
        display:block;
    }
    .cat-wrap{
        display:none;
    }
}
</style>

