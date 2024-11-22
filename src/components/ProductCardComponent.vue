<script setup>
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      name: 'some product name',
      description: 'Some text..',
      currency: 'some currency',
      price: 11.11,
      quantity: 'some quantity',
      image: 'some image url',
      discount: {
        value: 0,
      },
    }),
  },
});

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.product.currency,
  }).format(props.product.price);
});
</script>

<template>
  <div class="card">
    <div v-if="product.discount" class="badge">
      {{ product.discount.value }}% OFF
    </div>
    <img
      src="/home/bobby/playground/vue/vue-project/src/assets/images/img.avif"
      alt="product.img.sub"
      style="width: 100%"
    />
    <h4>{{ product.name }}</h4>
    <p class="price">{{ formattedPrice }}</p>
    <p>{{ product.description }}</p>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  border-radius: 8px;
  background-color: rgb(214, 209, 209);
  text-align: center;
  font-family: arial;
  position: relative;
}

.card img {
  border-radius: 8px 8px 0 0;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
}

.price {
  color: grey;
  font-size: 22px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: rgb(173, 166, 166);
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.card button:hover {
  opacity: 0.7;
}
</style>
