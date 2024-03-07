<script setup>
import {ref} from 'vue'
import EventTab from '../components/admin/EventTab.vue'
import AdminTab from '../components/admin/AdminTab.vue'
import CarouselTab from '../components/admin/CarouselTab.vue'
import TableReservationTab from '../components/admin/TableReservationTab.vue'


const activeTab = ref('Events')
const setActiveTab = (tabName) => {
  activeTab.value = tabName
}
</script>

<template>
  <body class="admin-container">
    <div class="tab">
      <button :class="{highlight:activeTab === 'Events'}" @click="setActiveTab('Events')">Events</button>
      <button :class="{highlight:activeTab === 'Carousel'}" @click="setActiveTab('Carousel')">Carousel</button>
      <button :class="{highlight:activeTab === 'Tables'}" @click="setActiveTab('Tables')">Tables</button>
      <button :class="{highlight:activeTab === 'Admin'}" @click="setActiveTab('Admin')">Admin</button>
    </div>
  <!-- Tab content -->
    <EventTab v-if="activeTab === 'Events'" class="tabcontent" />
    <CarouselTab v-if="activeTab === 'Carousel'" class="tabcontent" />
    <TableReservationTab v-if="activeTab === 'Tables'" class="tabcontent" />
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

.tab button:hover {
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