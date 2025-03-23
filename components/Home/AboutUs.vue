<template>
  <div class="flex justify-around items-center h-[100vh] py-[100px] bg-[#F6F3F0]">
    <div class="flex flex-col gap-5 w-[27%]">
      <h1 class="text-5xl font-bold text-[#233866] cursor-default">
        The Heart Behind Our Flavor
      </h1>
      <p class="text-xl text-[#080D18] cursor-default">
        At Zaytona, we believe dining is more than just a meal—it’s an
        experience. With fresh ingredients, rich flavors, and warm hospitality,
        we bring people together over great food. Whether you're here for a
        casual bite or a special celebration, we’re dedicated to making every
        visit unforgettable. Join us and savor the perfect blend of tradition
        and quality!
      </p>

      <NuxtLink
        to="/user/AboutUs"
        class="text-[#233866] text-xl text-center mt-4"
        >View More Details About Us</NuxtLink
      >
      <hr class="text-[#233866]" />
    </div>

    <div class="relative flex justify-center z-0">
      <img
        src="../../assets/images/Home/aboutUs1.png"
        alt="about image"
        class="w-[500px] relative z-10"
      />

      <img
        src="../../assets/images/Home/aboutUs2.png"
        alt="about image"
        class="w-[200px] absolute right-[-90px] top-[10%] z-20"
      />

      <img
        src="../../assets/images/Home/aboutUs3.png"
        alt="about image"
        class="w-[200px] absolute left-[-100px] bottom-[60px] z-20"
      />
    </div>
  </div>
</template>
