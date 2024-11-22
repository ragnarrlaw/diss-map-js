<script setup>
import { defineProps, onMounted } from 'vue';
const props = defineProps({
  storeId: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  console.log('Store Profile Page mounted: Store ID:', props.storeId);
});
</script>

<template>
  <div>
    <h1>Store Profile Page of the store with the Id: {{ storeId }}</h1>
  </div>
</template>
