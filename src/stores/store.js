import { defineStore } from 'pinia';
import apiClient from '@/api/axios';

export function createStore(resourceName) {
  return defineStore(resourceName, {
    state: () => ({
      items: [],
      isLoading: false,
      error: null,
      total: 0,
      currentPage: 1,
      perPage: 10,
    }),
    actions: {
      async getAll({ page = 1, perPage = 10 } = {}) {
        this.isLoading = true;
        try {
          const response = await apiClient.get(`${resourceName}`, {
            params: { page, perPage },
          });

          // TODO: UPDATE THE FORMAT OF THE DATA
          const data = response.data;

          this.items = data;
          this.total = data.total;
          this.currentPage = page;
          this.perPage = perPage;
        } catch (error) {
          this.error = error.message;
        } finally {
          this.isLoading = false;
        }
      },
      async get(id) {
        try {
          const response = await apiClient.get(`${resourceName}/${id}`);
          return response.data;
        } catch (error) {
          this.error = error.message;
        }
      },
      async create(newItem) {
        try {
          const response = await apiClient.post(`${resourceName}`, newItem);
          this.items.push(response.data);
        } catch (error) {
          this.error = error.message;
        }
      },
      async update(id, updatedData) {
        try {
          const response = await apiClient.patch(`${resourceName}/${id}`, updatedData);
          this.items = this.items.map((item) =>
            item.id === id ? response.data : item
          );
        } catch (error) {
          this.error = error.message;
        }
      },
      async delete(id) {
        try {
          await apiClient.delete(`${resourceName}/${id}`);
          this.items = this.items.filter((item) => item.id !== id);
        } catch (error) {
          this.error = error.message;
        }
      },
    },
  });
}
