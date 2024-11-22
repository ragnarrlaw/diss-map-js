
import { ref, onMounted, onUnmounted } from 'vue'

export default function useGeolocation() {
  const coords = ref({ latitude: 0, longitude: 0 })
  const isSupported = 'geolocation' in navigator

  function updatePosition({ coords: { latitude, longitude } }) {
    coords.value = { latitude, longitude }
  }

  function errorCallback(error) {
    console.error(`ERROR(${error.code}): ${error.message}`);
  }


  onMounted(() => {
    if (isSupported) {
      console.log('Geolocation is supported');
      navigator.geolocation.getCurrentPosition(updatePosition, errorCallback)
      navigator.geolocation.watchPosition(updatePosition, errorCallback)
    } else {
      console.error('Geolocation is not supported');
    }
  })

  onUnmounted(() => {
    if (isSupported) {
      navigator.geolocation.clearWatch(updatePosition)
    }
  })

  return { coords, isSupported }
}
