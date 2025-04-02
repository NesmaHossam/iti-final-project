<!-- <script setup lang="ts">
import { CalendarDate } from "@internationalized/date";

const value = ref(new CalendarDate(2022, 2, 3));
</script>

<template>
  <div class="flex flex-col md:flex-row items-center w-full py-8">
    <div class="px-8 md:w-[40%]">
      <div>
        <h1 class="text-2xl font-bold mb-4 text-dark-blue cursor-default">
          Select <br />
          Date and Time
        </h1>

        <p class="text-gray-500 cursor-default">
          Please select date and time for your appointment.
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
        Date and Time
      </h1>

      <div class="mt-6 flex flex-col">
        <UCalendar v-model="value" />
      </div>
    </div>
  </div>
</template> -->
