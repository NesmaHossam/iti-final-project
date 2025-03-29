<script setup>
import { ref } from "vue";

const reservations = ref([
  {
    id: 1,
    guestName: "Rahma Mandouh",
    status: "Pending",
    reservationDate: "18/04/2025",
    mealType: "Breakfast",
    reservationTime: "08:00 AM",
    tableSetting: "Outdoor",
    tableFor: "4 Guests",

    showCancelPopup: false,
  },
  {
    id: 2,
    guestName: "Nesma Hossam",
    status: "Completed",
    deposit: "Paid",
    reservationCode: "050501",
    reservationDate: "15/03/2025",
    mealType: "Dinner",
    reservationTime: "05:00 PM",
    tableSetting: "Indoor",
    tableFor: "4 Guests",
    selectedMeals: [
      { name: "Grilled Chicken", quantity: "4 Dishes" },
      { name: "Pink Pasta", quantity: "4 Dishes" },
      { name: "Fresh Lemon Juice", quantity: "4 Drinks" },
    ],
    showCancelPopup: false,
  },
]);
</script>

<template>
  <div class="flex gap-8">
    <USeparator
      color="primary"
      type="solid"
      orientation="vertical"
      class="h-auto hidden md:block"
    />
    <UContainer>

      <div class="flex flex-col w-full">
        <ProfileWrapper
          v-for="reservation in reservations"
          :key="reservation.id"
          class="flex flex-col rounded-lg mb-4"
        >
          <h2 class="text-xl md:text-2xl font-bold text-center">
            Reservation Summary
          </h2>
          <h4 class="text-center my-2">Guest Name</h4>
          <h3 class="text-center font-bold text-lg md:text-xl">
            {{ reservation.guestName }}
          </h3>
          <div class="my-4">
            <div class="flex justify-between items-center">
              <h2 class="font-bold md:text-lg">Status:</h2>
              <span
                :class="
                  reservation.status === 'Pending'
                    ? 'text-red-500 font-bold'
                    : 'text-green-500 font-bold'
                "
                >{{ reservation.status }}</span
              >
            </div>
  
            <div class="flex justify-between items-center">
              <h2 class="font-bold md:text-lg">Reservation Date:</h2>
              <span>{{ reservation.reservationDate }}</span>
            </div>
            <div class="flex justify-between items-center">
              <h2 class="font-bold md:text-lg">Meal Type:</h2>
              <span>{{ reservation.mealType }}</span>
            </div>
            <div class="flex justify-between items-center">
              <h2 class="font-bold md:text-lg">Reservation Time:</h2>
              <span>{{ reservation.reservationTime }}</span>
            </div>
            <div class="flex justify-between items-center">
              <h2 class="font-bold md:text-lg">Table Setting:</h2>
              <span>{{ reservation.tableSetting }}</span>
            </div>
            <div class="flex justify-between items-center">
              <h2 class="font-bold md:text-lg">Table For:</h2>
              <span>{{ reservation.tableFor }}</span>
            </div>
          </div>
  
          <button
            v-if="reservation.status === 'Pending'"
            @click="reservation.showCancelPopup = true"
            class="bg-primary text-white px-4 py-2 mt-5 rounded cursor-pointer mx-auto block"
          >
            Cancel Reservation
          </button>
  
          <div
            v-if="reservation.showCancelPopup"
            class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
          >
            <div
              class="bg-slate-200/10 backdrop-blur-md shadow-lg p-6 lg:p-12 overflow-hidden relative rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-[80%] flex flex-col items-center"
            >
              <h2 class="text-xl font-bold text-center">Reservation Summary</h2>
              <h4 class="text-center">Guest Name</h4>
              <h3 class="text-center font-bold">{{ reservation.guestName }}</h3>
              <p>
                Are you sure you want to cancel your reservation with code
                {{ reservation.reservationCode }}?
              </p>
              <div class="flex justify-end mt-4">
                <button
                  @click="reservation.showCancelPopup = false"
                  class="mr-2 px-4 py-2 bg-primary text-white rounded cursor-pointer"
                >
                  No, keep this reservation
                </button>
                <button
                  class="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                >
                  Yes, cancel this reservation
                </button>
              </div>
            </div>
          </div>
        </ProfileWrapper>
      </div>
    </UContainer>
  </div>
</template>
