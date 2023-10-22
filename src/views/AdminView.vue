
<script setup>
import {ref} from 'vue'
import EventTab from '../components/admin/EventTab.vue'
import AdminTab from '../components/admin/AdminTab.vue'
import ShopTab from '../components/admin/ShopTab.vue'
import CarouselTab from '../components/admin/CarouselTab.vue'

const activeTab = ref('Events')
const setActiveTab = (tabName) => {
  activeTab.value = tabName
}
</script>

<template>
  <body class="work">
    <div class="tab">
      <button class="tablinks" @click="setActiveTab('Events')">Events</button>
      <button class="tablinks" @click="setActiveTab('Shop')">Shop</button>
      <button class="tablinks" @click="setActiveTab('Table')">Table Reservations</button>
      <button class="tablinks" @click="setActiveTab('Account')">Accounts</button>
      <button class="tablinks" @click="setActiveTab('Carousel')">Carousel</button>
      <button class="tablinks" @click="setActiveTab('Admin')">Admin</button>
    </div>
  <!-- Tab content -->
    <EventTab v-if="activeTab === 'Events'" class="tabcontent" />
    <ShopTab v-if="activeTab === 'Shop'" class="tabcontent" />
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
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}
.tab button:hover {
  background-color: #ddd;
}
.tabcontent {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #312d2d;
  border-top: none;
}
.work{
  margin-top:5rem;
}
</style>