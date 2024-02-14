<script setup>
import {defineProps} from 'vue'

defineProps({
  message: String
})
</script>

<template>
  <div class="popup black flex align-c gap rc">
    <slot></slot>
    <div class="font-med roboto pad">{{ message }}</div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 1s ease-in-out;
  opacity: 1;
}

.fade-enter, .fade-leave-to {
  opacity: 0;

}
</style>