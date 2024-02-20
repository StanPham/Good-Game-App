<template>
  <input type="text" ref="inputElement" />
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Props and emits
const props = defineProps({
  modelValue: String,
  config: Object
});

const emit = defineEmits(['update:modelValue']);

// Refs
const inputElement = ref(null);
let flatpickrInstance;

// Watchers
watch(() => props.modelValue, (newValue) => {
  flatpickrInstance?.setDate(newValue, false);
});

// Lifecycle
onMounted(() => {
  flatpickrInstance = flatpickr(inputElement.value, {
    ...props.config,
    defaultDate: props.modelValue,
    onChange: (selectedDates, dateStr) => {
      emit('update:modelValue', dateStr);
    }
  });
});

onUnmounted(() => {
  flatpickrInstance?.destroy();
});
</script>
