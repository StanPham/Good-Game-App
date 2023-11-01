<template>
    <GMapMap
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100vw; height: 20rem"
    >
      <GMapCluster :zoomOnClick="true">
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GMapCluster>
    </GMapMap>
  </template>
  
  <script>
  export default {
    data() {
      return {
        center: { lat: 35.282609, lng: -93.134994 },
       
      };
    },
  };
  </script>
  
  <style>
  body {
    margin: 0;
  }
  </style>
  