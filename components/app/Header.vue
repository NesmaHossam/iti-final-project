<script setup lang="ts">
const auth = useAuth();
const isMenuOpen = ref(false);
// const user = useUserStore()
// const userId = user.userObj.user.id
// console.log(userId);

//dropdown menu
interface DropdownMenuItem {
  label: string;
  icon: string;
  to?: string;
  onSelect?: () => void;
}

const items = ref<DropdownMenuItem[]>([
  {
    label: "Profile",
    icon: "i-lucide-user",
    to: "/user/profile",
  },
  {
    label: "Logout",
    icon: "i-lucide-log-out",
    // to: '#',
    onSelect: () => {
      auth.logout();
    },
  },
]);
</script>

<template>
  <header
    v-if="!isMenuOpen"
    class="bg-primary text-playfair text-xl text-amber-50 fixed top-0 left-0 right-0 z-1 py-4"
  >
    <UContainer class="flex justify-between items-center">
      <div>
        <nuxt-link to="/">
          <img src="../../assets/images/Logo.png" alt="logo image" />
        </nuxt-link>
      </div>

      <div class="hidden md:flex gap-[40px] nav">
        <nuxt-link to="/" class="navigate relative">Home</nuxt-link>
        <nuxt-link to="/user/Tables/BookTable" class="navigate relative"
          >Reservation</nuxt-link
        >
        <nuxt-link to="/user/Menu" class="navigate relative">Menu</nuxt-link>
        <nuxt-link to="/user/OurStory" class="navigate relative"
          >Our Story</nuxt-link
        >
        <nuxt-link to="/user/ContactUs" class="navigate relative"
          >Contact Us</nuxt-link
        >
      </div>

      <div class="hidden md:block">
        <appAuthChecker>
          <template #auth>
            <!-- <nuxt-link
              to="#"
              class="underline underline-offset-4"
              @click="auth.logout"
            >
              Log Out
            </nuxt-link> -->

            <UDropdownMenu
              size="xl"
              :items="items"
              :content="{
                align: 'start',
              }"
              :ui="{
                content: 'w-48 ',
              }"
            >
              <UButton
                size="xl"
                label="UserName"
                icon="i-lucide-user"
                variant="outline"
                class="bg-white text-primary cursor-pointer hover:bg-white"
              />
            </UDropdownMenu>
          <NuxtLink to="/user/Cart"><UIcon name="i-heroicons-shopping-cart" class="w-8 h-8  ml-2" /></NuxtLink>  
          </template>
          <template #unAuth>
            <nuxt-link
              to="/auth/Login"
              class="relative text-primary bg-white px-4 py-2 border border-white rounded-2xl"
            >
              Sign in
            </nuxt-link>
          </template>
        </appAuthChecker>
      </div>

      <button
        class="md:hidden focus:outline-none"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="text-3xl">&#9776;</span>
      </button>
    </UContainer>
  </header>

  <div
    v-if="isMenuOpen"
    class="fixed top-0 left-0 h-screen w-[70%] bg-[#233866] text-white z-20"
  >
    <UContainer class="flex flex-col p-5 h-full">
      <button
        class="absolute top-4 right-6 text-3xl"
        @click="isMenuOpen = false"
      >
        &times;
      </button>

      <img
        src="../../assets/images/Logo.png"
        alt="logo image"
        class="w-[60%] md:w-[100%] max-w-[150px] mb-6"
      />

      <nuxt-link to="/" class="py-4 text-xl" @click="isMenuOpen = false"
        >Home</nuxt-link
      >
      <nuxt-link
        to="/user/Tables/BookTable"
        class="py-4 text-2xl"
        @click="isMenuOpen = false"
        >Reservation</nuxt-link
      >
      <nuxt-link
        to="/user/Menu"
        class="py-4 text-2xl"
        @click="isMenuOpen = false"
        >Menu</nuxt-link
      >
      <nuxt-link
        to="/user/OurStory"
        class="py-4 text-2xl"
        @click="isMenuOpen = false"
        >Our Story</nuxt-link
      >
      <nuxt-link
        to="/user/ContactUs"
        class="py-4 text-2xl"
        @click="isMenuOpen = false"
        >Contact Us</nuxt-link
      >

      <div class="mt-auto w-full">
        <appAuthChecker>
          <template #auth>
            <p
              class="block py-4 text-2xl underline text-center underline-offset-4"
              @click="auth.logout"
            >
              Log Out
            </p>
          </template>
          <template #unAuth>
            <nuxt-link to="/auth/Login" class="block py-4 text-2xl text-center">
              Sign in
            </nuxt-link>
          </template>
        </appAuthChecker>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.navigate::after {
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  background: #fff;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}

.navigate:hover::after {
  width: 100%;
  left: 0;
}

@media (min-width: 768px) and (max-width: 1180px) {
  .nav {
    font-size: 17px;
  }
}
</style>
