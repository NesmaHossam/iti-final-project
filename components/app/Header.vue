<script setup>
const auth = useAuth();
</script>

<template>
  <header>
    <div
      class="flex justify-between items-center p-6 bg-slate-300 text-playfair text-xl"
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

      <div class="second-nav flex gap-6">
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
