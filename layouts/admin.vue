<template>
  <div class="flex flex-col md:flex-row justify-between">
    <appSideBar />
    <UContainer class="flex-1">
      <slot />
    </UContainer>
  </div>
</template>
