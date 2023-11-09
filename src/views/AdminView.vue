<script setup>
import {ref} from 'vue'
import EventTab from '../components/admin/EventTab.vue'
import AdminTab from '../components/admin/AdminTab.vue'
import ShopTab from '../components/admin/ShopTab.vue'
import ShopReservationTab from '../components/admin/ShopReservationTab.vue'
import CarouselTab from '../components/admin/CarouselTab.vue'

const activeTab = ref('Events')
const setActiveTab = (tabName) => {
  activeTab.value = tabName
}
</script>

<template>
  <body class="admin-container">
    <div class="tab">
      <button class="tablinks" @click="setActiveTab('Events')">Events</button>
      <button class="tablinks" @click="setActiveTab('Shop')">Shop</button>
      <button class="tablinks" @click="setActiveTab('ShopReservation')">Shop Reservation</button>
      <button class="tablinks" @click="setActiveTab('Carousel')">Carousel</button>
      <button class="tablinks" @click="setActiveTab('Admin')">Admin</button>
    </div>
  <!-- Tab content -->
    <EventTab v-if="activeTab === 'Events'" class="tabcontent" />
    <ShopTab v-if="activeTab === 'Shop'" class="tabcontent" />
    <ShopReservationTab v-if="activeTab === 'ShopReservation'" class="tabcontent" />
    <CarouselTab v-if="activeTab === 'Carousel'" class="tabcontent" />
    <AdminTab v-if="activeTab === 'Admin'" class="tabcontent" />
  </body>
</template>

<style scoped>
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #000000;
}
.tab button {
  padding: 1rem;
}

.tab button:hover,
.tab button:focus {
  background-color: #ddd;
  color:black;
}
.tabcontent {
  padding: .3rem .8rem;
  border: 1px solid #ccc;
  background-color: #312d2d;
  border-top: none;
}
.admin-container{
  margin-top:calc(var(--header-height) + 2rem);
}
</style>