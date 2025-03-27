<template>
  <div
    class="bg-primary min-h-[50vh] md:min-h-[80vh] flex items-center justify-center relative"
  >
    <UContainer
      class="flex flex-col md:flex-row justify-between items-center mt-2 md:mt-4 w-full px-4 hero"
    >
      <div class="md:w-2/5 w-full text-left relative z-0 flex flex-col">
        <h1
          class="text-lg md-xl w-2/4 sm:w-1/2 md:w-full md:text-5xl font-bold text-white leading-tight"
        >
          Experience the Art of Flavor at Zaytona
        </h1>
        <p class="text-base md:text-xl text-white mt-3 hidden md:block">
          Enjoy exquisite flavors crafted with passion. Fresh ingredients,
          authentic recipes, and warm hospitality await you!
        </p>
        <div class="mt-4 flex flex-col gap-3 md:flex-row">
          <UButton
            to="/auth/signUp"
            class="bg-white text-[#233866] px-3 py-2 font-semibold rounded-lg w-[30%] md:w-auto text-[10px] md:text-base flex items-center justify-center hover:bg-primary hover:text-white hover:border hover:border-white"
          >
            Sign Up Now!
          </UButton>

          <UButton
            to="/user/tables"
            class="border border-white text-white px-6 py-3 rounded-lg w-full md:w-auto hover:bg-white hover:text-[#233866] hidden md:block"
          >
            Book Your Table
          </UButton>
        </div>
      </div>

      <div class="relative w-full md:w-3/5 flex justify-end">
        <img
          src="../../assets/images/Home/Group 4.png"
          alt="hero image"
          class="w-[80%] sm:w-[70%] md:w-[80%] lg:w-[100%] max-w-[800px] absolute top-[0%] right-0"
        />
      </div>
    </UContainer>
  </div>
</template>
<style scoped>
@media (min-width: 768px) and (max-width: 1180px) {
  .hero img {
    width: 100% !important;
  }
  .hero h1 {
    font-size: 30px;

   
  }
  .hero p {
    font-size: 20px;
  }
}
</style>
