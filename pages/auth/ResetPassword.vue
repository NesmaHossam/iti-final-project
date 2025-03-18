<script setup>
import { z } from "zod";
definePageMeta({
  layout: false,
});

// State
const formState = reactive({
  newPassword: undefined,
  confirmPassword: undefined,
});
const isLoading = ref(false);
const errorMsg = ref(null);
const successMsg = ref(null);

// Schema
const schema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().trim().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

// Auth function
const auth = useAuth();

async function resetPassword({ data }) {
  try {
    isLoading.value = true;
    await auth.resetPassword(data.newPassword); 
    successMsg.value = "Password has been successfully reset!";
    errorMsg.value = null;
  } catch (error) {
    errorMsg.value = error.message || "Failed to reset password";
    successMsg.value = null;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="h-screen flex items-center justify-center p-6 bg-gray-300">
    <div class="bg-gray-100 shadow-lg rounded-lg w-[500px] p-8">
      <h1 class="text-3xl mb-6 text-center font-bold cursor-default">RESET PASSWORD</h1>

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

      <UForm :state="formState" :schema="schema" @submit="resetPassword">
        <div class="mb-4">
          <UFormGroup label="New Password" name="newPassword">
            <UInput
              type="password"
              v-model="formState.newPassword"
              placeholder="New Password"
              class="w-full"
            />
          </UFormGroup>
        </div>
        <div class="mb-4">
          <UFormGroup label="Confirm New Password" name="confirmPassword">
            <UInput
              type="password"
              v-model="formState.confirmPassword"
              placeholder="Confirm New Password"
              class="w-full"
            />
          </UFormGroup>
        </div>

        <UButton
        :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-gray-400 hover:bg-gray-200 cursor-pointer"
          block
        >
          Confirm
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default">
        Go back to
        <nuxt-link to="/auth/login" class="underline font-bold">Log in</nuxt-link>
      </p>
    </div>
  </div>
</template>
