<template>
  <div class="bg-[#F6F3F0] py-10">
    <UContainer class="flex flex-col gap-10">
      <div class="hidden md:flex justify-between items-center py-3">
        <div
          class="flex justify-around items-center gap-8 text-sm md:text-base"
        >
          <p class="cursor-default">Open Daily: 8 AM - 12 AM</p>
          <p class="cursor-default">(+20) 0100 506 6611</p>
          <p
            class="underline underline-offset-4 cursor-default hidden md:block"
          >
            12 Nile Street, Zamalek, Cairo
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <img
            src="../../assets/images/Home/facebooklogo.png"
            alt="Facebook"
            class="w-10 cursor-pointer"
          />
          <img
            src="../../assets/images/Home/instalogo.png"
            alt="Instagram"
            class="w-10 cursor-pointer"
          />
          <img
            src="../../assets/images/Home/tiktoklogo.png"
            alt="TikTok"
            class="w-10 cursor-pointer"
          />
        </div>
      </div>

      <div
        class="flex flex-col md:flex-row items-center justify-between md:h-[70vh] mt-14 sm:mt-10 md:mt-6 lg:mt-4 booking"
      >
        <div class="relative flex justify-center w-full md:w-1/2">
          <img
            src="../../assets/images/Home/reservation.png"
            alt="Dining Table"
            class="w-[80%] sm:w-[60%] md:w-[90%] lg:w-[100%] max-w-[500px] md:max-w-[600px]"
          />
        </div>

        <div
          class="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full md:w-[45%] mt-8 md:mt-0"
        >
          <h1
            class="text-2xl md:text-5xl font-bold text-primary cursor-default"
          >
            Reserve Your Table Effortlessly!
          </h1>

          <p
            class="hidden md:block text-lg md:text-xl text-[#080D18] cursor-default"
          >
            Book your table in just a few clicks! Choose your date, time, and
            preferred seating, and let us handle the rest for a perfect dining
            experience.
          </p>

          <UButton
            to="/user/tables"
            class="bg-[#233866] text-amber-50 px-6 py-3 rounded-lg duration-300 hover:border-primary hover:border hover:text-primary flex items-center justify-center gap-2 w-[90%] md:w-auto"
          >
            Book Your Table Now!
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>


<style scoped>

 

@media (min-width: 378px) and (max-width: 770px) {
  .booking {
margin-top: 30%;  }
}

/* @media (min-width: 768px) and (max-width: 1180px) {
  .booking {
height: 70vh;  }
} */


</style>