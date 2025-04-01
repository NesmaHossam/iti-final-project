<template>
  <div class="bg-[url('/assets/images/Home/Menubg.png')] bg-contain">
    <UContainer>
      <div class="flex flex-col relative">
        <div class="mt-[30px] md:mt-[50px] flex justify-between items-center">
          <h1
            class="text-l sm:text-xl md:text-2xl lg:text-4xl font-bold text-primary cursor-default w-1/2 md:w-1/3"
          >
            Signature Delights Our Most Famous Dishes
          </h1>
          <NuxtLink
            to="/user/Menu"
            class="text-primary text-sm sm:text-md md:text-xl text-center mt-4 underline underline-offset-8"
          >
            View More Menu Items
          </NuxtLink>
        </div>

        <!-- <div class="relative my-auto overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out gap-5"
            :style="{
              transform: `translateX(-${
                currentIndex * (100 / itemsPerSlide)
              }%)`,
              width: `${(dishes.length / itemsPerSlide) * 100}%`,
            }"
          >
            <div
              v-for="(dish, index) in dishes"
              :key="index"
              class="flex justify-center items-center"
              :style="{ width: `${100 / dishes.length}%` }"
            >
              <div
                class="bg-slate-200/10 backdrop-blur-md shadow-lg mb-8 md:mb-12 p-6 lg:p-12 rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full max-w-xl flex flex-col items-center"
              >
                <div class="flex justify-between items-center relative z-1">
                  <h2
                    class="text-sm sm:text-lg md:text-xl cursor-default w-[60%] md:w-[70%]"
                  >
                    {{ dish.name }}
                  </h2>
                  <img
                    :src="dish.image"
                    class="w-[150px] sm:w-[180px] md:w-[200px] absolute top-[-100px] right-[-80px] z-[-1] md:top-[-150px] md:right-[-65px]"
                  >
                </div>

                <UButton
                  class="mt-4 bg-primary cursor-pointer text-white text-sm sm:text-lg w-[80%] md:w-full hover:bg-primary flex items-center justify-center"
                >
                  View Item
                </UButton>
              </div>
            </div>
          </div>

          <div class="flex justify-end items-center gap-4 pr-8 mt-4">
            <img
              src="@/assets/images/Home/arrowleft.png"
              class="cursor-pointer w-6 sm:w-8"
              @click="prevSlide"
            >
            <img
              src="@/assets/images/Home/arrowright.png"
              class="cursor-pointer w-6 sm:w-8"
              @click="nextSlide"
            >
          </div>
        </div> -->

        <UContainer
          class="my-12 h-[300px] flex justify-center items-center overflow-hidden"
        >
          <UCarousel
            v-slot="{ item }"
            loop
            auto-height
            arrows
            :items="items"
            :ui="{
              item: 'px-4 lg:basis-1/3 md:basis-1/2 basis-[100%]',
              
            }"
            class="w-[90%] md:w-full mx-auto md:mx-0"
          >
            <div
              class="bg-slate-200/10 backdrop-blur-md shadow-lg mb-8 md:mb-12 p-6 rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full flex justify-between relative"
            >
              <div class="w-[70%]">
                <h2 class="text-sm sm:text-lg md:text-xl cursor-default">
                  {{ item.name }}
                </h2>
                <UButton
                  class="mt-4 bg-primary cursor-pointer text-white text-sm sm:text-lg w-[70%] mx-auto md:w-full hover:bg-primary flex items-center justify-center"
                >
                  View Item
                </UButton>
              </div>
              <img
                :src="item.image"
                class="absolute w-[120px] right-0 top-[-40px] z-3"
              >
            </div>
          </UCarousel>
        </UContainer>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import Menu1 from "@/assets/images/Home/Menu1.png";
import Menu2 from "@/assets/images/Home/Menu2.png";
import Menu3 from "@/assets/images/Home/Menu3.png";

const items = ref([
  { name: "Spaghetti pasta with red sauce", image: Menu1 },
  { name: "Butterfly shrimp with butter sauce", image: Menu2 },
  { name: "Egyptian Fattah with Moza", image: Menu3 },
  { name: "Egyptian Fattah with Moza", image: Menu3 },
]);

// const currentIndex = ref(0);
// const itemsPerSlide = ref(1);
// const totalSlides = ref(0);

// const updateItemsPerSlide = () => {
//   const width = window.innerWidth;
//   if (width < 640) {
//     itemsPerSlide.value = 1;
//   } else if (width < 1024) {
//     itemsPerSlide.value = 2;
//   } else {
//     itemsPerSlide.value = 3;
//   }
//   totalSlides.value = Math.ceil(dishes.value.length / itemsPerSlide.value);
// };

// const nextSlide = () => {
//   if (currentIndex.value < totalSlides.value - 1) {
//     currentIndex.value++;
//   } else {
//     currentIndex.value = 0;
//   }
// };

// const prevSlide = () => {
//   if (currentIndex.value > 0) {
//     currentIndex.value--;
//   } else {
//     currentIndex.value = totalSlides.value - 1;
//   }
// };

// onMounted(() => {
//   updateItemsPerSlide();
//   window.addEventListener("resize", updateItemsPerSlide);
// });

// onBeforeUnmount(() => {
//   window.removeEventListener("resize", updateItemsPerSlide);
// });
</script>
