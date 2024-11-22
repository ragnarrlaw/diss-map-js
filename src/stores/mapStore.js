import { defineStore } from 'pinia';

export const useMapStore = defineStore('mapStore', {
  state: () => ({
    userMarker: { latitude: 0, longitude: 0 },
    selectedMarkers: [],
  }),
  getters: {
    getUserMarker: (state) => state.userMarker,
    getSelectedMarkers: (state) => state.selectedMarkers,
  },
  actions: {
    setUserMarker(marker) {
      this.userMarker = marker;
    },
    addSelectedMarker(marker) {
      this.selectedMarkers.push(marker);
    },
    clearUserMarker() {
      this.userMarker = {};
    },
    clearSelectedMarker() {
      this.selectedMarkers = [];
    },
    updateSelectedMarker(index, marker) {
      this.selectedMarkers[index] = marker;
    },
  },
});
