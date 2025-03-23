<script setup>
import { ref } from 'vue';
const auth = useAuth();
const isMenuOpen = ref(false); 
</script>

<template>
  <header class=" bg-primary mx-auto flex justify-around items-center text-playfair text-xl text-amber-50 fixed top-0 left-0 right-0 z-1 py-4">
    <div>
      <nuxt-link to="/">
        <img src="../../assets/images/Logo.png" alt="logo image" />
      </nuxt-link>
    </div>

    <div class="hidden md:flex second-nav gap-[40px]">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/user/Tables/BookTable">Reservation</nuxt-link>
      <nuxt-link to="/user/Menu">Menu</nuxt-link>
      <nuxt-link to="/user/AboutUs">Our Story</nuxt-link>
      <nuxt-link to="/user/ContactUs">Contact Us</nuxt-link>
    </div>

    <div class="hidden md:block">
      <appAuthChecker>
        <template #auth>
          <nuxt-link to="#" class="underline underline-offset-4" @click="auth.logout">Log Out</nuxt-link>
        </template>
        <template #unAuth>
          <nuxt-link to="/auth/Login" class="underline underline-offset-4">Sign in</nuxt-link>
        </template>
      </appAuthChecker>
    </div>

    <!-- Dropdown button for mobile -->
    <button @click="isMenuOpen = !isMenuOpen" class="md:hidden focus:outline-none">
      <span class="text-2xl">&#9776;</span> <!-- Hamburger icon -->
    </button>
  </header>

  <!-- Dropdown menu for mobile -->
  <div v-if="isMenuOpen" class="md:hidden bg-[#233866] text-white flex flex-col p-4 absolute w-full mt-[80px]">
    <nuxt-link to="/" class="py-2">Home</nuxt-link>
    <nuxt-link to="/user/Tables/BookTable" class="py-2">Reservation</nuxt-link>
    <nuxt-link to="/user/Menu" class="py-2">Menu</nuxt-link>
    <nuxt-link to="/user/AboutUs" class="py-2">Our Story</nuxt-link>
    <nuxt-link to="/user/ContactUs" class="py-2">Contact Us</nuxt-link>
    <appAuthChecker>
      <template #auth>
        <nuxt-link to="#" class="py-2 underline underline-offset-4" @click="auth.logout">Log Out</nuxt-link>
      </template>
      <template #unAuth>
        <nuxt-link to="/auth/Login" class="py-2 underline underline-offset-4">Sign in</nuxt-link>
      </template>
    </appAuthChecker>
  </div>
</template>

<style scoped>
/* Add any additional styles here if needed */
</style>