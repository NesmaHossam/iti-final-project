<script setup>
// fetch tags
const { data: tags, status: tagsStatus } = await useAsyncApi("/recipes/tags");
const selectedTag = ref("all");

const route = useRoute();

if (route.query?.tag) {
  selectedTag.value = route.query.tag;
}

// fetch recipes
const fetchRecipesString = computed(() => {
  if (selectedTag.value !== "all") {
    return `/recipes/tag/${selectedTag.value}`;
  }
  return `/recipes`;
});

const { data, status, refresh } = await useAsyncApi(fetchRecipesString);

watch(selectedTag, () => {
  refresh();
});
</script>



<template>
  <h1>Home</h1>
</template>
