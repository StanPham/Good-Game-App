<template>
    <div class="deez" style="margin-top:20rem">
    <div class="wut">{{ productName }}</div>
</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const productName = ref("");

// Watch for changes in the route
watch(route, (newRoute) => {
    productName.value = decodeURIComponent(newRoute.params.name);
}, { immediate: true }); 
</script>