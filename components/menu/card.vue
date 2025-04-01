<script setup>

</script>


<template>
  <div
    
  >
    <div class="h-[180px]">
      <img src="../../assets/images/Home/Menu1.png" alt="card image" class="relative z-2">
    </div>
   <div class="bg-slate-200/10 backdrop-blur-md shadow-lg  rounded-tl-[30%] rounded-br-[30%] border border-slate-100 pt-10 px-6">
    <div class="p-4">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl text-primary my-4 font-bold">Meal Name</h2>
            <span class="font-bold text-primary text-xl">150$</span>
        </div>
        <p class="text-[#777] lh-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse repellat <br>
        totam quisquam voluptatum! Quibusdam, voluptatem eligendi. Sint error,
        </p>
    </div>
    <div class="p-4 text-right">
        <nuxt-link to="/user/menu" class=" underline underline-offset-2 text-primary">View More</nuxt-link>
    </div>
   </div>
  </div>
</template>
