<script setup></script>

<template>
  <div class="my-6">
    <div class="h-[180px]">
      <img
        src="../../assets/images/Home/Menu1.png"
        alt="card image"
        class="relative z-2"
      />
    </div>
    <div
      class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-tl-[30%] rounded-br-[30%] border border-slate-100 py-10 px-6"
    >
      <div>
        <div class="flex justify-between items-center mt-2">
          <h2 class="text-2xl text-primary my-4 font-bold">Meal Name</h2>
          <span class="font-bold text-primary text-xl">150$</span>
        </div>
        <p class="text-[#777] lh-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse repellat
          <br />
        </p>
      </div>
      <div>
        <!-- <nuxt-link to="/user/menu" class=" underline underline-offset-2 text-primary">View More</nuxt-link> -->
        <UButton
          class="bg-primary cursor-pointer text-amber-50 px-6 py-3 rounded-lg duration-300 border-primary hover:bg-white hover:border hover:text-primary flex items-center justify-center w-full mt-3"
        >



        <!-- :to="`/Menu/${Menu.id}`" -->
          <nuxt-link > View More </nuxt-link>
        
        
        </UButton>
      </div>
    </div>
  </div>
</template>
