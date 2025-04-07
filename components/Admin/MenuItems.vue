<script setup>
import img1 from "../../assets/images/Home/Menu1.png";
const open = ref(false);

const page = ref(1);
const itemsPerPage = 2;

const globalFilter = ref("");

const data = ref([
  {
    id: 1,
    name: "Ceasar Salad",
    category: "Breakfast",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: img1,
    price: "12$",
  },
  {
    id: 2,
    name: "Greek Salad",
    category: "Dinner",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: img1,
    price: "15$",
  },
  {
    id: 3,
    name: "Fruit Salad",
    category: "Lunch",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: img1,
    price: "10$",
  },
  {
    id: 4,
    name: "Pasta",
    category: "Dinner",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: img1,
    price: "20$",
  },
]);

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

        <nuxt-link to="/admin/addMenuItem"
          ><UButton class="md:text-xl text-sm cursor-pointer"
            >Add New Item to Menu</UButton
          ></nuxt-link
        >
      </div>
    </div>

    <div class="flex flex-col gap-4 mt-6">
      <div
        v-for="MenuItem in paginatedData"
        :key="MenuItem.id"
        class="flex md:flex-row flex-col flex-wrap border border-gray-300 rounded-md items-center gap-4 p-4 justify-around"
      >
        <img :src="MenuItem.image" alt="" class="w-[150px] md:w-[200px]" />
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
          <UButton class="md:text-xl text-sm cursor-pointer">Edit</UButton>
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
                    class="px-2 py-1 md:px-16 md:py-2 text-sm bg-transparent text-primary border boreder-primary rounded cursor-pointer"
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
