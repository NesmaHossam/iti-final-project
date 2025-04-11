<template>
  <UContainer>
    <div
      class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-tl-[30%] rounded-br-[30%] border border-slate-100 py-10 px-6 my-8"
    >
      <div v-if="loading" class="text-center text-lg font-semibold p-10">
        <USkeleton class="h-56 w-full mb-3" />
        <USkeleton class="h-6 w-3/4 mb-2" />
        <USkeleton class="h-4 w-1/2 mb-2" />
        <USkeleton class="h-4 w-full mb-2" />
        <USkeleton class="h-4 w-full" />
      </div>

      <div v-if="error" class="text-red-500 text-center text-lg font-semibold p-10">
        {{ error }}
        <div class="mt-4">
          <UButton color="primary" @click="router.push('/user/menu')">Back to Menu</UButton>
        </div>
      </div>

      <div v-if="item && !loading" class="p-4">
        <div class="flex flex-col md:flex-row md:justify-around gap-8">
          <div class="md:w-1/2">
            <h1 class="text-3xl font-bold text-primary my-4">{{ item.name }}</h1>
            <div class="flex justify-between my-4">
              <h2 class="font-semibold text-xl">{{ item.category || 'Uncategorized' }}</h2>
              <h2 class="font-semibold text-xl text-primary">${{ item.price.toFixed(2) }}</h2>
            </div>
            <div>
              <h2 class="font-semibold text-2xl mt-4 mb-2">Description</h2>
              <p class="text-lg text-gray-700">
                {{ item.description || 'No description available for this item.' }}
              </p>
            </div>
            
            <div class="mt-8">
              <UButton
                class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90"
                @click="router.push('/user/menu')"
              >
                Back to Menu
              </UButton>
            </div>
          </div>

          <div class="md:w-1/2">
            <img
              :src="item.image.secure_url || '../../assets/images/Home/Menu1.png'"
              :alt="item.name"
              class="rounded-lg shadow-lg w-full max-h-[400px] object-cover"
            >
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const itemId = route.params.id;

const item = ref(null);
const loading = ref(true);
const error = ref(null);


const fetchItemDetails = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const data = await useApi(`/menu/getMenuItem/${itemId}` , "get");
    console.log(data);
    
    if (data) {
      item.value = data.results;
    } else {
      error.value = "Item not found";
    }
  } catch (err) {
    console.error("Error fetching menu item:", err);
    error.value = err.message || "Failed to load item details";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchItemDetails);
</script>