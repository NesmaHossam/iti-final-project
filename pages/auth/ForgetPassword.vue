<script setup>
import { z } from "zod";
definePageMeta({
  layout: "auth",
});

// State
const formState = reactive({
  email: undefined,
});
const isLoading = ref(false);
const errorMsg = ref(null);
const successMsg = ref(null);

// Schema
const schema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

// Auth function
const auth = useAuth();

async function submitEmail({ data }) {
  try {
    isLoading.value = true;
    await auth.requestPasswordReset(data.email);
    successMsg.value = "Reset link sent to your email!";
    errorMsg.value = null;
  } catch (error) {
    errorMsg.value = error.message || "Failed to send reset link";
    successMsg.value = null;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="h-screen flex items-center justify-center p-6 relative">
    <img
      src="../../assets/images/Auth/forgetpasss2.png"
      alt="image one"
      class="absolute top-[15%] right-[18%] w-[300px] "
    />
    <div class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-lg w-[600px] overflow-hiddenw-[600px] p-8 relative z-2">
      <h1 class="text-3xl mb-6 text-center font-bold cursor-default text-[#312D27]">FORGET PASSWORD</h1>
      <p class="text-xl text-[#7A7161] text-center cursor-default">
        No worries, we’ve got you! Reset your password easily.      </p>
      <div class="h-[30px] mb-4">
        <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 rounded">
          {{ errorMsg }}
        </p>
        <p
          v-if="successMsg"
          class="text-center p-2 text-sm bg-green-50 rounded"
        >
          {{ successMsg }}
        </p>
      </div>

      <UForm :state="formState" :schema="schema" @submit="submitEmail">
        <div class="mb-4">
          <UFormGroup label="Email" name="email">
          

            <UInput
              v-model="formState.email"
              placeholder="Email"
              class="w-full bg-[#FCF6EB] text-[#A39782] border-[#A39782] rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-envelope"
                  class="w-5 h-5 text-[#A39782]"
                />
              </template>
            </UInput>
          </UFormGroup>
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-[#A39782] text-white cursor-pointer text-lg"
          block
        >Submit
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default text-[#7A7161]">
        Go back to
        <nuxt-link to="/auth/login" class="underline underline-offset-4 pl-1 font-semibold"
          >Log in</nuxt-link
        >
      </p>
    </div>
    <img
      src="../../assets/images/Auth/forgetpasss1.png"
      alt="image two"
      class="absolute bottom-[15%] left-[18%] w-[400px] z-0"
    />
  </div>
</template>
