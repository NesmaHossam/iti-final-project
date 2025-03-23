<template>
  <div class="bg-[#233866] h-[85vh] flex justify-center">
    <div class="container flex justify-between items-start mt-[90px]">
      <div class="flex flex-col gap-5 w-2/5 self-center">
        <h1 class="text-5xl font-bold text-amber-50 cursor-default">
          Experience the Art of Flavor at Zaytona
        </h1>
        <p class="text-xl text-amber-50  cursor-default">
          Enjoy exquisite flavors crafted with passion. Fresh ingredients,
          authentic recipes, and warm hospitality await you!
        </p>

        <div class="flex gap-4 mt-5">
          <UButton
            to="/auth/signUp"
            class="bg-amber-50 text-[#233866] px-9 py-3 duration-300 hover:text-amber-50 border border-amber-50"
            >Sign Up Now!</UButton
          >

          <UButton
            to="/user/tables"
            class="bg-transparent text-amber-50 px-8 py-3 duration-300 border border-amber-50 hover:bg-amber-50 hover:text-[#233866]"
            >Book Your Table</UButton
          >
        </div>
      </div>

      <div class=" image flex justify-center items-start z-0 w-3/5">
        <img src="../../assets/images/Home/Group 4.png" alt="hero image" class=" translate-y-14">
      </div>
    </div>
  </div>
</template>
