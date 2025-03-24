<template>
  <div class="bg-[#F6F3F0] py-5 md:py-10">
    <UContainer
      class="flex flex-row items-center justify-between min-h-[30vh] md:min-h-[50vh] px-3 md:px-0"
    >
      <div class="flex flex-col gap-3 w-[50%] text-center md:text-left">
        <h1 class="text-sm md:text-4xl font-bold text-[#233866] cursor-default">
          The Heart Behind Our Flavor
        </h1>

        <p
          class="hidden md:block text-base md:text-lg text-[#080D18] cursor-default w-[80%]"
        >
          At Zaytona, we believe dining is more than just a meal—it’s an
          experience. With fresh ingredients, rich flavors, and warm
          hospitality, we bring people together over great food. Whether you're
          here for a casual bite or a special celebration, we’re dedicated to
          making every visit unforgettable. Join us and savor the perfect blend
          of tradition and quality!
        </p>

        <NuxtLink
          to="/user/AboutUs"
          class="text-[#233866] text-sm md:text-lg mt-2 md:mt-4"
        >
          View More Details About Us
        </NuxtLink>

        <hr class="border-[#233866] w-full md:w-[40%]" />
      </div>

      <div class="flex justify-center w-[50%]">
        <img
          src="../../assets/images/Home/aboutUs.png"
          alt="Dining Table"
          class="w-[85%] sm:w-[75%] md:w-[85%] lg:w-[90%] max-w-[400px] md:max-w-[600px]"
        />
      </div>
    </UContainer>
  </div>
</template>
