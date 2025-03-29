<script setup>
import profileImg from "../assets/images/profile.jpg";
const user = reactive({
  email: "",
  name: "",
  phone: "",
  password: "",
  image: profileImg,
});
</script>

<template>
  <div>
    <div class="mb-6 ms-0 md:ms-14 flex justify-between">
          <h2 class="text-xl md:text-3xl font-semibold">Profile Account</h2>
          <UButton class="text-xl" @click="display=!display">Change Information</UButton>
        </div>
    <ProfileWrapper class="mb-6">
      <div
        class="flex mt-8 flex-col md:flex-row justify-between items-start md:items-center w-full"
      >
        <div class="flex flex-col gap-12">
          <div>
            <h4 class="text-xl font-bold">Email Address :</h4>
            <p>{{ user.email || "mostafanegm@gmail.com" }}</p>
          </div>
          <div>
            <h4 class="text-xl font-bold">User Name :</h4>
            <p>{{ user.name || "Mostafa Negm" }}</p>
          </div>
          <div>
            <h4 class="text-xl font-bold">Phone Number :</h4>
            <p>{{ user.phone || "+201152184250" }}</p>
          </div>
          <div>
            <h4 class="text-xl font-bold">Password :</h4>
            <p>{{ user.password || "password" }}</p>
          </div>
        </div>
        <div
          class="flex justify-end order-first md:order-0 mb-6 md:md-0 mx-auto md:mx-0"
        >
          <AppImage>
            <img
              v-if="user.image"
              :src="user.image"
              alt="profile image"
              class="h-[300px] rounded-tl-[30%] rounded-br-[30%]"
            >
          </AppImage>
        </div>
      </div>
    </ProfileWrapper>
    <div class="mb-6 ms-0 md:ms-14">
      <h2 class="text-xl md:text-3xl font-semibold">Delete Account</h2>
    </div>
    <ProfileWrapper>
      <div>
        <h4 class="text-xl font-bold my-6">
          Are you sure you want to delete your account?
        </h4>
        <p class=" lh-lg mb-4">
          This action is permanent and cannot be undone. You will lose access to
          all your reservations, saved preferences, and account history. If you
          proceed, all your data will be erased, and you will need to create a
          new account to use our services again. This action cannot be reversed.
          If you're sure, click "Delete My Account" below.
        </p>
        <UButton class="text-xl px-4 block w-full md:w-fit md:inline-block mb-6" color="error">Delete my Account</UButton>
      </div>
    </ProfileWrapper>
  </div>
</template>
