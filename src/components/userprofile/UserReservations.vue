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
    <div class="rc-top-top text-center">
      <h1 class="cool-font letter-space pad">Reservations</h1>
    </div>
    <div class="pad">
        <div class="content title gradient pad rc" v-for="reservation in myReservations.reservations" :key="reservation.id">
            <div class="roboto">{{ reservation.productName }}</div>
            <div class="product-quant pad-left">x{{ reservation.quantity }}</div>
            
            <button @click="$emit('deleteReservation', reservation.id)" class=" delete-btn-mq flex align-c">
            Cancel <span class="roboto margin-left">X</span></button>
            
          
        </div>
    </div>
  </div>
</template>

<style scoped>
.content{
  display:grid;
  grid-template-columns: 3fr 2fr 1fr;
  gap: .5rem;
  align-items:center;
  margin-bottom:1rem;
 
}


@media(max-width:768px){
  .content,
  .delete-btn-mq{
    font-size: .8rem;
  }
  .product-quant{
    font-size:1rem;
  }
}
</style>
    
