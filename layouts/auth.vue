<template>
    <div class=" min-h-[100vh] flex flex-col justify-between bg-[#FEFBF7]">
     <div>
      <AppAuthHeader />
      <slot />
     </div>
      <AppAuthFooter />
    </div>
  </template>