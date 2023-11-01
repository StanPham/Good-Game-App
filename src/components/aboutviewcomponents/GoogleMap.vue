<template>
    <GMapMap
        :center="{lat: 35.282609, lng: -93.134994}"
        :zoom="20"
        map-type-id="terrain"
        style="width: 100vw; height: 900px"
    >
    <GMapMarker
    :key="index"
  v-for="(m, index) in markers"
  :position="m.position"
    />
    </GMapMap>
  </template>
  
  <script >
  export default {
    name: 'App',
    data() {
      return {
        center: {lat: 35.282609, lng: -93.134994},
        markers: [
        {
          position: {
            lat: 35.282565, lng: -93.134994
          },
        }
      ]
      }
    }
  }
  </script>
  