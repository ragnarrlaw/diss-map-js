<script setup>
import ProductCardComponent from '@/components/ProductCardComponent.vue';
import { onMounted } from 'vue';
import { createStore } from '@/stores/store';
import { usePaginate } from '@/composables/usePaginate';

const useProductStore = createStore('product');
const productStore = useProductStore();
const { items, isLoading, fetchItems } = usePaginate(productStore);

onMounted(async () => {
  if (items.value.length === 0) {
    await fetchItems();
  }
});
</script>

<template>
  <div v-if="isLoading">
    <p>Loading data...</p>
  </div>
  <div v-else class="product-listing">
    <ProductCardComponent
      v-for="product in items"
      :key="product.id"
      :product="product"
      :discount="product.discount"
      @remove-product="removeProduct(product.id)"
      @update-product="updateProduct(product.id, $event)"
    />
  </div>
</template>

<style scoped>
.product-listing {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  height: 100%;
  width: 100%;
}

@media (min-width: 600px) {
  .product-listing {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
