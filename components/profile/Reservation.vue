<script setup>
const open = ref(false);

const reservations = ref([
  {
    id: 1,
    userName: "Rahma Mandouh",
    status: "Pending",
    reservationDate: "18/04/2025",
    mealType: "Breakfast",
    reservationTime: "08:00 AM",
    tableSetting: "Outdoor",
    tableFor: "4 Guests",
  },
  {
    id: 2,
    userName: "Nesma Hossam",
    status: "Completed",
    reservationDate: "15/03/2025",
    mealType: "Dinner",
    reservationTime: "05:00 PM",
    tableSetting: "Indoor",
    tableFor: "4 Guests",
  },
]);
</script>

<template>
  <div class="mb-6 ms-0 md:ms-14 flex justify-between">
    <h2 class="text-xl md:text-3xl font-semibold">Reservations</h2>
    <UButton class="md:text-xl text-sm"
      ><nuxt-link to="/user/tables">Reserve Table </nuxt-link></UButton
    >
  </div>

  <ProfileWrapper
    v-for="(reservation ,index) in reservations"
    :key="reservation.id"
    class="flex flex-col rounded-lg mb-4"
  >
    <h2 class="text-xl md:text-2xl font-bold text-center">
      Reservation Summary
    </h2>
    <h4 class="text-center my-2">Guest Name</h4>
    <h3 class="text-center font-bold text-lg md:text-xl">
      {{ reservation.userName || "Unknown Name" }}
    </h3>
    <div class="my-4 w-[80%]">
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Status:</h2>
        <span
          :class="
            reservation.status === 'Pending'
              ? 'text-red-500 font-bold md:text-lg'
              : 'text-green-500 font-bold md:text-lg'
          "
          >{{ reservation.status || "Unknown Status" }}</span
        >
      </div>

      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Reservation Date:</h2>
        <span class="md:text-lg">{{ reservation.reservationDate || "Unknown Date" }}</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Meal Type:</h2>
        <span class="md:text-lg">{{ reservation.mealType || "Unknown Type" }}</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Reservation Time:</h2>
        <span class="md:text-lg">{{ reservation.reservationTime || "Unknown Time" }}</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Table Setting:</h2>
        <span class="md:text-lg">{{ reservation.tableSetting || "Unknown Setting" }}</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Table For:</h2>
        <span class="md:text-lg">{{ reservation.tableFor || "Unknown For" }}</span>
      </div>
    </div>

    <UModal
      v-model:open="open"
      :ui="{
        content:
          'bg-transparent border-0 shadow-none rounded-none divided-none ring-transparent ',
      }"
    >
      <UButton
        @click="reservation.showModal = true"
        label="Open"
        color="neutral"
        variant="subtle"
        v-if="reservation.status === 'Pending'"
        class="bg-primary text-white px-4 py-2 mt-5 rounded cursor-pointer mx-auto block hover:bg-primary"
      >
        Cancel Reservation
      </UButton>

      <template #content>
        <div
          class="bg-slate-400/10 backdrop-blur-md shadow-md p-6 lg:p-12 overflow-hidden relative rounded-tl-[30%] rounded-br-[30%] border border-slate-300 w-full flex flex-col items-center"
        >
          <h2 class="text-xl md:text-2xl font-bold text-center">Reservation Summary</h2>
          <h4 class="text-center text-lg">Guest Name</h4>
          <h3 class="text-center font-bold text-xl md:text-2xl mb-2">{{ reservation.userName }}</h3>
          <p class="text-center text-xl">
            Are you sure about canceling your reservation?
          </p>

          <div class="flex justify-end mt-5 gap-4">
            <UButton
              class="mr-2 px-2 py-1 md:px-4 md:py-2 text-sm bg-primary text-white rounded cursor-pointer"
              @click="open = false"
            >
              No, keep this reservation
            </UButton>
            <UButton
              class="px-2 py-1 md:px-4 md:py-2 text-sm bg-red-500 text-white rounded cursor-pointer"
            >
              Yes, cancel this reservation
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </ProfileWrapper>
</template>
