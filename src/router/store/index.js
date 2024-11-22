import StoreLoginView from "@/views/store/StoreLoginView.vue";
import StoreRegistrationView from "@/views/store/StoreRegistrationView.vue";
import StoreProfileView from "@/views/store/StoreProfileView.vue";

const storeRoutes = [
  {
    path: '/public/store/login',
    name: 'store-login',
    component: StoreLoginView,
    meta: { requiresAuth: false, roles: [] },
  },
  {
    path: '/public/store/register',
    name: 'store-register',
    component: StoreRegistrationView,
    meta: { requiresAuth: false, roles: [] },
  },
  {
    path: '/store/profile',
    name: 'store-profile',
    component: StoreProfileView,
    meta: { requiresAuth: true, roles: ['store'] },
  }
]

export default storeRoutes;
