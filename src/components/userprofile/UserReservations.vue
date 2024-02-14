<script setup>
import {defineProps} from 'vue'
import TheSpinner from '../alerts/TheSpinner.vue'

const myReservations = defineProps({
    reservations:{
        type: Array,
        default: () => []
    }
})

function expireDate(date) {
  const day = String(date.getDate() + 2).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${month}/${day}`;
}
</script>

<template>
  <div class="">
    <div class="rc-top-top text-center">
      <h1 class="cool-font letter-space pad italic">Reservations</h1>
    </div>
    <div class="pad margin-top">
        <div class="content title gradient pad rc margin-bottom" v-for="reservation in myReservations.reservations" :key="reservation.id">
          <div class="mock-enddate roboto pink margin-bottom">Expires After {{ expireDate(reservation.creationDate) }}</div>
          <div class="grid-wrapper">
            <div class="roboto">{{ reservation.productName }}</div>
            <div class="product-quant pad-left">x{{ reservation.quantity }}</div>

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
  display:grid;
  grid-template-columns: 3fr 2fr 1fr;
  gap: .5rem;
  align-items:center; 
}

.delete-btn-mq{
  background: white;
  color: var(--btn-color);
  border-radius:1rem;
  padding: .1em .5em;
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
    
