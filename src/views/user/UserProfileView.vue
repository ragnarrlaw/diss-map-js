<script setup>
import { defineProps, onMounted } from 'vue';
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  console.log('User Profile Page mounted: User ID:', props.userId);
});
</script>

<template>
  <div>
    <h1>User Profile of the user with user id: userId</h1>
  </div>
</template>
