import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userToken: null,
    userRole: null
  }),
  actions: {
    setUserToken(token) {
      this.userToken = token;
    },
    setUserRole(role) {
      this.userRole = role;
    },
    clearAuthData() {
      this.userToken = null;
      this.userRole = null;
    },
    login(token, role) {
      this.setUserToken(token);
      this.setUserRole(role);
    },
    logout() {
      this.clearAuthData();
    },
    getToken() {
      return this.userToken;
    }
  },
  getters: {
    isAuthenticated: state => !!state.userToken,
    getUserRole: state => state.userRole
  }
});
