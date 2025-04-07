<template>
  <div class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-xl border border-slate-100 p-6">
    <h2 class="text-primary text-2xl font-bold mb-6">Sort By</h2>
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Name</h3>
        <div class="space-y-2">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="asc"
              :checked="modelValue === 'asc'"
              class="text-primary focus:ring-primary"
              @change="$emit('update:modelValue', 'asc')"
            >
            <span>A to Z</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="desc"
              :checked="modelValue === 'desc'"
              class="text-primary focus:ring-primary"
              @change="$emit('update:modelValue', 'desc')"
            >
            <span>Z to A</span>
          </label>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Price</h3>
        <div class="space-y-2">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="low-high"
              :checked="modelValue === 'low-high'"
              class="text-primary focus:ring-primary"
              @change="$emit('update:modelValue', 'low-high')"
            >
            <span>Low to High</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="high-low"
              :checked="modelValue === 'high-low'"
              class="text-primary focus:ring-primary"
              @change="$emit('update:modelValue', 'high-low')"
            >
            <span>High to Low</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>