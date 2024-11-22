<script setup>
import { RouterView } from 'vue-router';
import NavigationComponent from './components/NavigationComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <NavigationComponent />
  <RouterView />
  <FooterComponent />
</template>

<style scoped></style>
