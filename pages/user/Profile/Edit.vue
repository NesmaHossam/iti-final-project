<template>
    <UContainer class="mt-[85px] min-h-[80vh] py-8">
      <div class="flex justify-between gap-6">
        <ProfileSide class=" w-[20%]"/>
        <USeparator
          color="primary"
          type="solid"
          orientation="vertical"
          class="h-auto hidden md:block"
        />
        <ProfileEdit class="w-[80%]" />
      </div>
    </UContainer>
  </template>
