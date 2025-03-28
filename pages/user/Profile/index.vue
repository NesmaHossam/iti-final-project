    <script setup >

    const items = ref([
      {
        title: 'Profile Account',
        icon: 'i-lucide-user',
        slot: 'profile'
      },
      {
        title: 'Reservation',
        icon: 'i-lucide-calendar',
        slot : 'reservation'
      }
    ])
    
    const display = ref(true)
    </script>

<template>
  <UContainer class="mt-[85px] min-h-[80vh] py-8">
      <div>
    <UStepper orientation="vertical" :items="items" class="w-full me-0 md:me-12 " :ui="{root:'flex-col items-start md:flex-row' ,wrapper: 'space-y-12',header:'justify-center flex-row md:flex-col w-full md:w-fit' , separator:'hidden md:block',item:'last:justify-end'}">
      <template #profile>
        <div>
          <div class="mb-6 ms-0 md:ms-14 flex justify-between">
          <h2 class="text-xl md:text-3xl font-semibold">{{display ?'Profile Account' : 'Edit Profile'}}</h2>
          <UButton class="text-xl" @click="display=!display">{{display ?'Change Information' : 'Cancel'}}</UButton>
        </div>
          <ProfileShow v-if="display"/>
            <ProfileEdit v-else/>
        </div>
      </template>
      <template #reservation>
        <ProfileWrapper>
          <ProfileReservation/>
        </ProfileWrapper>
      </template>
    </UStepper>
  </div>
  </UContainer>
</template>
