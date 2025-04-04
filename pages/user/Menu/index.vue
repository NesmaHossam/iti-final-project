<script setup>
definePageMeta({
    name : "Menu"
})
</script>

<template>
    <div>
        <MenuHeader/>
        <UContainer>
            <div class="flex gap-8 mt-8">
            <div class="w-[30%] flex flex-col gap-6">
                <MenuFilter/>
                <MenuSort class="mb-8"/>
            </div>
            <div class="w-[70%]">
                <MenuSearch class="w-full mb-6"/>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/>
                </div>
            </div>
        </div>
        </UContainer>
    </div>
</template>


<!-- ////////////another way/////////////////////////// -->

<!-- <template>
    <div>
      <MenuFilter v-model:selectedFilters="selectedFilters" />
      <MenuSort v-model:sortOrder="sortOrder" />
  
      <div v-if="pending">Loading menu...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div v-for="item in filteredAndSortedItems" :key="item.id" class="p-4 border rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">{{ item.name }}</h3>
          <p class="text-sm text-gray-500">{{ item.category }}</p>
          <p class="text-primary font-bold">${{ item.price }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import useApiMenu from "@/composables/useApiMenu";
  import FilterMenu from "@/components/filter.vue";
  import SortMenu from "@/components/sort.vue";
  
  const { selectedFilters, sortOrder, filteredAndSortedItems, pending, error } = useApiMenu();
  </script> -->
  