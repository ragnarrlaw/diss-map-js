<script setup>
import leaflet from 'leaflet';
import 'leaflet-routing-machine';
import { onMounted, watch } from 'vue';
import { useMapStore } from '@/stores/mapStore';
import useGeolocation from '@/composables/useGeolocation';
import 'leaflet-routing-machine';

const mapStore = useMapStore();
const { coords } = useGeolocation();
let map = null;
let userGeoMarker = null;
let routingControl = null;

onMounted(() => {
  console.log(
    'MapRenderingComponent mounted: Centre coordinates:',
    mapStore.userMarker,
  );

  map = leaflet
    .map('map')
    .setView([mapStore.userMarker.latitude, mapStore.userMarker.longitude], 13);

  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  if (mapStore.selectedMarkers.length !== 0) {
    mapStore.selectedMarkers.forEach(element => {
      let marker = leaflet
        .marker([element.latitude, element.longitude])
        .addTo(map)
        .bindPopup(
          `Selected marker: (${element.latitude}, ${element.longitude})`,
        );
      console.log(marker.toGeoJSON());
    });
  }

  map.addEventListener('click', e => {
    console.log(e);
    const { lat: latitude, lng: longitude } = e.latlng;
    mapStore.addSelectedMarker({ latitude, longitude });
    let marker = leaflet.marker([latitude, longitude]).addTo(map);
    console.log(marker.toGeoJSON());
  });
});

watch(coords, newCoords => {
  if (userGeoMarker) {
    map.removeLayer(userGeoMarker);
  }

  if (map) {
    mapStore.setUserMarker(newCoords);
    userGeoMarker = leaflet
      .marker([mapStore.userMarker.latitude, mapStore.userMarker.longitude])
      .addTo(map);
    userGeoMarker.getElement().style.filter += 'hue-rotate(90deg)';
    map.setView(
      [mapStore.userMarker.latitude, mapStore.userMarker.longitude],
      13,
    );
    console.log('MapRenderingComponent updated:', mapStore.userMarker);
    console.log(`User geo marker: ${userGeoMarker.getLatLng()}`);
  }
});

mapStore.$subscribe((mutation, state) => {
  console.log('MapStore mutation:', mutation.type);
  console.log('MapStore state:', state.selectedMarkers);
  if (state.selectedMarkers.length > 1) {
    if (routingControl) {
      map.removeControl(routingControl);
    }
    routingControl = leaflet.routing
      .control({
        waypoints: [
          leaflet.latLng(
            state.selectedMarkers[0].latitude,
            state.selectedMarkers[0].longitude,
          ),
          leaflet.latLng(
            state.selectedMarkers[1].latitude,
            state.selectedMarkers[1].longitude,
          ),
        ],
        routeWhileDragging: true,
      })
      .addTo(map);
  }
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 50%;
  height: 50vh;
}
</style>
