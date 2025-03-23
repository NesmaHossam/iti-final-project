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
  <div>
      <h1 class="text-xl md:text-3xl mb-6 text-center font-bold cursor-default text-dark-blue">FORGET PASSWORD</h1>
      <p class="text-lg md:text-xl text-light-dark-blue text-center">
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

      <UForm :state="formState" :schema="schema" @submit="submitEmail"  class="px-[10%]">
        <div class="mb-4">
          <UFormGroup label="Email" name="email">
          

            <UInput
              v-model="formState.email"
              placeholder="Email"
              class="w-full text-primary border-primary rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-envelope"
                  class="w-5 h-5 text-primary"
                />
              </template>
            </UInput>
          </UFormGroup>
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-primary text-white cursor-pointer text-lg"
          block
        >Submit
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default text-light-dark-blue">
        Go back to
        <nuxt-link to="/auth/login" class="underline underline-offset-4 pl-1 font-semibold text-primary"
          >Log in</nuxt-link
        >
      </p>
  </div>
</template>
