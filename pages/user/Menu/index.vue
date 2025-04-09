<template>
  <div>
    <MenuHeader />
    <UContainer>
      <div class="flex flex-col md:flex-row gap-8 mt-8">
        <div class="w-full md:w-[30%] flex flex-col gap-6">
          <MenuFilter v-model="selectedFilters" :model-value="'ALL'" @change="handleFilterChange" />
          <MenuSort v-model="sortOrder" />
        </div>
        
        <div class="w-full md:w-[70%]">
          <MenuSearch
            v-model="searchQuery"
            class="w-full mb-6"
            @update:model-value="handleSearch"
          />

          <div v-if="status === 'pending'" class="text-center p-10">
            <USkeleton v-for="n in 3" :key="n" class="h-56 w-full mb-3" />
          </div>

          <div
            v-else-if="status === 'error'"
            class="text-red-500 text-center p-10"
          >
            {{ error }}
            <div class="mt-4">
              <UButton color="primary" @click="handleResetFilters"
                >Reset Filters</UButton
              >
            </div>
          </div>

          <div
            v-else-if="status === 'empty' || sortedMenu.length === 0"
            class="text-center p-10"
          >
            <div class="text-xl text-gray-700">No menu items found</div>
            <p class="text-gray-500 mb-4">
              Try changing your filters or search criteria
            </p>
            <UButton color="primary" @click="handleResetFilters"
              >Reset Filters</UButton
            >
          </div>

          <div v-else>
            
              <div ref="menuGridRef">
                <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <MenuCard
                    v-for="item in sortedMenu"
                    :key="item.id || item._id"
                    :item="item"
                  />
                </div>
              </div>

            <div 
                v-if= "showPagination"
                class="mt-8 flex justify-center items-center gap-2" @click="console.log(sortedMenu.length)">
              <UButton 
                class="bg-primary text-white" 
                :disabled="pagination.currentPage === 1"
                @click="goToPage(pagination.currentPage - 1)"
              >
                Previous
              </UButton>
              
              <div class="flex gap-1">
                <button
                  v-for="page in getPaginationRange()"
                  :key="page"
                  type="button"
                  class="w-8 h-8 flex items-center justify-center rounded-full"
                  :class="page === pagination.currentPage ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
              </div>
              
              <UButton 
                class="bg-primary text-white" 
                :disabled="pagination.currentPage === pagination.totalPages"
                @click="goToPage(pagination.currentPage + 1)"
              >
                Next
              </UButton>

            </div>
            <!-- <UPagination
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
              /> -->
              <!-- <p @click="goToPage(pagination.currentPage + 1)">{{ pagination.currentPage }}</p>
              <p>{{ pagination.totalPages }}</p>
              <p>{{ pagination.totalItems }}</p>
              <p>{{ pagination.nextPage}}</p>
              <p @click="goToPage(pagination.currentPage - 1)">{{ pagination.prevPage}}</p> -->
            </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const menuGridRef = ref(null);

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
  resetFilters,
} = useMenuApi(menuGridRef);

const showPagination = computed(() => {
  return pagination.value.itemsPerPage > 1 && sortedMenu.value.length > 0;
});

const getPaginationRange = () => {
  const totalPages = pagination.value.totalPages;
  const currentPage = pagination.value.currentPage;
  
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages];
  }
  
  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  
  return [
    1, 
    '...', 
    currentPage - 1, 
    currentPage, 
    currentPage + 1, 
    '...', 
    totalPages
  ];
};



// Immediate watcher for route changes
watch(
  () => route.query,
  async (newQuery) => {
    const category = newQuery?.category || "all";
    const page = parseInt(newQuery?.page) || 1;
    const search = newQuery?.search || "";

    // Update local state
    selectedFilters.value =
      category !== "all" ? [category.charAt(0).toUpperCase() + category.slice(1)] : ["All"];
    searchQuery.value = search;

    await fetchMenu(category, page, search);
  },
  { immediate: true }
);

const handleFilterChange = async () => {
  try {
    const category = selectedFilters.value === 'All'
      ? 'all'
      : selectedFilters.value.toLowerCase();

    // avoid unnecessary updates
    if (route.query.category === category) return;

    // optional: set a timeout to show loader *if fetch takes long*
    const loaderTimeout = setTimeout(() => {
      status.value = "pending";
    }, 300); // only show loader if fetch takes >300ms

    await router.push({
      query: {
        ...route.query,
        category,
        page: 1,
      },
    });

    clearTimeout(loaderTimeout);
  } catch (err) {
    error.value = "Failed to update filters";
    status.value = "error";
  }
};



const debounce = (fn, delay) => {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const handleSearch = debounce(async () => {
  try {
    status.value = "pending";
    await router.push({
      query: {
        ...route.query,
        search: searchQuery.value,
        page: 1,
      },
    });
  } catch (err) {
    error.value = "Search failed";
    status.value = "error";
  }
}, 500);

const handleResetFilters = async () => {
  try {
    status.value = "pending";
    resetFilters();
    await router.push({ query: {} });
  } catch (err) {
    error.value = "Failed to reset filters";
    status.value = "error";
  }
};
</script>
