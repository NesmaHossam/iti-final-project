<template>
    <div class="flex flex-col md:flex-row items-center w-full py-8">
    <div class="px-8 md:w-[40%]">
      <div>
        <h1 class="text-2xl font-bold mb-4 text-dark-blue cursor-default">
          Choose Your <br>
          Dining Experience
        </h1>

        <p class="text-gray-500 cursor-default">
          Start your reservation by choosing your meal—whether a hearty
          breakfast or a delicious lunch, we've got you covered!
        </p>
      </div>
      <div class="mt-7">
        <h3 class="font-bold cursor-default">Need help?</h3>
        <h4>Call +20 100 506 6611</h4>
      </div>
    </div>
    <USeparator
          color="primary"
          type="solid"
          orientation="vertical"
          class="h-48 hidden md:block"
        />
    <div class="px-8 md:w-[60%]">
  <h1 class="text-2xl font-bold mb-4 text-dark-blue cursor-default">Meal Type</h1>

  <div class="mt-6 flex flex-col gap-4">
    <div
      class="flex items-center cursor-pointer"
      @click="selectMealType('breakfast')"
    >
      <img src="/assets/images/Reservation/img1.png" class="w-30 " />
      <div class="text-white  bg-primary rounded-tr-[15%]  p-4 w-full">
        <h2>Breakfast</h2>
        <h3>08:00 AM - 11:30 AM</h3>
      </div>
    </div>

    <div
      class="flex items-center cursor-pointer"
      @click="selectMealType('dinner')"
    >
      <img src="/assets/images/Reservation/img2.png" class="w-30" />
      <div class="text-white bg-primary rounded-tr-[15%]  p-4 w-full">
        <h2>Dinner</h2>
        <h3>12:00 PM - 12:00 AM</h3>
      </div>
    </div>
  </div>
</div>
  </div>
  </template>
  
  <script setup>
  defineProps({
    formData: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['update-data']);
  
  function selectMealType(type) {
    emit('update-data', 'mealType', type);
  }
  </script>