<template>
    <div class="flex justify-center items-center gap-2 mt-8 mb-4">
      <!-- First page button -->
      <UButton
        v-if="showFirstLast && currentPage > 2"
        size="sm"
        color="gray"
        variant="ghost"
        :disabled="!hasPrev"
        aria-label="First page"
        @click="$emit('change-page', 1)"
      >
        <template #leading>
          <i class="i-heroicons-chevron-double-left" />
        </template>
      </UButton>
      
      <!-- Previous button -->
      <UButton
        size="sm" 
        color="primary"
        variant="outline"
        :disabled="!hasPrev"
        aria-label="Previous page"
        @click="$emit('change-page', currentPage - 1)"
      >
        <template #leading>
          <i class="i-heroicons-chevron-left" />
        </template>
        Previous
      </UButton>
      
      <!-- Page numbers -->
      <div class="flex gap-1 items-center">
        <template v-if="totalPages <= maxPageButtons">
          <UButton
            v-for="page in totalPages"
            :key="page"
            size="sm"
            :color="currentPage === page ? 'primary' : 'gray'"
            :variant="currentPage === page ? 'solid' : 'ghost'"
            @click="$emit('change-page', page)"
          >
            {{ page }}
          </UButton>
        </template>
        
        <template v-else>
          <!-- First page when not visible in current window -->
          <UButton
            v-if="currentPage > windowSize"
            size="sm"
            color="gray"
            variant="ghost"
            @click="$emit('change-page', 1)"
          >
            1
          </UButton>
          
          <!-- Ellipsis if needed -->
          <span v-if="currentPage > windowSize + 1" class="text-gray-500">...</span>
          
          <!-- Pages around current page -->
          <UButton
            v-for="page in visiblePages"
            :key="page"
            size="sm"
            :color="currentPage === page ? 'primary' : 'gray'"
            :variant="currentPage === page ? 'solid' : 'ghost'"
            @click="$emit('change-page', page)"
          >
            {{ page }}
          </UButton>
          
          <!-- Ellipsis if needed -->
          <span v-if="currentPage < totalPages - windowSize" class="text-gray-500">...</span>
          
          <!-- Last page when not visible in current window -->
          <UButton
            v-if="currentPage < totalPages - windowSize + 1"
            size="sm"
            color="gray"
            variant="ghost"
            @click="$emit('change-page', totalPages)"
          >
            {{ totalPages }}
          </UButton>
        </template>
      </div>
      
      <!-- Next button -->
      <UButton
        size="sm"
        color="primary"
        variant="outline"
        :disabled="!hasNext"
        aria-label="Next page"
        @click="$emit('change-page', currentPage + 1)"
      >
        Next
        <template #trailing>
          <i class="i-heroicons-chevron-right" />
        </template>
      </UButton>
      
      <!-- Last page button -->
      <UButton
        v-if="showFirstLast && currentPage < totalPages - 1"
        size="sm"
        color="gray"
        variant="ghost"
        :disabled="!hasNext"
        aria-label="Last page"
        @click="$emit('change-page', totalPages)"
      >
        <template #trailing>
          <i class="i-heroicons-chevron-double-right" />
        </template>
      </UButton>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    currentPage: {
      type: Number,
      required: false,
      default: 1
    },
    totalPages: {
      type: Number,
      required: false,
      default: 1
    },
    hasNext: {
      type: Boolean,
      default: false
    },
    hasPrev: {
      type: Boolean,
      default: false
    },
    maxPageButtons: {
      type: Number,
      default: 5
    },
    showFirstLast: {
      type: Boolean,
      default: true
    }
  });
  
  defineEmits(['change-page']);
  
  const windowSize = Math.floor(props.maxPageButtons / 2);
  
  const visiblePages = computed(() => {
    const pages = [];
    let start = Math.max(1, props.currentPage - windowSize);
    let end = Math.min(props.totalPages, props.currentPage + windowSize);
    
    if (end - start + 1 < props.maxPageButtons) {
      if (start === 1) {
        end = Math.min(props.totalPages, start + props.maxPageButtons - 1);
      } else if (end === props.totalPages) {
        start = Math.max(1, end - props.maxPageButtons + 1);
      }
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  });
  </script>