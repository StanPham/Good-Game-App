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
order:'',
image:''
})

const showEditModal = ref(false);
const editingSlide = ref({});
const mySlides = ref([])

const onImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageRef = storageRef(storage, 'carousel-images/' + file.name);
        await uploadBytesResumable(imageRef, file);
        if(showEditModal.value) {
            editingSlide.value.img = await getDownloadURL(imageRef);
        } else {
            newSlide.value.image = await getDownloadURL(imageRef);
        }

        console.log(newSlide.value.image);
    }
}

const addSlide = async () =>{
   await addDoc(collection(db, "carousel"), {
     title: newSlide.value.title,
     subtitle: newSlide.value.subtitle,
     subsubtitle: newSlide.value.subsubtitle,
     btntxt: newSlide.value.btntxt,
     link: newSlide.value.link,
     order: newSlide.value.order,
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
       order: doc.data().order,
       img: doc.data().img,

       
     }
     tmpSlides.push(slide)
   });
   mySlides.value = tmpSlides;
   
 });
 
})

const startEditing = (slide) => {
   editingSlide.value = { ...slide };
   showEditModal.value = true;
}

const updateSlide = async () => {
   await updateDoc(doc(db, "carousel", editingSlide.value.id), {
     title: editingSlide.value.title,
     subtitle: editingSlide.value.subtitle,
     subsubtitle: editingSlide.value.subsubtitle,
     btntxt: editingSlide.value.btntxt,
     link: editingSlide.value.link,
     order: editingSlide.value.order,
     img: editingSlide.value.img,
   });

   showEditModal.value = false;
   editingSlide.value = {};
}

const sortedSlides = computed(() => {
  return mySlides.value.slice().sort((a, b) => a.order - b.order);
});
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
          required
        >

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

        <label for="order">Order</label>
        <input
          v-model="newSlide.order" 
          class="input"
          type="text"
        >
        
        
        <label for="iamge">Background</label>
        <input
          class="input"
          type="file"
          @change="onImageChange"
          required
        >
          
        <button type="submit" class="submit-btn">Submit</button>
        
      </form>
    </div>

    <!-- editing form stuff -->
    <div v-if="showEditModal" class="overlay" @click="showEditModal = false"></div>
    <div v-if="showEditModal" class="form-container editing-container">
      <form @submit.prevent="updateSlide">
        <h2>Edit Slide</h2>
        
        <label for="slideName">Slide Title</label>
        <input
          v-model="editingSlide.title" 
          class="input"
          type="text"
          required>

        <label for="slidesubtitle">Subtitle</label>
        <input
          v-model="editingSlide.subtitle" 
          class="input"
          type="text"
        >
        
        <label for="secondsubtitle">Another Subtitle</label>
        <input
          v-model="editingSlide.subsubtitle" 
          class="input"
          type="text"
        >

        <label for="buttontext">Button Text</label>
        <input
          v-model="editingSlide.btntxt" 
          class="input"
          type="text"
        >


        <label for="buttontext">Button Link</label>
        <input
          v-model="editingSlide.link" 
          class="input"
          
          type="text"
        >

        <label for="order">Order</label>
        <input
          v-model="editingSlide.order" 
          class="input"
          type="text"
        >

        <label for="iamge">Background</label>
        <input
        class="input"
        type="file"
        @change="onImageChange"
        >

        <button type="submit" class="submit-btn">Save Changes</button>
        <button @click="showEditModal = false">Cancel</button>
      </form>
    </div>
        
    <!-- end editing form -->

    <table>
      <thead>
        <th scope="col">Title</th>
        <th scope="col">Subtitle</th>
        <th scope="col">Subtext</th>
        <th scope="col">Button Text</th>
        <th scope="col">Button Link</th>
        <th scope="col">Background</th>
        <th scope="col">Order</th>
        <th scope="col">Actions</th>
      </thead>
      <tbody v-for="slide in sortedSlides" :key="slide.id">
        <tr>
          <td class="name">{{ slide.title }}</td>
          <td><div class="scrollable-content">{{ slide.subtitle }}</div></td>
          <td><div class="scrollable-content">{{ slide.subsubtitle }}</div></td>
          <td>{{ slide.btntxt }}</td>
          <td><div class="scrollable-content">{{ slide.link }}</div></td>
          <td><img :src="slide.img" alt="rip" width="100"></td>
          <td>{{ slide.order }}</td>
          <td>
            <button class="edit-btn"
              @click="startEditing(slide)"
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


 


