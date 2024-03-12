<script setup>
import { collection, onSnapshot, doc, updateDoc, deleteField } from "firebase/firestore"; 
import { db } from "@/firebase"
import { onMounted, ref, computed } from 'vue'

const docFields = ref({});
const documentId = ref();
const newTableType = ref('');
const newTableCount = ref('');
const showEditSuccess = ref({ show: false, counter: 0 });

onMounted(() => {
  onSnapshot(collection(db, 'tableInfo'), (querySnapshot) => {
    if (querySnapshot.docs.length > 0) {
      const docData = querySnapshot.docs[0].data();
      documentId.value = querySnapshot.docs[0].id;
      docFields.value = docData; 
    } else {
      console.log('No documents found in tableInfo');
    }
  });
});
function updateField(fieldName, value) {
  const parsedValue = parseFloat(value);
  docFields.value[fieldName] = parsedValue
}

const deleteFieldFromDoc = async (fieldName) => {
  try {
    const docRef = doc(db, 'tableInfo', documentId.value);
    await updateDoc(docRef, {
      [fieldName]: deleteField()
    });
    delete docFields.value[fieldName]; 
  } catch (error) {
    console.error("Error deleting field: ", error);
  }
};

async function updateInfo(){
  const docRef = doc(db, 'tableInfo', documentId.value);
  await updateDoc(docRef, docFields.value);

  showEditSuccess.value = { show: true, counter: showEditSuccess.value.counter + 1 };
}

async function addTables() {
  const newValue = parseInt(newTableCount.value, 10); 
  if (newValue > 0) { 
    docFields.value[newTableType.value] = newValue;
    await updateInfo(); 
    newTableType.value = ''; 
    newTableCount.value = '';
  }
}
</script>

<template>
  <body class="flex flex-sb align-c ">
    <form @submit.prevent="updateInfo">
      <h1 class="title-big">Edit or Delete Tables</h1>
      <ul class="custom-font">
        <li v-for="(value, fieldName) in docFields" :key="fieldName">
          {{ fieldName }}: 
          <input 
            type="number" 
            :placeholder="value"
            :value="value"
            @input="updateField(fieldName, $event.target.value)"
          >
          <button type="button" class="custom-del-btn" @click.prevent="deleteFieldFromDoc(fieldName)">Delete</button>
        </li>
      </ul>
      <button type="submit" class="submit-btn custom-btn">Save Changes</button>
      <div v-if="showEditSuccess.show" :key="showEditSuccess.counter" class="italic blink-bg custom-msg">Edit Successful!</div>
    </form>

    <form @submit.prevent="addTables" class="custom-font">
      <h1 class="title-big">Add New Tables</h1>
      
      <label>Table Type</label>
      <input v-model="newTableType" type="text" placeholder="Enter table type">
      <label># of Tables</label>
      <input v-model.number="newTableCount" type="number" placeholder="Enter number of tables">
      <button type="submit" class="submit-btn">Add Tables</button>
    </form>
  </body>
</template>
          
          
<style scoped>
@import '@/assets/AdminTabs.css';

ul{
  list-style:none;
}

.custom-btn{
  margin-inline:0;
}

.custom-font{
  font-size:1.5rem;
}

.custom-del-btn{
  border: 1px solid red;
  padding:.1em .5em;
  margin-left:6px;
  background:black;
}

form{
  max-width:50rem;
}

.blink-bg{
  animation: blinkingBackground 1s 2;
}

@keyframes blinkingBackground{
    0%   {background-color: #35bd40;}
    50% {background-color: rgb(60, 240, 24);}
}

.custom-msg{
  padding:2px 5px;
}
</style>


 


