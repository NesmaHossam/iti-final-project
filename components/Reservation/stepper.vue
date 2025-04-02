<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const items = ref<StepperItem[]>([
  {
    title: 'Meal Type',
    description: 'Choose your reservation type',
    icon: 'i-lucide-utensils'
  },
  {
    title: 'Total Attendance',
    description: 'How many guests will be attending?',
    icon: 'i-lucide-users',
   
  },
  {
    title: 'Date and Time',
    description: 'Choose booking date and time',
    icon: 'i-lucide-calendar'
  },
  {
    title: 'Reservation Information',
    description: 'Provide reservation details?',
    icon: 'i-lucide-bookmark'
  }

  ,
  {
    title: 'Cart',
    description: 'Cart check out and total cast',
    icon: 'i-lucide-shopping-cart'
  },
  
  {
    title: 'Payment',
    description: 'Confirm payment method and checkout',
    icon: 'i-lucide-credit-card'
  },
])
</script>

<template>
  <UStepper color="neutral" :items="items" class="w-full  mt-[12%]" />
</template>
