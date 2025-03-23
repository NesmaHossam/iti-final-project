<template>
  <div
    class="h-[90vh] bg-[url('/assets/images/Home/Menubg.png')] bg-contain flex flex-col"
  >
    <div class="mt-[100px] flex justify-between items-center">
      <h1 class="text-4xl font-bold text-[#233866] cursor-default w-1/4">
        Signature Delights Our Most Famous Dishes
      </h1>
      <NuxtLink
        to="/user/Menu"
        class="text-[#233866] text-xl text-center mt-4 underline underline-offset-4"
        >View More Menu Items</NuxtLink
      >
    </div>

    <div class="flex justify-between items-center mx-auto">
      <div
        class="bg-slate-200/10 backdrop-blur-md shadow-2xl shadow-indigo-300/50 rounded-tr-[20%] rounded-bl-[20%] w-[600px] px-16 py-8 overflow-hidden text-[#080D18]"
      >
        <!-- static data will be changed with the backend data -->
        <img src="../../assets/images/Home/Menu1.png" class="w-[250px]" />
        <h2 class="text-xl cursor-default">Spaghetti pasta with red sauce</h2>
        <UButton
          class="duration-300 bg-[#233866] text-white cursor-pointer text-lg"
          >View Item</UButton
        >
      </div>
    </div>
  </div>
</template>
