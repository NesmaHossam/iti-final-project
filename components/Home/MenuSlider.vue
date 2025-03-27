<template>
  <div class="bg-[url('/assets/images/Home/Menubg.png')] bg-contain">
    <UContainer>
      <div class="min-h-[50vh] md:min-h-[80vh] flex flex-col relative">
        <div class="mt-[30px] md:mt-[50px] flex justify-between items-center">
          <h1
            class="text-l sm:text-xl md:text-4xl font-bold text-primary cursor-default w-1/2 md:w-1/3"
          >
            Signature Delights Our Most Famous Dishes
          </h1>
          <NuxtLink
            to="/user/Menu"
            class="text-[#233866] text-sm sm:text-md md:text-xl text-center mt-4 underline underline-offset-4"
          >
            View More Menu Items
          </NuxtLink>
        </div>

        <div class="relative mt-8">
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-500 ease-in-out gap-5"
              :style="{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerSlide)
                }%)`,
              }"
            >
              <div
                v-for="(dish, index) in dishes"
                :key="index"
                class="flex justify-center items-center w-full"
              >
                <div
                  class="bg-slate-200/10 backdrop-blur-md shadow-lg mb-8 md:mb-12 p-6 lg:p-12 relative z-2 rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full max-w-xl flex flex-col items-center"
                >
                  <!--    <img
                  src="@/assets/images/Home/Menu1.png"
                    class="w-[150px] sm:w-[180px] md:w-[200px] absolute top-[-40%] right-[-30%] transform -translate-x-1/2"
                  /> -->
                  <img
                    :src="dish.image"
                    class="w-[150px] sm:w-[180px] md:w-[200px]"
                  />
                  <h2
                    class="text-sm sm:text-lg md:text-xl cursor-default w-full md:w-[60%]"
                  >
                    {{ dish.name }}
                  </h2>
                  <UButton
                    class="mt-4 bg-primary text-white text-sm sm:text-lg w-full hover:bg-primary flex items-center justify-center"
                  >
                    View Item
                  </UButton>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end items-center gap-4 pr-8">
            <img
              src="@/assets/images/Home/arrowleft.png"
              class="cursor-pointer w-6 sm:w-8"
              @click="prevSlide"
            />
            <img
              src="@/assets/images/Home/arrowright.png"
              class="cursor-pointer w-6 sm:w-8"
              @click="nextSlide"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const dishes = ref([
  {
    name: "Spaghetti pasta with red sauce",
    image: "/assets/images/Home/Menu1.png",
  },
  {
    name: "Butterfly shrimp with butter sauce",
    image: "/assets/images/Home/Menu2.png",
  },
  {
    name: "Egyptian Fattah with Moza",
    image: "/assets/images/Home/Menu3.png",
  },
]);

const currentIndex = ref(0);
const itemsPerSlide = 1;
const totalSlides = Math.ceil(dishes.value.length / itemsPerSlide);

const nextSlide = () => {
  if (currentIndex.value < totalSlides - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = totalSlides - 1;
  }
};
</script>

<style scoped>
.transition-transform {
  display: flex;
  width: calc(100% * totalSlides);
}
</style>
