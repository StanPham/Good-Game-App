<template>
  <GMapMap
    :center="{lat: 35.282609, lng: -93.134994}"
    :zoom="20"
    map-type-id="terrain"
    style="width: 100%;height: 50vh; border-radius: 0 0 1rem 1rem;"
  >
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
    >
      <GMapInfoWindow >
        <div style="color: black;">
        407 N Arkansas Ave #13
        Russellville, AR 72801
        </div>
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>
          

<script >
export default {
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
  