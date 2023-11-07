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
  <div class="pad ">
    <h1 class="flex-c pad-bot">Your Reservations</h1>
    <div class="work-wrap" v-for="reservation in myReservations.reservations" :key="reservation.id">
        <div class="flex align-c gap">
            <div class="title">{{ reservation.productName }}</div>
            <div class="title">x{{ reservation.quantity }}</div>
            <button class="delete-btn">Delete</button>
            <br><br><br>
        </div>
    </div>
  </div>
</template>
    
