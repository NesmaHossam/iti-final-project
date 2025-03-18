<script setup>
import { z } from "zod";
definePageMeta({
  layout: false,
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
  <div class="h-screen flex items-center justify-center p-6 bg-gray-200">
    <div class="bg-gray-100 shadow-lg rounded-lg w-[500px] p-8">
      <h1 class="text-3xl text-center font-bold cursor-default">FORGET PASSWORD</h1>

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
              class="w-full"
            />
          </UFormGroup>
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-gray-400 hover:bg-gray-300 cursor-pointer"
          block
        >Submit
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default">
        Go back to
        <nuxt-link to="/auth/login" class="underline font-bold"
          >Log in</nuxt-link
        >
      </p>
    </div>
  </div>
</template>
