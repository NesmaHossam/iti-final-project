<script setup>
const open = ref(false);
const toast = useToast();

// items select
const items = ref(["dinner", "lunch", "breakfast" , "drink" , 'desert' ]);

const page = ref(1);
const itemsPerPage = 8;

const globalFilter = ref("");

const data = ref([]);

watch(globalFilter, () => {
  page.value = 1;
});

const filteredData = computed(() =>
  data.value.filter((item) => {
    const searchTerm = globalFilter.value.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.price.toLowerCase().includes(searchTerm)
    );
  })
);

const paginatedData = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filteredData.value.slice(start, end);
});


onMounted(async () => {
  try {
    const response = await useApi('/menu/getMenu', "get");
    console.log(response);
    
    if (response?.results) {
      data.value = response.results.data;
      console.log(data);
      
    }
  } catch (error) {
    console.error('Error fetching results:', error);
    toast.add({
      title: "Failed to load results",
      description: error.message,
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
});


const deleteItem = async (itemId) => {
const response =   await useApi(`/menu/deleteMenuItem/${itemId}` , 'delete')
console.log(response);
open.value = true
  
}

</script>

<template>
  <div class="flex flex-col gap-8 w-full my-6 mx-[20%] lg:mx-[10%]">
    <div class="flex justify-between items-center">
      <div class="flex justify-between flex-col">
        <h2 class="text-primary text-xl md:text-3xl font-bold">Menu Items</h2>
        <p>{{ filteredData.length }} Items</p>
      </div>

      <div class="flex flex-col gap-4">
        <UInput
          icon="i-lucide-search"
          class="max-w-sm"
          size="md"
          variant="outline"
          placeholder="Search..."
          v-model="globalFilter"
        />
        <!-- 
        <nuxt-link to="/admin/addMenuItem"
          ><UButton class="md:text-xl text-sm cursor-pointer"
            >Add New Item to Menu</UButton
          ></nuxt-link
        > -->

        <UModal
          title="Add New Item to Menu"
          :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full cursor-pointer ',
          }"
        >
          <UButton
            label="Add New Item"
            color="neutral"
            variant="subtle"
            class="bg-primary text-white hover:text-primary cursor-pointer flex items-center justify-center"
          />

          <template #body>
            <Placeholder class="h-48" />
            <div>
              <UForm>
                <div>
                  <h2 class="text-primary text-3xl font-bold">New Item</h2>
                  <p class="text-gray-500 text-xl">Add new items to menu!</p>
                </div>

                <div class="flex flex-col gap-2 my-6">
                  <UInput placeholder="Item Name" type="text" />
                  <UInputMenu placeholder="Item Type" :items="items" />

                  <UInput placeholder="Item Price" type="number" />
                  <UInput type="file" placeholder="Item Image" />
                  <UTextarea placeholder="Item Description..." />
                </div>

                <div class="flex flex-col md:flex-row justify-between gap-5">
                  <UButton
                    class="md:text-xl text-sm px-16 cursor-pointer bg-transparent text-primary border border-primary flex items-center justify-center hover:text-white"
                    >Cancel</UButton
                  >
                  <UButton
                    class="md:text-xl text-sm px-16 cursor-pointer flex justify-center items-center"
                    >Save Item</UButton
                  >
                </div>
              </UForm>
            </div>
          </template>
        </UModal>
      </div>
    </div>

    <div class="flex flex-col gap-4 mt-6">
      <div
        v-for="MenuItem in paginatedData"
        :key="MenuItem.id"
        class="flex md:flex-row flex-col flex-wrap border border-gray-300 rounded-md items-center gap-4 p-4 justify-around"
      >
        <img :src="MenuItem.image.secure_url" alt="" class="w-[150px] md:w-[200px]">
        <div>
          <h2 class="text-primary text-2xl font-bold cursor-default">
            {{ MenuItem.name }}
          </h2>
          <div class="flex justify-between">
            <h2 class="font-semibold text-xl mt-4 cursor-default">
              {{ MenuItem.category }}
            </h2>
            <h2 class="font-semibold text-xl mt-4 cursor-default">
              {{ MenuItem.price }}
            </h2>
          </div>
          <p
            class="mt-4 text-gray-500 cursor-default truncate whitespace-nowrap overflow-hidden text-overflow-ellipsis w-[300px] md:w-[500px]"
          >
            {{ MenuItem.description }}
          </p>
        </div>

        <div class="flex justify-between gap-5">
          <!-- <UButton class="md:text-xl text-sm cursor-pointer">Edit</UButton> -->

          <UModal
            title="Edit Menu Item"
            :close="{
              color: 'primary',
              variant: 'outline',
              class: 'rounded-full cursor-pointer',
            }"
          >
            <UButton
              label="Edit"
              color="neutral"
              variant="subtle"
              class="bg-primary text-white hover:text-primary cursor-pointer"
            />

            <template #body>
              <Placeholder class="h-48" />
              <div>
                <UForm>
                  <div>
                    <h2 class="text-primary text-3xl font-bold">Edit Item</h2>
                    <p class="text-gray-500 text-xl">Edit your item in menu!</p>
                  </div>

                  <div class="flex flex-col gap-2 my-6">
                    <UInput placeholder="Item Name" type="text" />
                    <UInputMenu placeholder="Item Type" :items="items" />

                    <UInput placeholder="Item Price" type="number" />
                    <UInput type="file" placeholder="Item Image" />
                    <UTextarea placeholder="Item Description..." />
                  </div>

                  <div class="flex flex-col md:flex-row justify-between gap-5">
                    <UButton
                      class="md:text-xl text-sm px-16 cursor-pointer bg-transparent text-primary border border-primary flex items-center justify-center hover:text-white"
                      >Cancel</UButton
                    >
                    <UButton
                      class="md:text-xl text-sm px-16 cursor-pointer flex justify-center items-center"
                      >Save Edit</UButton
                    >
                  </div>
                </UForm>
              </div>
            </template>
          </UModal>

          <!-- <UButton class="md:text-xl text-sm cursor-pointer">Delete</UButton> -->
          <UModal
            v-model:open="open"
            :ui="{
              content:
                'bg-transparent border-0 shadow-none rounded-none divided-none ring-transparent ',
            }"
          >
            <UButton
              class="md:text-xl text-sm cursor-pointer"
              label="Open"
              color="neutral"
              variant="subtle"
            >
              Delete
            </UButton>

            <template #content>
              <div
                class="bg-slate-400/10 backdrop-blur-md shadow-md p-6 lg:p-12 overflow-hidden relative rounded-tl-[30%] rounded-br-[30%] border border-slate-300 w-full flex flex-col items-center"
              >
                <p class="text-center text-xl">
                  Are you sure about deleting this item?
                </p>

                <div class="flex justify-end mt-8 gap-4">
                  <UButton
                    class="mr-2 px-2 py-1 md:px-16 md:py-2 text-sm bg-primary text-white rounded cursor-pointer"
                    @click="open = false"
                  >
                    Cancel
                  </UButton>
                  <UButton
                    class="px-2 py-1 md:px-16 md:py-2 text-sm bg-transparent text-primary border border-primary rounded cursor-pointer hover:text-white"
                    @click="deleteItem(MenuItem._id)"
                  >
                    Delete
                  </UButton>
                </div>
              </div>
            </template>
          </UModal>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm text-gray-500">
          Showing {{ (page - 1) * itemsPerPage + 1 }}-
          {{ Math.min(page * itemsPerPage, filteredData.length) }} of
          {{ filteredData.length }}
        </p>
      </div>

      <div>
        <UPagination
          v-model="page"
          :items-per-page="itemsPerPage"
          :total="filteredData.length"
          @update:page="page = $event"
        />
      </div>
    </div>
  </div>
</template>
