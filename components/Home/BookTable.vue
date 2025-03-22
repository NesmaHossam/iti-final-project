<template>
  <div class="bg-[#F6F3F0] mt-0 pb-[200px]">
    <div class="flex justify-between items-center mx-5 py-5">
      <div class="flex justify-around items-center gap-[80px]">
        <div>
          <p class="cursor-default">Open Daily: 8 AM - 12 AM</p>
        </div>
        <div>
          <p class="cursor-default">(+20) 0100 506 6611</p>
        </div>
        <div>
          <p class="underline underline-offset-6 cursor-default">
            12 Nile Street, Zamalek, Cairo
          </p>
        </div>
      </div>

      <div class="flex gap-2 flex-col">
        <img
          src="../../assets/images/Home/facebooklogo.png"
          alt="facelogo "
          class="cursor-pointer"
        />
        <img
          src="../../assets/images/Home/instalogo.png"
          alt="instalogo"
          class="cursor-pointer"
        />
        <img
          src="../../assets/images/Home/tiktoklogo.png"
          alt="tiktoklogo"
          class="cursor-pointer"
        />
      </div>
    </div>

    <div class="flex justify-around items-center h-[100vh]">
      <div class="relative flex justify-center z-0">
        <img
          src="../../assets/images/Home/reservation1.png"
          alt="hero image"
          class="w-[500px] relative z-10"
        />

        <img
          src="../../assets/images/Home/reservation3.png"
          alt="hero image"
          class="w-[300px] absolute right-[-40%] bottom-[-20%] z-20"
        />

        <img
          src="../../assets/images/Home/reservation2.png"
          alt="hero image"
          class="w-[200px] absolute left-[-90px] top-[20%] z-20"
        />
      </div>

      <div class="flex flex-col gap-5 w-[25%]">
        <h1 class="text-5xl font-bold text-[#233866] cursor-default">
          Reserve Your Table Effortlessly!
        </h1>
        <p class="text-xl text-[#080D18] cursor-default">
          Book your table in just a few clicks! Choose your date, time, and
          preferred seating, and let us handle the rest for a perfect dining
          experience.
        </p>

        <UButton
          to="/user/tables"
          class="bg-[#233866] text-amber-50 px-8 py-3 duration-300 hover:border-[#233866] hover:border hover:text-[#233866] flex items-center justify-center gap-2"
          >Book Your Table Now!</UButton
        >
      </div>
    </div>
  </div>
</template>
