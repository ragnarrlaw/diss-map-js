import UserLoginView from '@/views/user/UserLoginView.vue';
import UserProfileView from '@/views/user/UserProfileView.vue';
import UserRegistrationView from '@/views/user/UserRegistrationView.vue';

const userRoutes = [
  {
    path: '/public/user/login',
    name: 'user-login',
    component: UserLoginView,
    meta: { requiresAuth: false, roles: [] },
  },
  {
    path: '/public/user/register',
    name: 'user-register',
    component: UserRegistrationView,
    meta: { requiresAuth: false, roles: [] }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: UserProfileView,
    meta: { requiresAuth: true, roles: ['user'] }
  }
];

export default userRoutes;
