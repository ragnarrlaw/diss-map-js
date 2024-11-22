<script setup>
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const isRouteActive = r => route.path === r;
</script>

<template>
  <div id="navbar">
    <RouterLink
      :class="`${isRouteActive('/') ? 'active-link ' : ''}` + 'nav-link'"
      to="/"
      >Home</RouterLink
    >
    <RouterLink
      :class="
        `${isRouteActive('/public/user/register') ? 'active-link ' : ''}` +
        'nav-link'
      "
      to="/public/user/register"
      >User Registration</RouterLink
    >
    <RouterLink
      :class="
        `${isRouteActive('/public/user/login') ? 'active-link ' : ''}` +
        'nav-link'
      "
      to="/public/user/login"
      >User Login</RouterLink
    >
    <RouterLink
      :class="
        `${isRouteActive('/public/store/register') ? 'active-link ' : ''}` +
        'nav-link'
      "
      to="/public/store/register"
      >Store Registration</RouterLink
    >
    <RouterLink
      :class="
        `${isRouteActive('/public/store/login') ? 'active-link ' : ''}` +
        'nav-link'
      "
      to="/public/store/login"
      >Store Login</RouterLink
    >
    <RouterLink
      :class="
        `${isRouteActive('/public/map') ? 'active-link ' : ''}` + 'nav-link'
      "
      to="/public/map"
      >Map</RouterLink
    >
  </div>
</template>

<style scoped>
#navbar {
  margin: 2px;
  border-radius: 10px;
  position: sticky;
  top: 0;
  overflow: hidden;
  background-color: #333;
}

/* Navbar links */
.nav-link {
  float: left;
  display: block;
  color: #e1dfdf;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

.active-link {
  background-color: #4caf50;
}

/* Page content */
.content {
  padding: 16px;
}
</style>
