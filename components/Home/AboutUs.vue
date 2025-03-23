<template>
  <div class="bg-[#F6F3F0] py-10">
    <UContainer
      class="flex flex-col md:flex-row justify-between items-center min-h-screen"
    >
      <div
        class="flex flex-col gap-5 w-full md:w-[40%] text-center md:text-left px-5 md:px-0"
      >
        <h1
          class="text-3xl md:text-5xl font-bold text-[#233866] cursor-default"
        >
          The Heart Behind Our Flavor
        </h1>

        <p class="text-lg md:text-xl text-[#080D18] cursor-default">
          At Zaytona, we believe dining is more than just a meal—it’s an
          experience. With fresh ingredients, rich flavors, and warm
          hospitality, we bring people together over great food. Whether you're
          here for a casual bite or a special celebration, we’re dedicated to
          making every visit unforgettable. Join us and savor the perfect blend
          of tradition and quality!
        </p>

        <NuxtLink
          to="/user/AboutUs"
          class="text-[#233866] text-lg md:text-xl text-center mt-4"
        >
          View More Details About Us
        </NuxtLink>
        <hr class="border-[#233866] w-full md:w-[80%] mx-auto " />
      </div>

      <div
        class="hidden md:flex justify-center w-full md:w-[50%] mt-10 md:mt-0"
      >
        <img
          src="../../assets/images/Home/aboutUs.png"
          alt="Dining Table"
          class="w-[90%] sm:w-[75%] md:w-[85%] lg:w-[90%] max-w-[500px] md:max-w-[600px]"
        />
      </div>
    </UContainer>
  </div>
</template>
