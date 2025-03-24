<template>
  <div class="bg-[url('/assets/images/Home/Reviewsbg.png')] bg-contain min-h-[50vh] md:min-h-[50vh]">
    <UContainer>
      <div class="flex justify-between items-center mt-[30px] md:mt-[50px]">
        <h1 class="text-l sm:text-xl md:text-4xl font-bold text-primary cursor-default w-1/2 md:w-1/3">
          Testimonials and Feedback
        </h1>
      </div>

      <div class="relative mt-8">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out gap-5"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(review, index) in reviews"
              :key="index"
              class="flex justify-center items-center w-full"
            >
              <div
                class="bg-slate-200/10 backdrop-blur-md shadow-lg mb-8 md:mb-12 p-6 lg:p-12 overflow-hidden relative z-2 rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full max-w-xl flex flex-col"
              >
                <div class="flex justify-between">
                  <h2>{{ review.userName }}</h2>
                  <h3>{{ review.rate }}</h3>
                </div>
                <div>
                  <p>{{ review.comment }}</p>
                </div>
                <div class="flex justify-between">
                  <h2>{{ review.date }}</h2>
                  <h3>{{ review.time }}</h3>
                </div>
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
    </UContainer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const reviews = ref([
  {
    userName: "John Doe",
    rate: "5 Stars",
    comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    date: "2023-03-24",
    time: "12:30 PM",
  },
  {
    userName: "Jane Smith",
    rate: "4 Stars",
    comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    date: "2023-03-23",
    time: "11:00 AM",
  },
  {
    userName: "Alice Johnson",
    rate: "5 Stars",
    comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    date: "2023-03-22",
    time: "10:15 AM",
  },
]);

const currentIndex = ref(0);
const itemsPerSlide = 1; 
const totalSlides = Math.ceil(reviews.value.length / itemsPerSlide);

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
  width: 100%; 
}

.shrink-0 {
  flex-shrink: 0;
}
</style>