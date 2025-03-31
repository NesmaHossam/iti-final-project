<template>
  <div
    class="bg-[url('/assets/images/Home/Reviewsbg.png')] bg-contain min-h-[50vh] md:min-h-[50vh]"
  >
    <UContainer>
      <div class="flex justify-between items-center mt-[30px] md:mt-[50px]">
        <h1
          class="text-l sm:text-xl md:text-2xl lg:text-4xl font-bold text-primary cursor-default w-1/2 md:w-1/3"
        >
          Testimonials and Feedback
        </h1>
      </div>

      <div class="relative mt-8 overflow-hidden w-[100%]">
        <div
          class="flex transition-transform duration-500 ease-in-out gap-5"
          :style="{
            transform: `translateX(-${currentIndex * (100 / slidesCount)}%)`,
            width: `${(reviews.length / itemsPerSlide) * 100}%`,
          }"
        >
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="flex justify-center items-center"
            :style="{ width: `${100 / reviews.length}%` }"
          >
            <div
              class="bg-slate-200/10 backdrop-blur-md shadow-lg mb-8 md:mb-12 p-6 lg:p-12 overflow-hidden relative z-2 rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full max-w-xl flex flex-col"
            >
              <div class="flex justify-between mb-4">
                <h2
                  class="cursor-default font-bold text-[1.3rem] text-light-dark-blue"
                >
                  {{ review.userName }}
                </h2>
                <h3>
                  <img :src="review.rate" alt="star" class="w-[100px] h-[20px] inline" />
                </h3>
              </div>
              <div>
                <p class="cursor-default mb-5 text-light-dark-blue">
                  {{ review.comment }}
                </p>
              </div>
              <div class="flex justify-between">
                <h2 class="cursor-default text-[gray]">{{ review.date }}</h2>
                <h3 class="cursor-default text-[gray]">{{ review.time }}</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end items-center gap-4 pr-8 mt-4">
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import Star from "../../assets/images/Home/stars.png";

const reviews = ref([
  {
    userName: "John Doe",
    rate: Star,
    comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    date: "2023-03-24",
    time: "12:30 PM",
  },
  {
    userName: "Jane Smith",
    rate: Star,
    comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    date: "2023-03-23",
    time: "11:00 AM",
  },
  {
    userName: "Alice Johnson",
    rate: Star,
    comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    date: "2023-03-22",
    time: "10:15 AM",
  },
  {
    userName: "Alice Johnson",
    rate: Star,
    comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    date: "2023-03-22",
    time: "10:15 AM",
  },
]);

const currentIndex = ref(0);
const itemsPerSlide = ref(1);
const slidesCount = ref(1);

const updateItemsPerSlide = () => {
  const width = window.innerWidth;
  if (width < 640) {
    itemsPerSlide.value = 1;
  } else if (width < 1024) {
    itemsPerSlide.value = 2;
  } else {
    itemsPerSlide.value = 3;
  }
  slidesCount.value = Math.ceil(reviews.value.length / itemsPerSlide.value);
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slidesCount.value;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + slidesCount.value) % slidesCount.value;
};

onMounted(() => {
  updateItemsPerSlide();
  window.addEventListener("resize", updateItemsPerSlide);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateItemsPerSlide);
});
</script>
