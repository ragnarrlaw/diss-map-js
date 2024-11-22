import { computed } from 'vue';

export function usePaginate(store) {
  const items = computed(() => store.items);
  const currentPage = computed(() => store.currentPage);
  const perPage = computed(() => store.perPage);
  const totalPages = computed(() =>
    Math.ceil(store.total / store.perPage)
  );
  const isLoading = computed(() => store.isLoading);
  const errors = computed(() => store.error);

  const fetchItems = async (page, perPage) => {
    await store.getAll({ page, perPage });
  };

  const nextPage = async () => {
    if (currentPage.value < totalPages.value) {
      await fetchItems(currentPage.value + 1, perPage.value);
    }
  };

  const prevPage = async () => {
    if (currentPage.value > 1) {
      await fetchItems(currentPage.value - 1, perPage.value);
    }
  };

  return {
    items,
    currentPage,
    perPage,
    totalPages,
    isLoading,
    errors,
    fetchItems,
    nextPage,
    prevPage,
  };
}
