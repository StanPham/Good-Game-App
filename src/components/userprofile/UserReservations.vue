<script setup>
import {defineProps} from 'vue'
import TheSpinner from '../alerts/TheSpinner.vue'

const myReservations = defineProps({
    reservations:{
        type: Array,
        default: () => []
    }
})
</script>

<template>
  <div class="">
    <div class="rc-top-top text-center">
      <h1 class="cool-font letter-space pad italic">Reservations</h1>
    </div>
    <div class="pad margin-top">
        <div class="content title gradient pad rc margin-bottom" v-for="reservation in myReservations.reservations" :key="reservation.id">
          <div class="grid-wrapper">
            <ul>
              <li>Date</li>
              <li>Table Type</li>
              <li># of Tables</li>
              <li>Start Time</li>
              <li>End Time</li>
            </ul>
            <ul>
              <li>{{ reservation.date }}</li>
              <li>{{ reservation.tableType }}</li>
              <li>{{ reservation.numTables }}</li>
              <li>{{ reservation.startTime }}</li>
              <li>{{ reservation.endTime }}</li>
            </ul>
            <TheSpinner v-if="reservation.loading" />

            <button v-if="!reservation.loading" 
              @click="$emit('deleteReservation', reservation.id)" 
              class="roboto delete-btn-mq"> 
              Cancel
            </button>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.grid-wrapper{
  display:flex;
  justify-content: space-between;
  align-items:center;
}
ul{
  list-style-type:none;
}
li{
  margin-bottom:6px;
}
.delete-btn-mq{
  background: white;
  color: var(--btn-color);
  border-radius:1rem;
  padding: .1em .5em;
  font-size: 1.5rem; 
}

.delete-btn-mq:hover{
  background: var(--btn-color);
  color:white;
}

@media(max-width:768px){
  .content,
  .delete-btn-mq{
    font-size: .8rem;
  }
  .product-quant{
    font-size:1rem;
  }
  .mock-enddate{
    text-align:center;
    color:white;
  }
}
</style>
    
