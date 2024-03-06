<script setup>
import { addDoc, getDocs, updateDoc, query, where, collection, doc, setDoc } from 'firebase/firestore';
import { db, firebaseAppAuth } from "@/firebase"
import {ref, watch, computed, onMounted} from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import FlatpickrComponent from '../components/FlatpickrComp.vue';

const user = ref(null);
const tableInfo = ref({});
const dayTables = ref([])
const tableType = ref();
const reserveDate = ref();
const numTables = ref();
const startTime = ref();
const endTime = ref();

onMounted(() => {
  fetchTableInfo();
});

const fetchTableInfo = async () => {
  const tableInfoCollectionRef = collection(db, "tableInfo");
  const snapshot = await getDocs(tableInfoCollectionRef);
  if (!snapshot.empty) {
    tableInfo.value = snapshot.docs[0].data();
  }
};

watch(tableInfo, (newValue) => {
  dayTables.value = tempTimeInfo.map(time => ({
    time,
    tables: JSON.parse(JSON.stringify(newValue)) 
  }));
}, { deep: true });

onAuthStateChanged(firebaseAppAuth, currentUser => {
    if(currentUser) {
      user.value = currentUser
      fetchTableInfo();
    }
})

const tempTimeInfo = [
  '12:00PM', '1:00PM','2:00PM','3:00PM','4:00PM','5:00PM','6:00PM','7:00PM','8:00PM','9:00PM','10:00PM',
]

const timeSlotAvailability = ref(new Array(tempTimeInfo.length).fill(true));

const availableStartTimes = computed(() => {
  if(isSaturday.value){
    return tempTimeInfo.filter((_, index) => timeSlotAvailability.value[index]);
  }
  else{
    tempTimeInfo.filter((_, index) => timeSlotAvailability.value[index]);
    return tempTimeInfo.slice(2);
  }
});

const availableEndTimes = computed(() => {
  const startIndex = tempTimeInfo.indexOf(startTime.value);
  if (startIndex === -1) return [];

  let filteredTimes = [];
  for (let i = startIndex + 1; i < tempTimeInfo.length; i++) {
    filteredTimes.push(tempTimeInfo[i]);
    if (!timeSlotAvailability.value[i]) break; 
  }
  return filteredTimes;
});

const isSaturday = computed(() => {
  if (!reserveDate.value) return false; 
  const date = new Date(reserveDate.value);
  console.log(date.getDay())
  return date.getDay() === 5; 
});

const numTablesAvailable = computed(() => {
  if (!tableType.value) return [];
  const maxTables = tableInfo.value[tableType.value] || 0;
  return Array.from({ length: maxTables }, (_, i) => i + 1);
});

function updateDayTablesAvailability(startTime, endTime, tableType, numTables, dayTables) {
  let startIndex = tempTimeInfo.indexOf(startTime);
  let endIndex = tempTimeInfo.indexOf(endTime);

  dayTables.forEach((slot, index) => {
    if (index >= startIndex && index < endIndex) {
      slot.tables[tableType] -= numTables;
    }
  });

  return dayTables;
}

const addTableReservation = async () =>{
  const q = query(collection(db, 'remainingTables'), where("date", "==", reserveDate.value));
  const querySnapshot = await getDocs(q);
  
  if(querySnapshot.empty){
    const remainingTables = updateDayTablesAvailability(startTime.value, endTime.value, tableType.value, numTables.value, dayTables.value);
    await addDoc(collection(db, 'remainingTables'),{
      date: reserveDate.value,
      remainingTables,
      
    })
  }else{
    const documentSnapshot = querySnapshot.docs[0];
    const documentRef = documentSnapshot.ref;
    const testtwo = updateDayTablesAvailability(startTime.value, endTime.value, tableType.value, numTables.value, documentSnapshot.data().remainingTables);

    await updateDoc(documentRef, {
      remainingTables: testtwo,
    });
  }
  
  await setDoc(doc(collection(db, "tableReservations"), user.value.uid), {
    date: reserveDate.value,
    name: user.value.displayName,
    email: user.value.email,
    startTime: startTime.value,
    endTime:endTime.value,
    numberOfTables: numTables.value
  });
}

//update the start time and end time lists
watch([reserveDate, tableType, numTables], async () => {
  if(reserveDate.value && tableType.value && numTables.value){
    const q = query(collection(db, 'remainingTables'), where("date", "==", reserveDate.value));
   
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
     
      const documentSnapshot = querySnapshot.docs[0];
      const documentData = documentSnapshot.data();
     
      for(let i = 0; i < tempTimeInfo.length; i++){ 
        
        timeSlotAvailability.value[i] = documentData.remainingTables[i].tables[tableType.value] >= numTables.value;
      }
     
    } else {
      timeSlotAvailability.value.fill(true);
     
    }
  }
}, { immediate: true });



//flatpickr
function addDaysToDate(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
}

const today = new Date().toISOString().split('T')[0]; 
const tomorrow = addDaysToDate(new Date(), 1); 

const flatpickrConfig = ref({
  disable: [
    function(date) {
      if ([0, 1, 2].includes(date.getDay())) {
        return true;
      }

      const dateStr = date.toISOString().split('T')[0];
      if (dateStr === tomorrow) {
        return true;
      }

      return false; 
    }
  ],
  dateFormat: "Y-m-d",
  minDate: today, 
});
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
                <option v-for="(value, key) in Object.keys(tableInfo)" :key="value" :value="value">{{ value }}</option>
              </select>

            </div>
            <div class="input-container">
              <label>Number of Tables</label>
              <select v-model="numTables">
                <option v-for="n in numTablesAvailable" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>

            <div class="input-container">
              <label>Choose a Date</label>
              <FlatpickrComponent v-model="reserveDate" :config="flatpickrConfig" />
            </div>

            <div class="input-container">
              <label>Choose Start Time</label>
              <select v-model="startTime">
                <option v-for="time in availableStartTimes" :key="time" :value="time">{{ time }}</option>
              </select>
            </div>
            <div class="input-container">
              <label>Choose End Time</label>
              <select v-model="endTime">
                <option v-for="time in availableEndTimes" :key="time" :value="time">{{ time }}</option>
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
    <button @click="tempTest">xd</button>
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