<template>
  <div class="flex justify-around items-center bg-[#233866] h-[100vh]">
    <div class="flex justify-around items-center w-full mt-[17%]">
      <div class="flex flex-col gap-5 w-1/2">
        <h1 class="text-5xl font-bold text-amber-50 w-2/3">
          Experience the Art of Flavor at Zaytona
        </h1>
        <p class="text-xl text-amber-50 w-2/4">
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

      <div class="relative flex justify-center z-0">
        <img
          src="../../assets/images/Home/Hero1.png"
          alt="hero image"
          class="w-[500px] relative z-10 "
        />

        <img
          src="../../assets/images/Home/Hero3.png"
          alt="hero image"
          class="w-[200px] absolute right-[-50px] top-[20%] z-20"
        />

        <img
          src="../../assets/images/Home/Hero2.png"
          alt="hero image"
          class="w-[400px] absolute left-[-250px] bottom-[-60px] z-20"
        />
      </div>
    </div>
  </div>


<div class="flex justify-between items-center m-5">

    
      <div class="flex justify-around items-center  gap-[80px]" >
        <div>
           <p class="cursor-default">Open Daily: 8 AM - 12 AM</p>
        </div>
        <div>
             <p class="cursor-default">(+20) 0100 506 6611</p>
        </div>
        <div>
            <p class="underline underline-offset-6 cursor-default">12 Nile Street, Zamalek, Cairo</p>
        </div>
      
      </div>
    
    <div class="flex gap-2 flex-col">
        <img src="../../assets/images/Home/facebooklogo.png" alt="facelogo " class="cursor-pointer">
        <img src="../../assets/images/Home/instalogo.png" alt="instalogo" class="cursor-pointer">
        <img src="../../assets/images/Home/tiktoklogo.png" alt="tiktoklogo" class="cursor-pointer">
    </div>
</div>



</template>
