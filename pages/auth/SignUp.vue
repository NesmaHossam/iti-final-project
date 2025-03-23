<script setup>
import { z } from "zod";
const auth = useAuth()
definePageMeta({
  layout: "auth",
});

// state
const formState = reactive({
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  password: "",
  confirmPassword: "",
});

// schema
const schema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email format"),
    mobileNumber: z
      .string()
      .min(10, "mobile Number number must be at least 10 digits")
      .max(15, "mobile Number number too long"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// submit function
const isLoading = ref(false);
const errorMsg = ref(null);
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const user = useUserStore()
const router = useRouter()
async function signUp() {
  try {
    isLoading.value = true;
    errorMsg.value = null;
    
    const result = schema.safeParse(formState);
    if (!result.success) {
      errorMsg.value = result.error.errors.map(e => e.message).join("\n");
      return;
    }
    console.log("Form submitted successfully", formState);
    await auth.signup(formState)
    user.setEmail(formState.email)
    router.push('/auth/OTP');
  } catch (error) {
    console.error("Signup error:", error);
    errorMsg.value = error.message || "An unexpected error occurred";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
    <div>
      <h1
        class="text-xl md:text-3xl mb-6 text-center font-bold cursor-default text-dark-blue">
        SIGN UP
      </h1>
      <p class="text-lg md:text-xl text-light-dark-blue text-center">
        Sign up now, to book your table with ease.
      </p>
      <div class="h-[30px] mb-4">
        <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 rounded text-slate-900">
          {{ errorMsg }}
        </p>
      </div>
      <UForm :state="formState" :schema="schema" @submit="signUp">
        <div class="mb-4 flex flex-col lg:gap-8 gap-4 md:flex-row justify-between">
          <UFormGroup label="First Name" name="firstName" class="grow-1 flex">
            <UInput
              v-model="formState.firstName"
              placeholder="First Name"
              class=" text-primary border-primary rounded-lg grow-1"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-user"
                  class="w-5 h-5 text-primary"
                />
              </template>
            </UInput>
          </UFormGroup>

          <UFormGroup label="Last Name" name="lastName" class="grow-1 flex">
            <UInput
              v-model="formState.lastName"
              placeholder="Last Name"
              class="grow-1 text-primary border-primary rounded-lg grow-1"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-user"
                  class="w-5 h-5 text-primary"
                />
              </template>
            </UInput>
          </UFormGroup>
        </div>

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

        <div class="mb-4">
          <UFormGroup label="mobile Number Number" name="mobileNumber">
            <UInput
              v-model="formState.mobileNumber"
              placeholder="Number"
              class="w-full  text-primary border-primary rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-phone"
                  class="w-5 h-5 text-primary"
                />
              </template>
            </UInput>
          </UFormGroup>
        </div>

        <div class="mb-4">
          <UFormGroup label="Password" name="password">
            <UInput
              v-model="formState.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              placeholder="Password"
              class="w-full text-primary border-primary rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-lock-open"
                  class="w-5 h-5 text-primary"
                />
              </template>
              <template #trailing>
                <UIcon
                  :name="
                    isPasswordVisible
                      ? 'i-heroicons-eye-off'
                      : 'i-heroicons-eye'
                  "
                  class="w-5 h-5 text-primary cursor-pointer"
                  @click="isPasswordVisible = !isPasswordVisible"
                />
              </template>
            </UInput>
          </UFormGroup>
        </div>

        <div class="mb-4">
          <UFormGroup label="Confirm Password" name="confirmPassword">
            <UInput
              v-model="formState.confirmPassword"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              placeholder="Confirm Password"
              class="w-full text-primary border-primary rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-lock-closed"
                  class="w-5 h-5 text-primary"
                />
              </template>
              <template #trailing>
                <UIcon
                  :name="
                    isConfirmPasswordVisible
                      ? 'i-heroicons-eye-off'
                      : 'i-heroicons-eye'
                  "
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
          class="duration-300 bg-primary text-white cursor-pointer text-lg"
          block
          @click.prevent="signUp"
        >
          Sign Up
        </UButton>

        <div class="my-3 text-center flex gap-4 items-center w-full">
          <div class="flex-grow border-t border-primary" />
          <span class="text-sm text-primary cursor-default">OR</span>
          <div class="flex-grow border-t border-primary" />
        </div>

        <UButton
          class="flex items-center justify-center gap-2 duration-300 border border-primary text-primary mb-6 cursor-pointer"
          block
          @click="auth.loginWithGoogle"
        >
          <UIcon name="i-mdi-google" class="w-4 h-4 text-primary" />
          Log in With Google
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default text-dark-blue">
        Don't have an account?<nuxt-link
          to="/auth/Login"
          class="underline underline-offset-4 pl-1 font-semibold text-primary"
          >Login</nuxt-link
        >
      </p>
    </div>
</template>
