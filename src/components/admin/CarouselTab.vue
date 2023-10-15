
<script setup>
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore"; 


import { db, storage } from "@/firebase"
import{ref as storageRef, uploadBytesResumable, getDownloadURL} from 'firebase/storage'

import { onMounted, ref, computed } from 'vue'


const newSlide = ref({
title: '',
subtitle:'',
subsubtitle: '',
btntxt:'',
link:'',
image:''
})





const mySlides = ref([])


const onImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageRef = storageRef(storage, 'carousel-images/' + file.name);
        await uploadBytesResumable(imageRef, file);
        newSlide.value.image = await getDownloadURL(imageRef);
       
    }
    }

const addSlide = async () =>{
   await addDoc(collection(db, "carousel"), {
     title: newSlide.value.title,
     subtitle: newSlide.value.subtitle,
     subsubtitle: newSlide.value.subsubtitle,
     btntxt: newSlide.value.btntxt,
     link: newSlide.value.link,
     img: newSlide.value.image,
    
    
   
     creationDate: Timestamp.fromDate(new Date())
   });

   
}


const deleteSlide = async id => {
 if(confirm("you sure buddy?")) await deleteDoc(doc(db, "carousel", id));
}


 
onMounted( () => {
 onSnapshot(collection(db, 'carousel'), (querySnapshot) => {
   const tmpSlides = [];
   querySnapshot.forEach((doc) => {
     const slide = {
       id: doc.id,
       title: doc.data().title,
       subtitle: doc.data().subtitle,
       subsubtitle: doc.data().subsubtitle,
       btntxt: doc.data().btntxt,
       link: doc.data().link,
       img: doc.data().img,

       
     }
     tmpSlides.push(slide)
   });
   mySlides.value = tmpSlides;
   
 });
 
})


</script>

<template>
<body>
<div class="form-container">
   <form @submit.prevent="addSlide">
     <h2>Add New Slide</h2>
    <label for="slideName">Slide Title</label>
     <input
     v-model="newSlide.title" 
       class="input"
       
       type="text"
       required>

       <label for="slidesubtitle">Subtitle</label>
     <input
     v-model="newSlide.subtitle" 
       class="input"
       
       type="text"
       >
     
       <label for="secondsubtitle">Another Subtitle</label>
     <input
     v-model="newSlide.subsubtitle" 
       class="input"
       
       type="text"
       >

       <label for="buttontext">Button Text</label>
     <input
     v-model="newSlide.btntxt" 
       class="input"
       
       type="text"
       >


       <label for="buttontext">Button Link</label>
     <input
     v-model="newSlide.link" 
       class="input"
       
       type="text"
       >
    
     
      

      <label for="iamge">Background</label>
      <input
     
       class="input"
       
       type="file"
       @change="onImageChange"
       required>
      
      
     
     
     <button type="submit" class="submit-btn">Submit</button>
     
   

   </form>
 </div>
 <table>
     <thead>
       <th scope="col">Title</th>
       
       <th scope="col">Subtitle</th>
       <th scope="col">Subsubtitle</th>
       <th scope="col">BTN Text</th>
       <th scope="col">BTN Link</th>
       <th scope="col">Background</th>
       
       <th scope="col">Actions</th>
     </thead>
     <tbody v-for="slide in mySlides" :key="slide.id">
       <tr >
         <td class="name">{{ slide.title }}</td>
         <td class="scrollable-cell"><div class="scrollable-content">{{ slide.subtitle }}</div></td>
         <td>{{ slide.subsubtitle }}</td>
         <td>{{ slide.btntxt }}</td>
         <td>{{ slide.link }}</td>
         
         <td><img :src="slide.img" alt="rip" width="100"></td>
         
        
        

         <td >
           <button class="editBut"
            
           >edit</button>
           <button class="delBut"
             @click="deleteSlide(slide.id)"
           >delete</button>
         </td>
         

       </tr>
       <tr class="filler-row"></tr>
     </tbody>
   </table>

</body> 
</template>

<style scoped>

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



 




</style>