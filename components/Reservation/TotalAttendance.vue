<script setup lang="ts">
const value = ref(3);
</script>

<template>
  <div class="flex flex-col md:flex-row items-center w-full py-8">
    <div class="px-8 md:w-[40%]">
      <div>
        <h1 class="text-2xl font-bold mb-4 text-dark-blue cursor-default">
          How <br />
          Many Guests?
        </h1>

        <p class="text-gray-500 cursor-default">
          Let us know the total number of guests joining you so we can prepare
          the perfect setup for your reservation!
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
      <h1 class="text-2xl font-bold mb-4 text-dark-blue cursor-default">
        Total Attendance
      </h1>

      <div class="mt-6 flex flex-col">
        <h2 class="font-bold text-xl">How many people?</h2>
        <p>
          We are welcoming group of people up to 10.<br />
          If you are more than that, could you please call us.
        </p>
      </div>

      <div class="mt-8">
        <UInputNumber v-model="value" />
      </div>
    </div>
  </div>
</template>
