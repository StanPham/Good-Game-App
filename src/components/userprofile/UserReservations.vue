<script setup>
import {defineProps} from 'vue'
const myReservations = defineProps({
    reservations:{
        type: Array,
        default: () => []
    }
})
</script>

<template>
  <div class="">
    <div class=" grey rc-top-top text-center">
      <h1 class="cool-font letter-space pad">Reservations</h1>
    </div>
    <div class="pad">
        <div class="content" v-for="reservation in myReservations.reservations" :key="reservation.id">
            <div class="title roboto">{{ reservation.productName }}</div>
            <div class="title">x{{ reservation.quantity }}</div>
            <button @click="$emit('deleteReservation', reservation.id)" class="delete-btn">Delete</button>
            <br>
        </div>
    </div>
  </div>
</template>

<style scoped>
.content{
  display:grid;
  grid-template-columns: 3fr 2fr 1fr;
 
}
</style>
    
