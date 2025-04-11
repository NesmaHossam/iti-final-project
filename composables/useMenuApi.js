

export default function useMenuApi(menuGridRef = ref(null)) {
  const menu = ref([])
  const error = ref(null)
  const status = ref('idle')
  const searchQuery = ref('')
  const selectedFilters = ref('All');
  const sortOrder = ref('')
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    nextPage: null,
    prevPage: null
  })

  const categories = ref(["Breakfast", "Dinner", "Dessert", "Drinks"])
  const route = useRoute()
  const router = useRouter()

  const getQueryParams = (categoryFilter, page = 1, search = '') => {
    const params = new URLSearchParams()
    
    if (categoryFilter && categoryFilter !== 'all') {
      params.append('category', categoryFilter.toLowerCase())
    }
    
    params.append('page', page.toString())
    
    if (search && search.trim() !== '') {
      params.append('keyword', search.trim())
    }
    
    return params.toString()
  }

  const fetchMenu = async (categoryFilter = 'all', page = 1, search = '') => {
    status.value = 'pending'
    error.value = null
    
    try {
      const params = getQueryParams(categoryFilter, page, search)
      const endpoint = `/menu/getMenu${params ? `?${params}` : ''}`
      console.log(categoryFilter , page , search);
      const { data, error: apiError } = await useAsyncApi(endpoint)
      console.log(data);
      
      if (apiError.value) {
        throw new Error(apiError.value?.message || 'Failed to fetch menu')
      }

      if (!data.value) {
        throw new Error('No data received from server')
      }

      const response = data.value
      
      // Handle successful response
      if (response.success && response.results) {
        // Extract items from different response structures
        const items = Array.isArray(response.results) 
          ? response.results 
          : response.results.items || response.results.data || []

        menu.value = items

        // Update pagination from response
        if (response.results.pagination) {
          pagination.value = {
            currentPage: Number(response.results.pagination.currentPage) || page,
            totalPages: Number(response.results.pagination.totalPages) || 1,
            totalItems: Number(response.results.pagination.totalItems) || items.length,
            itemsPerPage: Number(response.results.pagination.itemsPerPage) || 10,
            nextPage: response.results.pagination.nextPage !== undefined 
              ? response.results.pagination.nextPage 
              : (page < (response.results.pagination.totalPages || 1) ? page + 1 : null),
            prevPage: response.results.pagination.prevPage !== undefined 
              ? response.results.pagination.prevPage 
              : (page > 1 ? page - 1 : null)
          }
          console.log(pagination);
          
        } else {
          // Default pagination if not provided
          pagination.value = {
            currentPage: page,
            totalPages: 1,
            totalItems: items.length,
            itemsPerPage: items.length,
            nextPage: null,
            prevPage: null
          }
          console.log(pagination);
        }
      } else if (Array.isArray(response)) {
        // Handle simple array response
        menu.value = response
        pagination.value = {
          currentPage: page,
          totalPages: 1,
          totalItems: response.length,
          itemsPerPage: response.length,
          nextPage: null,
          prevPage: null
        }
        console.log(pagination);
      } else {
        throw new Error('Invalid response format from server')
      }

      status.value = menu.value.length ? 'success' : 'empty'
      
    } catch (err) {
      error.value = err.message
      status.value = 'error'
      console.error('Menu API Error:', err)
      throw err
    }
  }
  const goToPage = async (page) => {
    if (page < 1 || page > pagination.value.totalPages) return;
  
    const currentQueryPage = parseInt(route.query.page) || 1;
    if (page === currentQueryPage) return; // Avoid refetching same page
  
    await router.push({
      query: {
        ...route.query,
        page: page > 1 ? page : undefined
      }
    });

  
    // fetchMenu will auto-trigger from the watcher
    nextTick(() => {
      if (menuGridRef.value) {
        menuGridRef.value.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };
  

  const resetFilters = () => {
    selectedFilters.value = ['All']
    searchQuery.value = ''
    sortOrder.value = ''
  }

  const filteredMenu = computed(() => {
    if (!menu.value || menu.value.length === 0) return []

    let filtered = [...menu.value]

    // Client-side filtering
    if (selectedFilters.value.length > 0 && !selectedFilters.value.includes('All')) {
      filtered = filtered.filter(item => 
        selectedFilters.value.some(filter => 
          item.category && item.category.toLowerCase() === filter.toLowerCase()
        )
      )
    }

    // Client-side search
    if (searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase().trim()
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query))
      )
    }

    return filtered
  })

  const sortedMenu = computed(() => {
    if (!filteredMenu.value.length) return []

    const sorted = [...filteredMenu.value]

    switch (sortOrder.value) {
      case 'asc': return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'desc': return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'low-high': return sorted.sort((a, b) => a.price - b.price)
      case 'high-low': return sorted.sort((a, b) => b.price - a.price)
      default: return sorted
    }
  })

  return {
    menu,
    error,
    status,
    searchQuery,
    selectedFilters,
    sortOrder,
    filteredMenu,
    sortedMenu,
    pagination,
    categories,
    goToPage,
    fetchMenu,
    resetFilters
  }
}