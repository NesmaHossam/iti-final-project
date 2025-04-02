<!-- <script setup>
const { data, pending, error } = useApiMenu("/recipes");

const loading = computed(() => pending.value);
const filter = ref("");

const filteredRecipes = computed(() => {
  if (!filter.value) return data.value?.recipes || [];

  const filterValue = filter.value.toLowerCase().trim();

  return (data.value?.recipes || []).filter((recipe) => {
    return recipe.tags.some((tag) => tag.toLowerCase() === filterValue);
  });
});
</script> -->


<template>
      <!-- v-model="filter" -->
  <UInput
    icon="i-lucide-search"
    size="lg"
    variant="outline"
    placeholder="Search..."
  />


  <!-- <div v-if="loading" class="text-center loading">Loading...</div>

<div v-if="error" class="text-red-500 text-center error">{{ error }}</div>

<div
  v-if="!loading && !filteredRecipes.length"
  class="text-center no-results"
>
  No items found matching your filter.
</div> -->
</template>
