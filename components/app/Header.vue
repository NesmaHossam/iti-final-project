<script setup>
const auth = useAuth();
</script>

<template>

    <header
      class=" container mx-auto flex justify-between items-center bg-transparent text-playfair text-xl text-amber-50 fixed  top-0 left-0 right-0 z-1 pt-4"
    >
      <div>
        <nuxt-link to="/">
          <img
            src="../../assets/images/Logo.png"
            alt="logo image"
          >
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
    </header>
</template>
