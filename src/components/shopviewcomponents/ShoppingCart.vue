<script setup>
import {  onAuthStateChanged, } from "firebase/auth";
import { db, firebaseAppAuth} from '@/firebase'
import { ref, onMounted, watch } from "vue";
import { doc, onSnapshot } from "firebase/firestore";
import router from '../../router'

const shopReservations = ref(0)
const user = ref(null)

onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
    if(currentUser){
        fetchUserData();
    }
})

const fetchUserData = () => {
  if (user.value) {
    const docRef = doc(db, 'shopReservation', user.value.uid);
    onSnapshot(docRef, (doc) => {
      console.log("here")
      console.log(doc.exists())
      if (!doc.exists()) {

        shopReservations.value = 0
        
      } else {
        shopReservations.value = doc.data().reservations.length;
        }
      })
};
}

watch(user, (newValue) => {
  if (newValue) {
    fetchUserData();
  }
});

onMounted(fetchUserData);

const goProfile = () => router.push('/user')
</script>

<template>
  <div class="flex align-c gap-small" @click="goProfile">
    <div class="font-med">{{ shopReservations }}</div>
    <img src="../../images/lotus.svg" alt="" class="lotus icon-white icon-small">
  </div>
</template>

<style scoped>
.lotus{
  margin-bottom: 4px;
}
</style>