<script setup>
const items = ref(["Dinner", "Lunch", "Breakfast"]);
</script>

<template>
  <UContainer
    class="flex flex-col gap-8 w-[80%] my-8 mt-[100px] ml-[20%] lg:ml-[10%] "
  >
    <div>
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
        to="/admin/Menu"
          class="md:text-xl text-sm px-16 cursor-pointer bg-transparent text-primary border border-primary flex items-center justify-center hover:text-white"
          >Cancel</UButton
        >
        <UButton
          class="md:text-xl text-sm px-16 cursor-pointer flex justify-center items-center"
          >Save Item</UButton
        >
      </div>
    </div>
  </UContainer>
</template>
