<script setup>
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db, storage } from "@/firebase"
import{ref as storageRef, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { onMounted, ref, computed } from 'vue'

const searchQuery = ref('');





const newItem = ref({
 name: '',
 category:'',
 price: '',
 quantity:'',
 desc: '',
 image:''
})





const myItems = ref([])


const onImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageRef = storageRef(storage, 'shop-images/' + file.name);
        await uploadBytesResumable(imageRef, file);
        newItem.value.image = await getDownloadURL(imageRef);
        console.log(newItem.value.image);
    }
}

const addItem = async () =>{
   await addDoc(collection(db, "shop"), {
     name: newItem.value.name,
     category: newItem.value.category,
     price: newItem.value.price,
     quant: newItem.value.quantity,
     desc: newItem.value.desc,
     img: newItem.value.image,
    
    
   
     creationDate: Timestamp.fromDate(new Date())
   });

   newItem.value = {
        name: '',
        category: '',
        price: '',
        quantity: '',
        desc: '',
        image: '',
       
    };
    document.querySelector('input[type="file"]').value = null;
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
       >

       <label for="itemQuant">Quantity</label>
     <input
     v-model="newItem.quantity" 
       class="input"
       
       type="text"
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
      
      
     
     
     <button type="submit" class="submit-btn">Submit</button>
     
   

   </form>
 </div>

 
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
         <td>{{ item.quant }}</td>
         
         <td><img :src="item.img" alt="thease" width="100"></td>
         
        
        

         <td >
           <button class="editBut"
            
           >edit</button>
           <button class="delBut"
             @click="deleteItem(item.id)"
           >delete</button>
         </td>
         

       </tr>
       <tr class="filler-row"></tr>
     </tbody>
   
   </table>

</body> 
</template>

<style scoped>

thead{
  position:sticky;
  top:0;
}

input.checkbox{
    transform: scale(1.5);
}
.check-wrap{
    margin-left:auto;
}

body{
  font-family:Arial, Helvetica, sans-serif
}

h2{
 margin-inline:auto;
}
th{
 font-size: 1.8rem;
 font-family:'Times New Roman', Times, serif;
 background-color: grey;

}
.filler-row{
 border-bottom: rgba(255, 255, 255, 0.356) .2rem solid;
 

 


}
.name{
 text-align: center;
 
 font-weight:bold;
}
td{
font-size:1.3rem;
min-height:100%;
width:100%;
border: grey 1px solid;
}
.scrollable-cell {
   position: relative;
   text-align:left;
}

.scrollable-content {
   max-height: 6rem; 
   overflow-y: auto;
  
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   padding: 1rem; /* to match the padding of other cells */
}
.editBut{
 background-color: rgb(24, 216, 56);
 padding: .4rem;
 font-weight:bold;
 border-radius: 4px;
}
.delBut{
 background-color: rgba(255, 18, 18, 0.678);
 padding: .4rem;
 font-weight:bold;
 border-radius: 4px;
 margin-left:5px;
 
}

th,
td {
 width: 150px;
 text-align: center;
 
 padding: 1rem;
 
}

table { 
   
   table-layout:fixed;
   width:100%;
   border-collapse:collapse;
  
   border-spacing:0 15px;
  
  
}

tr{
 padding:10rem;
}




.submit-btn{
  
  background-color: rgb(168, 41, 168);
  font-size: 20px;
  border-radius: 10px;
  padding:5px;
  border:none;
  color:white;
  width:30%;
  margin-inline:auto;
}
.form-container{
  
 margin-inline:auto;
  width: clamp(200px, 90vw,35rem);
 
  display:flex;
  
  background-color: rgb(66, 60, 63);
 
 
  border-radius: 10px;
  color:white;
  margin-top:2rem;
  margin-bottom:2rem;

}
form{
   width:clamp(23rem,100%,5000px);
   display:flex;
   flex-direction: column;
   padding: 1.25em;
   gap:.5rem;
   
   
}
input{
 padding-left:1rem;
 margin-bottom:1rem;
}
textarea{
 color:black;
 padding-left:1rem;
 margin-bottom:1rem;
}
form input[type="text"]{
 color:black;

}
form input[type="datetime-local"]{
 color:black;
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