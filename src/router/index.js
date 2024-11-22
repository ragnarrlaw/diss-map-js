import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import NotFoundView from "@/views/errors/NotFoundView.vue";
import MapView from "@/views/map/MapView.vue";
import userRoutes from "@/router/user";
import storeRoutes from "@/router/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/public/map',
      name: 'map',
      component: MapView,
      meta: { requiresAuth: true, roles: ['user', 'store'] }
    },
    ...userRoutes,
    ...storeRoutes,
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
  ]
});

// import { useAuthStore } from "@/stores/authStore";
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   if (authStore.isAuthenticated && (to.name.includes('login') || to.name.includes('register'))) {
//     next(false);
//   } else if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!authStore.isAuthenticated) {
//       next({ name: 'landing' });
//     } else {
//       const role = authStore.getUserRole;
//       if (to.matched.some(record => record.meta.roles && !record.meta.roles.includes(role))) {
//         next(false);
//       } else {
//         next();
//       }
//     }
//   } else {
//     next();
//   }
// });

export default router;
