<template>
  <div>
    <MenuHeader />
    <UContainer>
      <div class="flex flex-col md:flex-row gap-8 mt-8">
        <div class="w-full md:w-[30%] flex flex-col gap-6">
          <MenuFilter v-model="selectedFilters" @change="handleFilterChange" />
          <MenuSort v-model="sortOrder" />
        </div>
        <div class="w-full md:w-[70%]">
          <MenuSearch v-model="searchQuery" class="w-full mb-6" @update:model-value="handleSearch" />
          
          <div v-if="status === 'pending'" class="text-center p-10">
            <USkeleton v-for="n in 3" :key="n" class="h-56 w-full mb-3" />
          </div>
          
          <div v-else-if="status === 'error'" class="text-red-500 text-center p-10">
            {{ error }}
            <div class="mt-4">
              <UButton color="primary" @click="handleResetFilters">Reset Filters</UButton>
            </div>
          </div>
          
          <div v-else-if="status === 'empty' || sortedMenu.length === 0" class="text-center p-10">
            <div class="text-xl text-gray-700">No menu items found</div>
            <p class="text-gray-500 mb-4">Try changing your filters or search criteria</p>
            <UButton color="primary" @click="handleResetFilters">Reset Filters</UButton>
          </div>
          
          <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MenuCard v-for="item in sortedMenu" :key="item.id || item._id" :item="item" />
            </div>
            
            <div class="mt-8 flex justify-center">
              <UPagination
                v-if="pagination.totalPages > 1"
                v-model="pagination.currentPage"
                :page-count="pagination.itemsPerPage"
                :total="pagination.totalItems"
                :ui="{
                  wrapper: 'flex items-center gap-1',
                  base: 'min-w-8 w-8 h-8',
                  rounded: 'rounded-full',
                  default: {
                    activeButton: {
                      variant: 'solid',
                      color: 'primary'
                    },
                    inactiveButton: {
                      variant: 'ghost',
                      color: 'gray'
                    }
                  }
                }"
                @update:model-value="goToPage"
              />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const {
  error,
  status,
  searchQuery,
  selectedFilters,
  sortOrder,
  sortedMenu,
  pagination,
  fetchMenu,
  goToPage,
  resetFilters
} = useMenuApi()

// Immediate watcher for route changes
watch(
  () => route.query,
  async (newQuery) => {
    const tag = newQuery?.tag || 'all'
    const page = parseInt(newQuery?.page) || 1
    const search = newQuery?.search || ''
    
    // Update local state
    selectedFilters.value = tag !== 'all' 
      ? [tag.charAt(0).toUpperCase() + tag.slice(1)] 
      : ['All']
    searchQuery.value = search

    await fetchMenu(tag, page, search)
  },
  { immediate: true }
)

const handleFilterChange = async () => {
  try {
    status.value = 'pending'
    const tag = selectedFilters.value.includes('All') ? 'all' : selectedFilters.value[0]?.toLowerCase()
    
    await router.push({ 
      query: { 
        ...route.query,
        tag,
        page: 1
      }
    })
  } catch (err) {
    error.value = "Failed to update filters"
    status.value = 'error'
  }
}

const debounce = (fn, delay) => {
  let timeoutId = null
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const handleSearch = debounce(async () => {
  try {
    status.value = 'pending'
    await router.push({
      query: {
        ...route.query,
        search: searchQuery.value,
        page: 1
      }
    })
  } catch (err) {
    error.value = "Search failed"
    status.value = 'error'
  }
}, 500)

const handleResetFilters = async () => {
  try {
    status.value = 'pending'
    resetFilters()
    await router.push({ query: {} })
  } catch (err) {
    error.value = "Failed to reset filters"
    status.value = 'error'
  }
}
</script>