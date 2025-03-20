<script setup>
const auth = useAuth();
</script>

<template>
  <header>
    <div
      class="flex justify-around items-center p-6 bg-transparent fixed top-0 w-[100%] text-playfair text-xl text-amber-50 z-1"
    >
      <div>
        <nuxt-link to="/">
          <img
            src="../../assets/images/Logo.png"
            alt="logo image"
            class="h-[80px]"
          />
        </nuxt-link>
      </div>

      <div class="second-nav flex gap-[40px]">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/user/Tables/BookTable">Reservation</nuxt-link>
        <nuxt-link to="/user/Menu">Menu</nuxt-link>
        <nuxt-link to="/user/AboutUs">Our Stroy</nuxt-link>

        <nuxt-link to="/user/ContactUs">Contact Us</nuxt-link>
      </div>

      <div>
        <appAuthChecker>
          <template #auth>
            <nuxt-link
              to="#"
              class="underline underline-offset-4"
              @click="auth.logout"
              >Log Out</nuxt-link
            >
          </template>
          <template #unAuth>
            <nuxt-link to="/auth/Login" class="underline underline-offset-4"
              >Sign in</nuxt-link
            >
          </template>
        </appAuthChecker>
      </div>
    </div>
  </header>
</template>
