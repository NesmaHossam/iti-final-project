<script setup>
import { z } from "zod";
const MenuData = useCookie("MenuData");

// edit item
// state
const formState = reactive({
  name: MenuData.value?.name || "",
  category: MenuData.value?.category || "",
  description: "",
  image: "",
  price: "",
});

//schema
const schema = z.object({
  name: z.string().min(1, "Item Name is required"),
  category: z.string().min(1, "Item Category is required"),
  description: z.string().min(1, "Item Description is required"),
  image: z.string().min(1, "Item Image is required"),
  price: z.string().min(1, "Item Price is required"),
});

// submit function
const errorMsg = reactive({
  name: "",
  category: "",
  description: "",
  image: "",
  price: "",
});
const errMsg = ref("");
const isLoading = ref(false);

const router = useRouter();

async function EditItem() {
  try {
    isLoading.value = true;
    Object.keys(errorMsg).forEach((key) => (errorMsg[key] = ""));
    errMsg.value = "";

    const result = schema.safeParse(formState);
    if (!result.success) {
      result.error.errors.forEach((e) => {
        errorMsg[e.path[0]] = e.message;
      });
      return;
    }

    console.log(formState);
    await useApi("/admin/editItem", "PATCH", formState);
    MenuData.value = { name: formState.name, category: formState.category };
    router.push("/admin/Menu");
  } catch (error) {
    console.error("Edit error:", error);
    errMsg.value = error.message || "An unexpected error occurred";
  } finally {
    isLoading.value = false;
  }
}

const goToMenuItem = () => {
  router.push("/admin/Menu");
};
///////////////////////////////////////////////////////////

// state for add  new item
const newItemState = reactive({
  name: MenuData.value?.name || "",
  category: MenuData.value?.category || "",
  description: "",
  image: "",
  price: "",
});

// Validation schema for adding an item
const newItemSchema = z.object({
  name: z.string().min(1, "Item Name is required"),
  category: z.string().min(1, "Item Category is required"),
  description: z.string().min(1, "Item Description is required"),
  image: z.string().min(1, "Item Image is required"),
  price: z.string().min(1, "Item Price is required"),
});

// State for validation messages
const newItemErrors = reactive({
  name: "",
  category: "",
  description: "",
  image: "",
  price: "",
});

const newItemMsg = ref("");
const isAdding = ref(false);

// Function to add a new item
async function AddItem() {
  try {
    isAdding.value = true;
    Object.keys(newItemErrors).forEach((key) => (newItemErrors[key] = ""));
    newItemMsg.value = "";

    const result = newItemSchema.safeParse(newItemState);
    if (!result.success) {
      result.error.errors.forEach((e) => {
        newItemErrors[e.path[0]] = e.message;
      });
      return;
    }

    // Send request to API
    await useApi("/admin/addItem", "POST", newItemState);

    // Update the menu data
    MenuData.value = [...(MenuData.value || []), { ...newItemState }];

    // Reset the form
    Object.keys(newItemState).forEach((key) => (newItemState[key] = ""));

    // Refresh the menu
    router.push("/admin/Menu");
  } catch (error) {
    console.error("Add error:", error);
    newItemMsg.value = error.message || "An unexpected error occurred";
  } finally {
    isAdding.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col gap-8 w-full my-6 mx-[20%] lg:mx-[10%]">
    <div class="flex justify-between items-center">
      <div class="flex justify-between flex-col">
        <h2 class="text-primary text-xl md:text-3xl font-bold">Menu Items</h2>
        <!-- <p>{{ filteredData.length }} Items</p> -->
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
            <div>
              <UForm @submit="AddItem">
                <div>
                  <h2 class="text-primary text-3xl font-bold">New Item</h2>
                  <p class="text-gray-500 text-xl">Add new items to menu!</p>
                </div>

                <div class="flex flex-col gap-2 my-6">
                  <UFormGroup label="Item Name" name="name">
                    <UInput
                      v-model="newItemState.name"
                      placeholder="Item Name"
                      class="w-full"
                    />
                    <p
                      v-if="newItemErrors.name"
                      class="text-red-500 text-sm mt-1"
                    >
                      {{ newItemErrors.name }}
                    </p>
                  </UFormGroup>

                  <UFormGroup label="Category" name="category">
                    <UInputMenu
                      v-model="newItemState.category"
                      placeholder="Item Category"
                      class="w-full"
                    />
                    <p
                      v-if="newItemErrors.category"
                      class="text-red-500 text-sm mt-1"
                    >
                      {{ newItemErrors.category }}
                    </p>
                  </UFormGroup>

                  <UFormGroup label="Price" name="price">
                    <UInput
                      v-model="newItemState.price"
                      placeholder="Item Price"
                      type="number"
                      class="w-full"
                    />
                    <p
                      v-if="newItemErrors.price"
                      class="text-red-500 text-sm mt-1"
                    >
                      {{ newItemErrors.price }}
                    </p>
                  </UFormGroup>
                  <UFormGroup label="Image" name="image">
                    <UInput
                      v-model="newItemState.image"
                      type="file"
                      placeholder="Item Image"
                      class="w-full"
                    />
                    <p
                      v-if="newItemErrors.image"
                      class="text-red-500 text-sm mt-1"
                    >
                      {{ newItemErrors.image }}
                    </p>
                  </UFormGroup>
                  <UFormGroup label="Description" name="description">
                    <UTextarea
                      v-model="newItemState.description"
                      placeholder="Item Description..."
                      class="w-full"
                    />
                    <p
                      v-if="newItemErrors.description"
                      class="text-red-500 text-sm mt-1"
                    >
                      {{ newItemErrors.description }}
                    </p>
                  </UFormGroup>
                </div>

                <div class="flex flex-col md:flex-row justify-between gap-5">
                  <UButton
                    @click="goToMenuItem"
                    class="md:text-xl text-sm px-16 cursor-pointer bg-transparent text-primary border border-primary flex items-center justify-center hover:text-white"
                    >Cancel</UButton
                  >
                  <UButton
                    :loading="isAdding"
                    type="submit"
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
              <div>
                <UForm :state="formState" :schema="schema" @submit="EditItem">
                  <div>
                    <h2 class="text-primary text-3xl font-bold">Edit Item</h2>
                    <p class="text-gray-500 text-xl">Edit your item in menu!</p>
                  </div>

                  <div class="flex flex-col gap-4 my-6">
                    <UFormGroup label="Item Name" name="name">
                      <UInput
                        v-model="formState.name"
                        placeholder="Item Name"
                        type="text"
                      />
                      <p v-if="errorMsg.name" class="text-red-500 text-sm mt-1">
                        {{ errorMsg.name }}
                      </p>
                    </UFormGroup>

                    <UFormGroup label="Category" name="category">
                      <UInputMenu
                        v-model="formState.category"
                        placeholder="Item Category"
                        type="text"
                      />
                      <p
                        v-if="errorMsg.category"
                        class="text-red-500 text-sm mt-1"
                      >
                        {{ errorMsg.category }}
                      </p>
                    </UFormGroup>

                    <UFormGroup label="Price" name="price">
                      <UInput
                        v-model="formState.price"
                        placeholder="Item Price"
                        type="number"
                      />
                      <p
                        v-if="errorMsg.price"
                        class="text-red-500 text-sm mt-1"
                      >
                        {{ errorMsg.price }}
                      </p>
                    </UFormGroup>

                    <UFormGroup label="Image" name="image">
                      <UInput
                        v-model="formState.image"
                        type="file"
                        placeholder="Item Image"
                      />
                      <p
                        v-if="errorMsg.image"
                        class="text-red-500 text-sm mt-1"
                      >
                        {{ errorMsg.image }}
                      </p>
                    </UFormGroup>

                    <UFormGroup label="Description" name="description">
                      <UTextarea
                        v-model="formState.description"
                        placeholder="Item Description..."
                      />
                      <p
                        v-if="errorMsg.description"
                        class="text-red-500 text-sm mt-1"
                      >
                        {{ errorMsg.description }}
                      </p>
                    </UFormGroup>
                  </div>

                  <div class="flex flex-col md:flex-row justify-between gap-5">
                    <UButton
                      @click="goToMenuItem"
                      class="md:text-xl text-sm px-16 cursor-pointer bg-transparent text-primary border border-primary flex items-center justify-center hover:text-white"
                      >Cancel</UButton
                    >
                    <UButton
                      @click.prevent="EditItem"
                      :loading="isLoading"
                      type="submit"
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
                    class="px-2 py-1 md:px-16 md:py-2 text-sm bg-transparent text-primary border boreder-primary rounded cursor-pointer hover:text-white"
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
      <!-- <div>
        <p class="text-sm text-gray-500">
          Showing {{ (page - 1) * itemsPerPage + 1 }}-
          {{ Math.min(page * itemsPerPage, filteredData.length) }} of
          {{ filteredData.length }}
        </p>
      </div> -->

      <!-- <div>
        <UPagination
          v-model="page"
          :items-per-page="itemsPerPage"
          :total="filteredData.length"
          @update:page="page = $event"
        />
      </div> -->
    </div>
  </div>
</template>
