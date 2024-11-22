import { ref, watch } from 'vue';

export function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const data = ref(storedValue ? JSON.parse(storedValue) : initialValue);

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });

  const clear = () => {
    localStorage.removeItem(key);
    data.value = initialValue;
  };

  return { data, clear };
}
