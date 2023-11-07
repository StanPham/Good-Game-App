<script setup>
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db, storage } from "@/firebase"
import {ref as storageRef, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { onMounted, ref, computed } from 'vue'

const searchQuery = ref('');
const showPopup = ref(false);
const showEditModal = ref(false);
const editingItem = ref({});
const showVariants = ref(false);
const showEditVariants = ref(false);

const newItem = ref({
 name: '',
 category:'',
 price: '',
 quantity:'',
 desc: '',
 image:'',
 variants: [{ varName: '', varPrice: '', varQuantity: '' }],
})


const myItems = ref([])

const displayPopup = () => {
  showPopup.value = true;
  setTimeout(() => {
    showPopup.value = false;

  }, 3000);
}


const onImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageRef = storageRef(storage, 'shop-images/' + file.name);
        await uploadBytesResumable(imageRef, file);
        if(showEditModal.value) {
            editingItem.value.img = await getDownloadURL(imageRef);
        } else {
            newItem.value.image = await getDownloadURL(imageRef);
        }

        console.log(newItem.value.image);
    
    }
}

const addItem = async () =>{
  console.log(newItem.value.variants);
  const variantsLength = newItem.value.variants?.length || 0;
  if (variantsLength > 0) {
       newItem.value.variants.pop();
   }
   if (!newItem.variants || newItem.variants.length === 0) {
  delete newItem.variants;
}
   await addDoc(collection(db, "shop"), {
     name: newItem.value.name,
     category: newItem.value.category,
     price: newItem.value.price,
     quant: newItem.value.quantity,
     desc: newItem.value.desc,
     img: newItem.value.image,
     variants: newItem.value.variants,
     numLeft: newItem.value.quantity,
    
     creationDate: Timestamp.fromDate(new Date())
   });

   newItem.value = {
        name: '',
        category: '',
        price: '',
        quantity: '',
        desc: '',
        image: '',
        variants: ref([{ varName: '', varPrice: '', varQuantity: '' }]),
       
    };
    document.querySelector('input[type="file"]').value = null;
    showVariants.value = false;
    displayPopup();
}


const deleteItem = async id => {
 if(confirm("you sure buddy?")) await deleteDoc(doc(db, "shop", id));
}


 
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
       variants: doc.data().variants

       
     }
     tmpItems.push(item)
   });
   myItems.value = tmpItems;
   console.log(myItems.value)
 });
 
})



const filteredItems = computed(() => {
    return myItems.value.filter(item => 
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const minus = (item) => {
    if (item.quant > 0) { 
        item.quant--;
        updateItemQuantity(item); 
    }
}

const plus = (item) => {
    item.quant++;
    updateItemQuantity(item); 
}

const updateItemQuantity = async (item) => {
    await updateDoc(doc(db, "shop", item.id), {
        quant: item.quant
    });
}


const startEditing = (item) => {
   editingItem.value = { ...item};
   showEditModal.value = true;
}

const updateItem = async () => {
  if (!editingItem.value.variants || editingItem.value.variants.length === 0) {
 editingItem.value.variants = [];}
   await updateDoc(doc(db, "shop", editingItem.value.id), {
     name: editingItem.value.name,
     category: editingItem.value.category,
     price: editingItem.value.price,
     quant: editingItem.value.quant,
     desc: editingItem.value.desc,
     img: editingItem.value.img,
     variants: editingItem.value.variants
   });

   showEditModal.value = false;
   editingItem.value = {};
}

const showVariantForm = () => {
  showVariants.value = !showVariants.value;
}

const addVariant = () => {
  newItem.value.variants.push({ varName: '', varPrice: '', varQuantity: '' });
};

const showEditVariantForm = () => {
  showEditVariants.value = !showEditVariants.value;
}

const deleteVariant = (index) => {
  editingItem.value.variants.splice(index, 1);
};
</script>

<template>
  <body>
    <div class="form-container">
      <form @submit.prevent="addItem">
        <h2>Add New Item</h2>

        <label for="itemName">Item Name</label>
        <input
          v-model="newItem.name" 
          class="input"
          type="text"
          required>
          

        <label for="itemCat">Category</label>
        <input
          v-model="newItem.category" 
          class="input"
          type="text"
        >
          
        
        <label for="itemPrice">Price</label>
        <input
          v-model="newItem.price" 
          class="input"
          type="text"
          pattern="^\$\d+\.\d{2}$"
          title="$12.99"
        >

        <label for="itemQuant">Quantity</label>
        <input
          v-model.number="newItem.quantity" 
          class="input"
          type="number"
          min="0"
        >
        
        <label for="Description">Description</label>
        <textarea
          v-model="newItem.desc"
          class="input"
          type="textarea"
        >
        </textarea>

        <label for="iamge">Image</label>
        <input
          class="input"
          type="file"
          @change="onImageChange"
          required>
        
        <button v-if="!showVariants" type="button" class="variant-btn" @click="showVariantForm">Add Variants +</button>
        <div v-if="showVariants" v-for="(variant, index) in newItem.variants" :key="index" class="variant flex column">
          <input v-model="variant.varName" placeholder="Variant Name" type="text">
          <input v-model="variant.varPrice" placeholder="Price" type="text">
          <input v-model="variant.varQuantity" placeholder="Quantity" type="text">
        </div>
        <button v-if="showVariants" type="button" class="submit-btn" @click="addVariant">Add Variant</button>

        <br><br>
        <button type="submit" class="submit-btn">Submit</button>
        
      </form>
    </div>

    <!-- editing form stuff -->
    <div v-if="showEditModal" class="overlay" @click="showEditModal = false"></div>
    <div v-if="showEditModal" class="form-container editing-container">
      <form @submit.prevent="updateItem">
        <h2>Edit Item</h2>
        
        <label for="itemName">Item Name</label>
        <input
          v-model="editingItem.name" 
          class="input"
          type="text"
          required>

        <label for="itemCat">Category</label>
        <input
          v-model="editingItem.category" 
          class="input"
          type="text"
        >
          
        
        <label for="itemPrice">Price</label>
        <input
          v-model="editingItem.price" 
          class="input"
          type="text"
          pattern="^\$\d+\.\d{2}$"
          title="$12.99"
        >

        <label for="itemQuant">Quantity</label>
        <input
          v-model.number="editingItem.quant" 
          class="input"
          type="number"
          min="0"
        >
          
        
        <label for="Description">Description</label>
        <textarea
          v-model="editingItem.desc"
          class="input"
          
          type="textarea"
          >
        </textarea>

        <label for="iamge">Image</label>
        <input
        class="input"
        type="file"
        @change="onImageChange"
        >

        <button v-if="!showEditVariants && (editingItem.variants.length > 0)" type="button" class="variant-btn" @click="showEditVariantForm">Show Variants +</button>
        <div v-if="showEditVariants" v-for="(variant, index) in editingItem.variants" :key="index" class="variant flex column">
          <input v-model="variant.varName" placeholder="Variant Name" type="text">
          <input v-model="variant.varPrice" placeholder="Price" type="text">
          <input v-model="variant.varQuantity" placeholder="Quantity" type="text">
          <button type="button" class="del-btn" @click="deleteVariant(index)">Delete Variant</button>
          <br><br>
        </div>
        
        <button type="submit" class="submit-btn">Save Changes</button>
        <button @click="showEditModal = false">Cancel</button>
      </form>
    </div>
     <!-- end editing form -->

  
    <div class="search">
      <div class="search-container">
        <img src="../../images/search.svg" alt="deez" class="search-icon">
        <input type = "text" class="input-box" placeholder="Search" v-model="searchQuery">
      </div>
    </div>

    <table>
      <thead>
        <th scope="col">Name</th>
        <th scope="col">Desc</th>
        <th scope="col">Cate.</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Image</th>
        <th scope="col">Actions</th>
      </thead>
        
      <tbody v-for="item in filteredItems" :key="item.id">
        <tr>
          <td class="name">{{ item.name }}</td>
          <td class="scrollable-cell"><div class="scrollable-content">{{ item.desc }}</div></td>
          <td>{{ item.category }}</td>
          <td>{{ item.price }}</td>
          <td class="quant-cell">
            <div class="quantity-wrapper">
              {{ item.quant }}
              <button class="quant-ops" @click="plus(item)">+</button> 
              <button class="quant-ops" @click="minus(item)">-</button>
            </div>
          </td>
              
          <td><img :src="item.img" alt="thease" width="100"></td>
          
          <td>
            <button class="edit-btn"
              @click="startEditing(item)"
            >edit</button>
            <button class="del-btn"
              @click="deleteItem(item.id)"
            >delete</button>
          </td>
          
        </tr>
        <tr class="filler-row"></tr>
      </tbody>
    </table>
  </body>
  <transition name="fade-translate">
    <div v-if="showPopup" class="popup">test</div>
  </transition> 
</template>

<style scoped>
@import '@/assets/AdminTabs.css';

.popup{
  color:black;
  position:fixed;
  top:20%;
  left:50%;
  width:200px;
  height:100px;
  background:white;
}

.popup-enter-active, .popup-leave-active {
  transition: all 0.5s ease-out;
  opacity: 1;
  transform: translateY(0);
}


.popup-enter, .popup-leave-to {
  opacity: 0;
  transform: translateY(-50px); 
}

.quant-ops{
  padding:.1rem .5rem;
  margin-left:.1rem;
  background:grey;
}

.quant-ops:hover{
  color:grey;
  background:white;
  
}

thead{
  position:sticky;
  top:0;
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

.search-icon{
  width:20px;
  height:20px;
  position:absolute;
  top: 15%;
  left: 1rem;
}

</style>