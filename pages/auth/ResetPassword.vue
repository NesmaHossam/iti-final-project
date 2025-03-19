<script setup>
import { z } from "zod";
definePageMeta({
  layout: "auth",
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
const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

</script>

<template>
  <div class="h-screen flex items-center justify-center p-6 relative">
    <img
      src="../../assets/images/Auth/Resetpass1.png"
      alt="image one"
      class="absolute top-[10%] right-[18%] w-[300px]"
    />
    <div
      class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-lg w-[600px] overflow-hiddenw-[600px] p-8 relative z-2"
    >
      <h1
        class="text-3xl mb-6 text-center font-bold cursor-default text-[#312D27]"
      >
        RESET PASSWORD
      </h1>
      <p class="text-xl text-[#7A7161] text-center cursor-default">
        Thank you for your patience. You can reset your password.
      </p>
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
              v-model="formState.newPassword"
              :type="isNewPasswordVisible? 'text' : 'password'"
              placeholder="New Password"
              class="w-full bg-[#FCF6EB] text-[#A39782] border-[#A39782] rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-lock-closed"
                  class="w-5 h-5 text-[#A39782]"
                />
              </template>
              <template #trailing>
                <UIcon
                  :name="
                   isNewPasswordVisible
                      ? 'i-heroicons-eye-off'
                      : 'i-heroicons-eye'
                  "
                  class="w-5 h-5 text-[#A39782] cursor-pointer"
                  @click="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </template>
            </UInput>
          </UFormGroup>
        </div>
        <div class="mb-4">
          <UFormGroup label="Confirm New Password" name="confirmPassword">
            <UInput
              v-model="formState.confirmPassword"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              placeholder="Confirm New Password"
              class="w-full bg-[#FCF6EB] text-[#A39782] border-[#A39782] rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-lock-closed"
                  class="w-5 h-5 text-[#A39782]"
                />
              </template>
              <template #trailing>
                <UIcon
                  :name="
                    isConfirmPasswordVisible
                      ? 'i-heroicons-eye-off'
                      : 'i-heroicons-eye'
                  "
                  class="w-5 h-5 text-[#A39782] cursor-pointer"
                  @click="isConfirmPasswordVisible= !isConfirmPasswordVisible"
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
        >
          Confirm
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default text-[#7A7161]">
        Go back to
        <nuxt-link
          to="/auth/login"
          class="underline underline-offset-4 pl-1 font-semibold"
          >Log in</nuxt-link
        >
      </p>
    </div>
    <img
      src="../../assets/images/Auth/Resetpass2.png"
      alt="image two"
      class="absolute bottom-[-6%] left-[15%] w-[400px] z-0"
    />
  </div>
</template>
