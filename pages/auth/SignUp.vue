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
  <div class="flex items-center justify-center p-8 relative">
    <img
      src="../../assets/images/Auth/signup1.png"
      alt="image one"
      class="absolute top-[5%] right-[22%] w-[180px]"
    >
    <div
      class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-lg w-[500px] p-8 overflow-hidden relative z-2"
    >
      <h1
        class="text-3xl mb-6 text-center font-bold cursor-default text-[#312D27]"
      >
        SIGN UP
      </h1>
      <p class="text-xl text-[#7A7161] text-center">
        Sign up now, to book your table with ease.
      </p>
      <div class="h-[30px] mb-4">
        <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 rounded text-slate-900">
          {{ errorMsg }}
        </p>
      </div>
      <UForm :state="formState" :schema="schema" @submit="signUp">
        <div class="mb-4 flex gap-12">
          <UFormGroup label="First Name" name="firstName">
            <UInput
              v-model="formState.firstName"
              placeholder="First Name"
              class="grow-1 bg-[#FCF6EB] text-[#A39782] border-[#A39782] rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-user"
                  class="w-5 h-5 text-[#A39782]"
                />
              </template>
            </UInput>
          </UFormGroup>

          <UFormGroup label="Last Name" name="lastName">
            <UInput
              v-model="formState.lastName"
              placeholder="Last Name"
              class="grow-1 bg-[#FCF6EB] text-[#A39782] border-[#A39782] rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-user"
                  class="w-5 h-5 text-[#A39782]"
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

        <div class="mb-4">
          <UFormGroup label="mobile Number Number" name="mobileNumber">
            <UInput
              v-model="formState.mobileNumber"
              placeholder="Number"
              class="w-full bg-[#FCF6EB] text-[#A39782] border-[#A39782] rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-phone"
                  class="w-5 h-5 text-[#A39782]"
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
              class="w-full bg-[#FCF6EB] text-[#A39782] border-[#A39782] rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-lock-open"
                  class="w-5 h-5 text-[#A39782]"
                />
              </template>
              <template #trailing>
                <UIcon
                  :name="
                    isPasswordVisible
                      ? 'i-heroicons-eye-off'
                      : 'i-heroicons-eye'
                  "
                  class="w-5 h-5 text-[#A39782] cursor-pointer"
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
          class="duration-300 bg-[#A39782] text-white cursor-pointer text-lg"
          block
          @click.prevent="signUp"
        >
          Sign Up
        </UButton>

        <div class="my-3 text-center flex gap-4 items-center w-full">
          <div class="flex-grow border-t border-[#A39782]" />
          <span class="text-sm text-[#A39782] cursor-default">OR</span>
          <div class="flex-grow border-t border-[#A39782]" />
        </div>

        <UButton
          class="flex items-center justify-center gap-2 duration-300 border border-[#A39782] text-[#A39782] mb-6 cursor-pointer"
          block
          @click="auth.loginWithGoogle"
        >
          <UIcon name="i-mdi-google" class="w-4 h-4 text-[#A39782]" />
          Log in With Google
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default text-[#7A7161]">
        Don't have an account?<nuxt-link
          to="/auth/Login"
          class="underline underline-offset-4 pl-1 font-semibold"
          >Login</nuxt-link
        >
      </p>
    </div>
    <img
      src="../../assets/images/Auth/signup2.png"
      alt="image two"
      class="absolute bottom-[-10%] left-[25%] w-[150px] z-0"
    >
  </div>
</template>
