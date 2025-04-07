<template>
  <div class="bg-slate-200/10 backdrop-blur-md shadow-lg overflow-hidden rounded-tl-[30%] rounded-br-[30%] border border-slate-100 p-6 pt-8">
    <h2 class="text-primary text-2xl font-bold">Filter</h2>
    <div class="mt-6 flex flex-col gap-4">
      <div>
        <input 
          id="all" 
          type="checkbox" 
          name="filter" 
          value="All"
          :checked="localSelectedFilters.includes('All')"
          @change="toggleFilter('All')"
        >
        <label for="all" class="ms-4 text-lg text-primary">All</label>
      </div>
      <div v-for="category in categories" :key="category">
        <input 
          :id="category.toLowerCase()" 
          type="checkbox" 
          name="filter"
          :value="category"
          :checked="localSelectedFilters.includes(category)"
          @change="toggleFilter(category)"
        >
        <label :for="category.toLowerCase()" class="ms-4 text-lg text-primary">{{ category }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ['All']
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const categories = ["Breakfast", "Dinner", "Dessert", "Drinks"];
const localSelectedFilters = ref(['All']);

// Ensure we always have a filter selected
watch(() => props.modelValue, (newVal) => {
  if (newVal && newVal.length > 0) {
    localSelectedFilters.value = [...newVal];
  } else {
    localSelectedFilters.value = ['All'];
    emit('update:modelValue', ['All']);
  }
}, { immediate: true, deep: true });

const toggleFilter = (filter) => {
  if (filter === 'All') {
    // If "All" is being toggled on, clear other selections
    if (!localSelectedFilters.value.includes('All')) {
      localSelectedFilters.value = ['All'];
    } 
    // Don't allow deselecting "All" if it's the only one selected
    else if (localSelectedFilters.value.length === 1) {
      return;
    }
    // Otherwise, deselect "All"
    else {
      localSelectedFilters.value = localSelectedFilters.value.filter(f => f !== 'All');
    }
  } else {
    // If a category is being selected and "All" is currently selected, replace "All" with this category
    if (localSelectedFilters.value.includes('All')) {
      localSelectedFilters.value = [filter];
    } 
    // If the category is already selected and it's the only one, don't allow deselection
    else if (localSelectedFilters.value.includes(filter) && localSelectedFilters.value.length === 1) {
      return;
    }
    // Toggle the selected category
    else if (localSelectedFilters.value.includes(filter)) {
      localSelectedFilters.value = localSelectedFilters.value.filter(f => f !== filter);
      // If nothing is left selected, select "All"
      if (localSelectedFilters.value.length === 0) {
        localSelectedFilters.value = ['All'];
      }
    } else {
      localSelectedFilters.value.push(filter);
    }
  }
  
  emit('update:modelValue', localSelectedFilters.value);
  emit('change');
};
</script>