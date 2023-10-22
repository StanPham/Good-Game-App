<script setup>
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc } from "firebase/firestore"; 
import { db, storage } from "@/firebase"
import{ref as storageRef, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { onMounted, ref } from 'vue'


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
        <tr>
          <td class="name">{{ slide.title }}</td>
          <td class="scrollable-cell"><div class="scrollable-content">{{ slide.subtitle }}</div></td>
          <td>{{ slide.subsubtitle }}</td>
          <td>{{ slide.btntxt }}</td>
          <td>{{ slide.link }}</td>
          <td><img :src="slide.img" alt="rip" width="100"></td>
          <td>
            <button class="edit-btn"
              
            >edit</button>
            <button class="del-btn"
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
@import '@/assets/AdminTabs.css';

</style>


 


