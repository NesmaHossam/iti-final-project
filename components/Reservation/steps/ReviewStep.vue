<template>
    <div>
      <h2 class="text-2xl font-bold mb-6">Review Your Reservation</h2>
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-medium">Reservation Details</h3>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {{ formData.mealType === 'breakfast' ? 'Breakfast' : 'Dinner' }}
          </span>
        </div>
  
        <!-- Content -->
        <div class="px-6 py-4 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-500">Date</p>
              <p class="font-medium">{{ formData.date ? formatDate(formData.date) : 'Not selected' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Time</p>
              <p class="font-medium">{{ formData.time || 'Not selected' }}</p>
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
                <svg v-if="formData.paymentMethod === 'creditCard'" class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                <svg v-else class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {{ formData.paymentMethod === 'creditCard' ? 'Credit Card' : 'Cash' }}
              </p>
            </div>
          </div>
        </div>
  
        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            Please confirm your reservation details above. By submitting, you agree to our terms and conditions.
          </p>
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
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  </script>