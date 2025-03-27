<script setup>
import { z } from "zod";
definePageMeta({
  layout: "auth",
});

const router = useRouter();

const formState = reactive({
  otp: Array(6).fill(""),
  password: "",
  confirmPassword: "",
});
const isLoading = ref(false);
const errorMsg = ref(null);
const successMsg = ref(null);

// Schema Validation
const schema = z
  .object({
    otp: z
      .array(z.string().min(1, "Required").regex(/^\d$/, "Must be a digit"))
      .length(6, "OTP must be 6 digits"),
    password: z
      .string().trim().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string().trim().min(1, "Confirm Password is required"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const auth = useAuth();
const user = useUserStore();
const { userEmail } = storeToRefs(user);

if (!userEmail.value) {
  errorMsg.value = "Email is missing. Please go back to the previous step.";
}

async function resetPassword() {
  try {
    isLoading.value = true;
    errorMsg.value = null;
    
    await schema.parseAsync(formState);
    
    await auth.resetPassword(
      userEmail.value,
      formState.otp.join(""),
      formState.password,
      formState.confirmPassword
    );
    
    successMsg.value = "Password has been successfully reset!";
    setTimeout(() => {
      router.push('/auth/login');
    }, 1500);
  } catch (error) {
    if (error instanceof z.ZodError) {
      errorMsg.value = error.errors[0].message;
    } else {
      errorMsg.value = error.message || "Failed to reset password";
    }
    successMsg.value = null;
  } finally {
    isLoading.value = false;
  }
}

const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
</script>

<template>
  <div>
    <h1 class="text-xl md:text-3xl mb-6 text-center font-bold text-dark-blue">
      RESET PASSWORD
    </h1>
    <p class="text-lg md:text-xl text-light-dark-blue text-center">
      Enter the OTP sent to your email and set your new password.
    </p>

    <div class="h-[30px] mb-4">
      <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 text-red-600 rounded">
        {{ errorMsg }}
      </p>
      <p v-if="successMsg" class="text-center p-2 text-sm bg-green-50 text-green-600 rounded">
        {{ successMsg }}
      </p>
    </div>

    <UForm :state="formState" :schema="schema" @submit="resetPassword">
      <div class="my-4 flex justify-center">
        <UPinInput 
          v-model="formState.otp" 
          :length="6"
          type="number"
          class="gap-4 bg-transparent"
          variant="outline"
          size="xl"
          :disabled="!userEmail"
        />
      </div>

      <div class="mb-4">
        <UFormGroup label="New Password" name="password">
          <UInput
            v-model="formState.password"
            :type="isNewPasswordVisible ? 'text' : 'password'"
            placeholder="New Password"
            class="w-full text-primary border-primary rounded-lg"
            :disabled="!userEmail"
          >
            <template #leading>
              <UIcon name="i-heroicons-lock-closed" class="w-5 h-5 text-primary" />
            </template>
            <template #trailing>
              <UIcon
                :name="isNewPasswordVisible ? 'i-heroicons-eye-off' : 'i-heroicons-eye'"
                class="w-5 h-5 text-primary cursor-pointer"
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
            class="w-full text-primary border-primary rounded-lg"
            :disabled="!userEmail"
          >
            <template #leading>
              <UIcon name="i-heroicons-lock-closed" class="w-5 h-5 text-primary" />
            </template>
            <template #trailing>
              <UIcon
                :name="isConfirmPasswordVisible ? 'i-heroicons-eye-off' : 'i-heroicons-eye'"
                class="w-5 h-5 text-primary cursor-pointer"
                @click="isConfirmPasswordVisible = !isConfirmPasswordVisible"
              />
            </template>
          </UInput>
        </UFormGroup>
      </div>

      <UButton
        :loading="isLoading"
        type="submit"
        color="white"
        class="duration-300 bg-primary text-white text-lg hover:bg-primary-dark"
        block
        :disabled="!userEmail"
      >
        {{ isLoading ? 'Processing...' : 'Reset Password' }}
      </UButton>
    </UForm>

    <p class="mt-4 text-center text-sm text-dark-blue">
      Go back to
      <nuxt-link
        to="/auth/login"
        class="underline underline-offset-4 pl-1 font-semibold text-primary hover:text-primary-dark"
      >
        Log in
      </nuxt-link>
    </p>
  </div>
</template>