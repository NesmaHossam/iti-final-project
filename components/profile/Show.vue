<script setup>
const router = useRouter();
const token = useCookie("token");
const user = reactive({});
const open = ref(false);

const goToEdit = () => {
  router.push("/user/profile/edit");
};
const deleteAccount = async () => {
  const data = await useApi("/user/deleteProfile", "DELETE");
  console.log(data);
  router.push("/auth/login");
};
onMounted(async () => {
  const data = await useApi("/user/profile", "GET");
  console.log(token.value);
  Object.assign(user, data.user); // ✅ Correctly updating reactive object
  console.log(data);
});
</script>

<template>
  <div>
    <div class="mb-6 ms-0 md:ms-14 flex justify-between">
      <h2 class="text-xl md:text-3xl font-semibold">Profile Account</h2>
      <UButton class="md:text-xl text-sm" @click="goToEdit"
        >Change Information</UButton
      >
    </div>
    <ProfileWrapper class="mb-6">
      <div
        class="flex mt-8 flex-col md:flex-row justify-between items-start md:items-center w-full"
      >
        <div class="flex flex-col gap-12">
          <div>
            <h4 class="text-xl font-bold">Email Address :</h4>
            <p>{{ user.email || "UnKnown Email" }}</p>
          </div>
          <div>
            <h4 class="text-xl font-bold">User Name :</h4>
            <p>{{ user.userName || "Unknown Name" }}</p>
          </div>
          <div>
            <h4 class="text-xl font-bold">Phone Number :</h4>
            <p>{{ user.phoneNumber || "Unknown Number" }}</p>
          </div>
        </div>
        <div
          class="flex justify-end order-first md:order-0 mb-6 md:md-0 mx-auto md:mx-0"
        >
          <img
            src="../../assets/images/Auth/login1.png"
            alt=""
            class="w-[400px] hidden md:inline-block"
          >
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
        <p class="lh-lg mb-4">
          This action is permanent and cannot be undone. You will lose access to
          all your reservations, saved preferences, and account history. If you
          proceed, all your data will be erased, and you will need to create a
          new account to use our services again. This action cannot be reversed.
          If you're sure, click "Delete My Account" below.
        </p>
        <UModal
          v-model:open="open"
          :ui="{
            content:
              'bg-slate-400/10 backdrop-blur-md shadow-md rounded-tl-[30%] rounded-br-[30%] divided-none ring-transparent ',
              overlay : 'bg-slate-100/60',
              body : 'border-0',
              header : 'border-0',
              close : 'bg-transparent text-primary'
          }"
         
        >
        <UButton
        class="md:text-xl text-sm px-4 block w-[80%] mx-auto md:mx-0 md:w-fit md:inline-block my-6"
        color="error"
        label="Open"
        > Delete my Account </UButton>

        <template #body>
          <h4 class="text-center text-3xl text-red-500">
            Are you sure about Delete this Account?
          </h4>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="delete" color="error" @click="deleteAccount"/>
    </template>
        </UModal>
      </div>
    </ProfileWrapper>
  </div>
</template>
