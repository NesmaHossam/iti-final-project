<script setup>
import { z } from "zod";

definePageMeta({
  layout: "auth",
});
// state
const formState = reactive({
  email: "",
  password: "",
});
const rememberMe = ref(false);

// schema
const schema = z.object({
  email: z.string().trim().min(1, "email is required"),
  password: z.string().trim().min(1, "Password is required"),
});

// submit function
const isLoading = ref(false);
const errorMsg = ref(null);
const auth = useAuth();

async function login() {
  console.log("Submitting:", formState);
  try {
    isLoading.value = true;
    await auth.login(formState);
  } catch (error) {
    if (error.message.includes("Invalid credentials")) {
      errorMsg.value = "Invalid username or password. Please try again.";
    } else {
      errorMsg.value = "An unexpected error occurred. Please try again.";
    }
    console.log("Login error:", error);
  } finally {
    isLoading.value = false;
  }
}

const isPasswordVisible = ref(false);
</script>

<template>
  <div class="flex items-center justify-center p-8 relative">
    <img
      src="../../assets/images/Auth/login1.png"
      alt="image one"
      class="absolute top-[-10%] right-[17%]"
    />
    <div
      class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-lg w-[500px] p-8 overflow-hidden relative z-2"
    >
      <h1
        class="text-3xl mb-6 text-center font-bold cursor-default text-[#312D27]"
      >
        SIGN IN
      </h1>
      <p class="text-xl text-[#7A7161] text-center">
        Zaytona’s team is ready to serve you with warmth and care.
      </p>
      <div class="h-[30px] mb-4">
        <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 rounded">
          {{ errorMsg }}
        </p>
      </div>

      <UForm :state="formState" :schema="schema" @submit="login">
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
          <UFormGroup label="Password" name="password">
            <UInput
              v-model="formState.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              placeholder="Password"
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

        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center justify-between">
            <input v-model="rememberMe" type="checkbox" />
            <span class="ml-2 text-sm text-[#A39782]">Remember me</span>
          </label>
          <nuxt-link to="/auth/ForgetPassword" class="text-[#A39782] underline"
            >Forget Password?</nuxt-link
          >
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-[#A39782] text-white cursor-pointer text-lg"
          block
        >
          Sign in
        </UButton>

        <div class="my-3 text-center flex gap-4 items-center w-full">
          <div class="flex-grow border-t border-[#A39782]" />
          <span class="text-sm text-[#A39782] cursor-default">OR</span>
          <div class="flex-grow border-t border-[#A39782]" />
        </div>

        <UButton
          class="flex items-center justify-center gap-2 duration-300 border border-[#A39782] text-[#A39782] mb-6 cursor-pointer"
          block
          @click="loginWithGoogle"
        >
          <UIcon name="i-mdi-google" class="w-4 h-4 text-[#A39782]" />
          Log in With Google
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default text-[#7A7161]">
        Don't have an account?<nuxt-link
          to="/auth/SignUp"
          class="underline underline-offset-4 pl-1 font-semibold"
          >Sign Up</nuxt-link
        >
      </p>
    </div>
    <img
      src="../../assets/images/Auth/login2.png"
      alt="image two"
      class="absolute bottom-[-10%] left-[25%] w-[150px] z-0"
    />
  </div>
</template>
