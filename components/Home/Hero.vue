<template>
  <div
    class="bg-[#233866] min-h-[85vh] flex justify-center items-center relative"
  >
    <UContainer
      class="flex flex-col md:flex-row justify-between items-center mt-10 md:mt-[90px]"
    >
      <div
        class="flex flex-col items-center md:items-start text-center md:text-left md:w-2/5 relative z-10"
      >
        <h1
          class="text-3xl md:text-5xl font-bold text-amber-50 cursor-default leading-tight"
        >
          Experience the Art of Flavor at Zaytona
        </h1>

        <p
          class="text-lg md:text-xl text-amber-50 cursor-default hidden md:block"
        >
          Enjoy exquisite flavors crafted with passion. Fresh ingredients,
          authentic recipes, and warm hospitality await you!
        </p>

        <div class="mt-5 flex flex-col md:flex-row gap-4">
          <UButton
            to="/auth/signUp"
            class="bg-white text-[#233866] px-6 py-3 font-semibold rounded-lg duration-300"
          >
            Sign Up Now!
          </UButton>

          <UButton
            to="/user/tables"
            class="hidden md:block bg-transparent text-amber-50 px-6 py-3 duration-300 border border-amber-50 hover:bg-amber-50 hover:text-[#233866] rounded-lg"
          >
            Book Your Table
          </UButton>
        </div>
      </div>

      <div class="relative w-full md:w-3/5 flex justify-center mt-10 md:mt-0">
        <img
          src="../../assets/images/Home/Group 4.png"
          alt="hero image"
          class="w-[90%] sm:w-[60%] md:w-[90%] lg:w-[100%] max-w-[500px] md:max-w-[600px]"
        />
      </div>
    </UContainer>
  </div>
</template>
