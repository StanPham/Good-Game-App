<script setup>
import { collection, onSnapshot} from "firebase/firestore"; 
import { db } from "@/firebase"
import { useRoute } from 'vue-router';
import { onMounted, ref, watch, computed, onUnmounted} from 'vue';

const selectedCategory = ref("");
const sortMethod = ref("");
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
       creationDate: doc.data().creationDate,
       
     }
     tmpItems.push(item)
   });
   myShops.value = tmpItems;
   sortItems();
 });
 
})

const sortItems = () => {
  if (sortMethod.value === 'low') {
    const getPriceAsNumber = (priceString) => parseFloat(priceString.replace(/[^\d.]/g, ''));

    myShops.value.sort((a, b) => getPriceAsNumber(a.price) - getPriceAsNumber(b.price));
    console.log(sortMethod.value)

  } else {
    myShops.value.sort((a, b) => b.creationDate - a.creationDate);
  }
};
  
watch(sortMethod, () => {
  sortItems();
  console.log(myShops.value);
})

const categoryMapping = {
    mtg: 'Magic: The Gathering',
    yug: 'Yugioh',
    pok: 'Pokemon',
    rpg: 'RPG',
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
  <div class="view-top-margin">
      <div class="search flex-c pad-top">
        <div class="search-container flex-c rel">
          <img src="../images/search.svg" alt="deez" class="search-icon">
          <input type = "text" class="input-box" placeholder="Search" v-model="searchQuery">
        </div>
      </div>

      <div class="cat-wrap flex-c pad-top">
        <label for="product-select"></label>
        <select name="products" id="product-select" v-model="selectedCategory">
            <option value="">--All Products--</option>
            <option value="mtg">Magic: The Gathering</option>
            <option value="yug">Yugioh</option>
            <option value="pok">Pokemon</option>
            <option value="rpg">RPG</option>
            <option value="oth">Accessories</option>
        </select>
      </div>
    <!-- <div class="filter">
        <img src="../components/filter.svg" alt="deez" class="filter-icon">
        <button class="filter-button">Filter By</button>
    </div> -->
    
      <div class="main-container flex-c">
        <div class="desktop-categories rc">
            <div class="title gap pad flex column jockey">
              <button @click="setActiveTab('')" class="cat-btn">All Products</button>
              <button @click="setActiveTab('mtg')" class="cat-btn">Magic: The Gathering</button> 
              <button @click="setActiveTab('yug')" class="cat-btn">YuGiOh</button> 
              <button @click="setActiveTab('pok')" class="cat-btn">Pokemon</button>
              <button @click="setActiveTab('rpg')" class="cat-btn">RPG</button>  
              <button @click="setActiveTab('oth')" class="cat-btn">Accessories</button> 
            </div>
        </div>
              
        <div class="title-wrap">
          <div class="flex-sb">
            <div class="results">{{ categoryMapping[selectedCategory] }}: {{ filteredShops.length }} RESULTS </div>
            <div class="sort-options">Sort by: 
              <select style="font-size:20px" v-model="sortMethod">
                <option value="">newest</option>
                <option value="low">lo/hi</option>
              </select>
            </div>
          </div>
          <main class="product-container" >
            <div class="work-wrap" v-for="shop in filteredShops" :key="shop.id">
              <router-link :to="`/product/${shop.id}`" class="link">
                  <div class="pad flex column product-info">
                      <div>
                        <img :src="shop.img" alt="" class="pika">
                        
                        <div class="product-name">{{shop.name}}</div>
                      </div>
                      <div class="title bold ">{{ shop.price }}</div>
                      
                      <p v-if="shop.quant==='0'" class="quant">Sold Out</p>
                      
                  </div>
              </router-link>
            </div>
          </main>
        </div>
      </div>
  </div>
</template>
    
          
<style scoped>
.product-info{
  justify-content: space-between;
  height:100%;
}

.sort-options{
  display:none;
  margin-right:.5rem;
}

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
  letter-spacing: 1px;
}

.desktop-categories{
  display:none;
  width:20%;
  background-color: black;
  margin-top:1.4rem;
  height:100%;
}

.main-container{
  margin-top:1rem;
  gap:1rem;
}

.link{
  text-decoration: none;
  width:100%;
  height:100%;
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
  width:70%;
}

.search{
  width:100vw;
}

select{
  background-color: rgb(0, 0, 0);
  font-size:1.5rem;
}

.quant{
  font-size: 1rem;
  padding-top:.2rem;
  font-style:italic;
}

.header{
  background-color: grey;
  width:100%;
}

main{
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
  
img{
  height: clamp(150px, 20vh, 40rem);
  width:clamp(100%, 75%, 50rem);
}

.work-wrap{
  background:rgb(29, 28, 28);
  border:rgb(73, 69, 69) 1px solid;
  border-radius:.5rem;
  max-width:250px;
  transition: 0.2s ease-in-out;
}

.work-wrap:hover{
  background:rgb(44, 43, 43);
  
}
 
.product-name{
  padding-top:.5rem;
  font-size:1rem;
  font-family:roboto;
  flex:1;
}

@media(min-width:763px){
  main{
    grid-template-columns: repeat(auto-fit, minmax(13rem,1fr));
  }
  .sort-options{
    display:block;
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
