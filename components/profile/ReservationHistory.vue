<script setup>
const open = ref(false);
const reservations = ref([]);

onMounted(async () => {
  try {
    const response = await useApi('/checkOut/getCheckOut', "get");
    console.log(response.results);
    
    if (response?.success && response?.results) {
      reservations.value = response.results.map(res => ({
        ...res,
        // Format status for display
        status: res.status?.charAt(0).toUpperCase() + res.status?.slice(1) || 'Pending',
        // Format mealType for display
        mealType: res.mealType?.charAt(0).toUpperCase() + res.mealType?.slice(1) || 'Unknown'
      }));
    }
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
});

const cancelReservation = async (reservationId) => {
  try {
    // Call your API to cancel the reservation
    const response = await useApi(`/checkOut/${reservationId}/cancel`, 'patch');
    if (response?.success) {
      // Update local state
      const index = reservations.value.findIndex(r => r._id === reservationId);
      if (index !== -1) {
        reservations.value[index].status = 'Cancelled';
      }
      open.value = false;
    }
  } catch (error) {
    console.error('Error cancelling reservation:', error);
  }
};
</script>

<template>
  <div class="mb-6 ms-0 md:ms-14 flex justify-between">
    <h2 class="text-xl md:text-3xl font-semibold">Reservations</h2>
    <UButton class="md:text-xl text-sm">
      <nuxt-link to="/user/tables">Reserve Table</nuxt-link>
    </UButton>
  </div>

  <div v-if="reservations.length === 0" class="text-center py-8">
    <p class="text-lg">You don't have any reservations yet.</p>
  </div>

  <ProfileWrapper
    v-for="reservation in reservations"
    :key="reservation._id"
    class="flex flex-col rounded-lg mb-4"
  >
    <h2 class="text-xl md:text-2xl font-bold text-center">
      Reservation Summary
    </h2>
    <h4 class="text-center my-2">Guest Name</h4>
    <h3 class="text-center font-bold text-lg md:text-xl">
      {{ reservation.info?.name || "Unknown Name" }}
    </h3>
    <div class="my-4 w-[80%] mx-auto">
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Status:</h2>
        <span
          :class="{
            'text-yellow-500': reservation.status === 'Pending',
            'text-green-500': reservation.status === 'Confirmed',
            'text-red-500': reservation.status === 'Cancelled',
            'font-bold md:text-lg': true
          }"
        >
          {{ reservation.status || "Unknown Status" }}
        </span>
      </div>

      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Reservation Date:</h2>
        <span class="md:text-lg">
          {{ `${reservation.date?.day || '--'}/${reservation.date?.month || '--'}/${reservation.date?.year || '--'}` }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Meal Type:</h2>
        <span class="md:text-lg">{{ reservation.mealType || "Unknown Type" }}</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Reservation Time:</h2>
        <span class="md:text-lg">{{ reservation.time || "Unknown Time" }}</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Table Setting:</h2>
        <span class="md:text-lg">{{ reservation.info?.preference || "Standard" }}</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="font-bold md:text-lg">Table For:</h2>
        <span class="md:text-lg">
          {{ reservation.guests > 1 ? `${reservation.guests} Guests` : '1 Guest' }}
        </span>
      </div>
    </div>

    <!-- <UButton
      v-if="reservation.status === 'Pending'"
      class="bg-primary text-white px-4 py-2 mt-5 rounded cursor-pointer mx-auto block hover:bg-primary"
      @click="open = true"
    >
      Cancel Reservation
    </UButton>

    <UModal v-model="open">
      <div class="bg-slate-400/10 backdrop-blur-md shadow-md p-6 lg:p-12 overflow-hidden relative rounded-tl-[30%] rounded-br-[30%] border border-slate-300 w-full flex flex-col items-center">
        <h2 class="text-xl md:text-2xl font-bold text-center">Reservation Summary</h2>
        <h4 class="text-center text-lg">Guest Name</h4>
        <h3 class="text-center font-bold text-xl md:text-2xl mb-2">
          {{ reservation.info?.name || "Unknown Name" }}
        </h3>
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
            @click="cancelReservation(reservation._id)"
          >
            Yes, cancel this reservation
          </UButton>
        </div>
      </div>
    </UModal> -->



    <UModal
      v-model:open="open"
      :ui="{
        content:
          'bg-transparent border-0 shadow-none rounded-none divided-none ring-transparent ',
      }"
    >
      <UButton
        v-if="reservation.status === 'Pending'"
        class="bg-primary text-white px-4 py-2 mt-5 rounded cursor-pointer mx-auto block hover:bg-primary"
        label="Open"
        color="neutral"
        variant="subtle"
        @click="reservation.showModal = true"
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
              @click="cancelReservation(reservation.id)"
            >
              Yes, cancel this reservation
            </UButton>
          </div>
        </div>
      </template>
    </UModal>



  </ProfileWrapper>
</template>