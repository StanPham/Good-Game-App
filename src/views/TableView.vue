<script setup>
import { addDoc, getDocs, updateDoc, query, where, collection, doc } from 'firebase/firestore';
import { db } from "@/firebase"
import {ref} from 'vue'

const numLongTables = 5;
const numRoundTables = 5;
const numFeltTables = 1;
const tableType = ref();
const reserveDate = ref();
const numTables = ref();
const startTime = ref();
const endTime = ref();
const addTableReservation = async () =>{
  const q = query(collection(db, tableType.value), where("date", "==", reserveDate.value));
  const querySnapshot = await getDocs(q);
  let docRef = null;
  let tableArr = null;
  if(querySnapshot.empty){
    docRef = await addDoc(collection(db, tableType.value),{
      date: reserveDate.value,
      tables: new Array(7).fill(5),
      
    })
    tableArr = docRef.tables;
    for(let i = startTime.value; i<endTime.value; i++ ){
      tableArr[i] -= numTables.value;
    }
    await updateDoc(docRef,{
      tables: tableArr
    })
  }else{
    const document = querySnapshot.docs[0];
    docRef = doc(db, tableType.value, document.id)
    tableArr = docRef.tables;
    for(let i = startTime.value; i<endTime.value; i++ ){
      tableArr[i] -= numTables.value;
    }
    await updateDoc(docRef,{
      tables: tableArr
    })
  }
  

  console.log('here')
}

</script>

<template>
  <div class="outer-container">
    <main class="main-card rc">
      <div class="left-content">
        <h1 class="jockey rc text-center">Create Table Reservation</h1>
        <div>
          <form class="flex column gap-big" @submit.prevent="addTableReservation">
            <div class="input-container">
              <label>Choose Table Type</label>
              <select v-model="tableType">
                <option value="round">Round Table</option>
                <option value="long">Long Table</option>
                <option value="felt">Felt Table</option>
              </select>
            </div>
            <div class="input-container">
              <label>Number of Tables</label>
              <select v-model="numTables">
                <option value=1>1</option>
                <option value=2>2</option>
                <option value=3>3</option>
              </select>
            </div>

            <div class="input-container">
              <label>Choose a Date</label>
              <input type="date" v-model="reserveDate">
            </div>

            <div class="input-container">
              <label>Choose Start Time</label>
              <select v-model="startTime">
                <option value="0">2:00PM</option>
                <option value="1">3:00PM</option>
                <option value="2">4:00PM</option>
                <option value="3">5:00PM</option>
                <option value="4">6:00PM</option>
                <option value="5">7:00PM</option>
                <option value="6">8:00PM</option>
              </select>
            </div>
            <div class="input-container">
              <label>Choose End Time</label>
              <select v-model="endTime">
                <option value="0">2:00PM</option>
                <option value="1">3:00PM</option>
                <option value="2">4:00PM</option>
                <option value="3">5:00PM</option>
                <option value="4">6:00PM</option>
                <option value="5">7:00PM</option>
                <option value="6">8:00PM</option>
              </select>
            </div>
            <button class="main-btn-full reserve-btn">Make Reservation</button>
          </form>
        </div>
      </div>
      <div class="img-container">
        <img src="../images/table.webp" alt="" class="table-image">
      </div>
    </main>
  </div>
</template>

<style scoped>
.reserve-btn{
  letter-spacing:2px;
}
.left-content{
  padding:2rem;
}
.table-image{
  min-height:100%;
  object-fit:cover;
  border-radius: 0 1rem 1rem 0;
  
}
.main-card{
  background: rgb(0, 0, 0);
  width: min(100%, 60rem);
  display:grid;
  gap:1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-left:auto;
  margin-right:auto;
}
.outer-container{
  margin-top: calc(var(--header-height) + 2rem);
}
form{
  margin-top:2rem;
}
label{
  font-size:1.8rem;
  font-family:'Jockey';
}
.input-container{
  display:flex;
  flex-direction: column;
}
input, select{
  border-radius: 5px;
  border: 1px solid black;
  width:100%;
  height: 3rem;
  padding-left:1.25rem;
  background: #514c57;
  font-size: 1.4rem;
}

@media(max-width:900px){
  .img-container{
    display:none;
  }
  .main-card{
    grid-template-columns: 1fr;
  }
}
</style>