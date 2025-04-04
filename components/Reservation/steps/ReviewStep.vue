<template>
  <div class="px-8 flex flex-col   py-6">

 
  <div class="px-8 flex flex-col my-8">
    <h2 class="text-2xl  font-bold ">Food Cart</h2>
    <div v-if="!formData.cart?.items || formData.cart.items.length === 0" class="flex flex-col items-center justify-center text-center">
      <img
        src="/assets/images/emptyCart.png"
        alt="Empty Cart"
        class="w-64 mb-4"
      >
      <p class="text-lg font-semibold">Your cart is empty</p>
      <p class="text-gray-500">but it does not have to be.</p>
    </div>

    <div v-else class="bg-gray-50 p-4 rounded-lg">
            <div class="space-y-2">
              <div v-for="(item, index) in formData.cart.items" :key="index" class="flex justify-between">
                <p>{{ item.quantity }}x {{ item.title }}</p>
                <p>${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
              <div class="border-t border-gray-200 pt-2 mt-2 font-bold flex justify-between">
                <p>Total</p>
                <p>${{ calculateTotal().toFixed(2) }}</p>
              </div>
            </div>
          </div>
  </div>
  <div class="mt-4">
    <h2 class="text-2xl font-bold mb-6 cursor-default">Review Your Reservation</h2>
    <div
      class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
    >
      <!-- Header -->
      <div
        class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
      >
        <h3 class="text-lg font-medium">Reservation Details</h3>
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
        >
          {{ formData.mealType === "breakfast" ? "Breakfast" : "Dinner" }}
        </span>
      </div>

      <!-- Content -->
      <div class="px-6 py-4 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm text-gray-500">Date</p>
            <p class="font-medium">
              {{ formData.date ? formatDate(formData.date) : "Not selected" }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Time</p>
            <p class="font-medium">{{ formData.time || "Not selected" }}</p>
          </div>
        </div>

        <hr class="border-t border-gray-200" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm text-gray-500">Number of Guests</p>
            <p class="font-medium">{{ formData.guests }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Payment Method</p>
            <p class="font-medium flex items-center">
              <svg
                v-if="formData.paymentMethod === 'creditCard'"
                class="w-5 h-5 mr-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5 mr-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {{
                formData.paymentMethod === "creditCard" ? "Credit Card" : "Cash"
              }}
            </p>
          </div>
        </div>

        <hr class="border-t border-gray-200" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm text-gray-500">Name</p>
            <p class="font-medium">
              {{ formData.info?.name || "Not provided" }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Phone Number</p>
            <p class="font-medium">
              {{ formData.info?.phone || "Not provided" }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mt-4">
            <p class="text-sm text-gray-500">Message</p>
            <p class="font-medium">
              {{ formData.info?.message || "No message" }}
            </p>
          </div>

          <div class="mt-4">
            <p class="text-sm text-gray-500">Seating Preference</p>
            <p class="font-medium">
              {{ formData.info?.preference || "No preference" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p class="text-sm text-gray-600">
          Please confirm your reservation details above. By submitting, you
          agree to our terms and conditions.
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function calculateTotal() {
  if (!props.formData.cart?.items) return 0;
  return props.formData.cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}
</script>
