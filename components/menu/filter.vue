<template>
  <div class="bg-slate-200/10 backdrop-blur-md shadow-lg overflow-hidden rounded-tl-[30%] rounded-br-[30%] border border-slate-100 p-6 pt-8">
    <h2 class="text-primary text-2xl font-bold">Filter</h2>
    <div class="mt-6 flex flex-col gap-4">
      <div>
        <input 
          id="all" 
          type="radio" 
          name="filter" 
          value="All"
          :checked="localSelectedFilter === 'All'"
          @change="toggleFilter('All')"
        >
        <label for="all" class="ms-4 text-lg text-primary">All</label>
      </div>
      <div v-for="category in categories" :key="category">
          <input
            :id="category.toLowerCase()"
            type="radio"
            name="filter"
            :value="category"
            :checked="localSelectedFilter === category"
            @change="toggleFilter(category)"
          >
          
        <label :for="category.toLowerCase()" class="ms-4 text-lg text-primary">{{ category }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    default: 'All'
  }
});

const categories = ["Breakfast", "Dinner", "Dessert", "Drinks"];

const emit = defineEmits(['update:modelValue', 'change']);
const localSelectedFilter = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  localSelectedFilter.value = newVal || 'All';
}, { immediate: true });

const toggleFilter = (filter) => {
  localSelectedFilter.value = filter;
  emit('update:modelValue', filter); // just a string
  emit('change');
};
</script>
