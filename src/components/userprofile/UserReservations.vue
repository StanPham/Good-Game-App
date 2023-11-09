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
            
            <button @click="$emit('deleteReservation', reservation.id)" class=" roboto delete-btn-mq font-med ">
            Cancel </button>
            
          
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

.delete-btn-mq{
 border: 1px solid white;
 border-radius:1rem;
}
.delete-btn-mq:hover{
 background:white;
 color:purple;

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
    
