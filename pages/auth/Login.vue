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
    <div>
      <h1
        class="text-xl md:text-3xl mb-6 text-center font-bold cursor-default text-dark-blue"
      >
        SIGN IN
      </h1>
      <p class="text-lg md:text-xl text-light-dark-blue text-center">
        Zaytona’s team is ready to serve you with warmth and care.
      </p>
      <div class="h-[30px] mb-4">
        <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 rounded">
          {{ errorMsg }}
        </p>
      </div>

      <UForm :state="formState" :schema="schema" class="px-[10%]" @submit="login">
        <div class="mb-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="formState.email"
              placeholder="Email"
              class="w-full  text-primary border-primary rounded-lg"
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
          <UFormGroup label="Password" name="password">
            <UInput
              v-model="formState.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              placeholder="Password"
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

        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center justify-between">
            <input v-model="rememberMe" type="checkbox" >
            <span class="ml-2 text-sm text-primary">Remember me</span>
          </label>
          <nuxt-link to="/auth/ForgetPassword" class="text-primary underline"
            >Forget Password?</nuxt-link
          >
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-primary text-white cursor-pointer text-lg"
          block
        >
          Sign in
        </UButton>

        <div class="my-3 text-center flex gap-4 items-center w-full">
          <div class="flex-grow border-t border-primary" />
          <span class="text-sm text-primary cursor-default">OR</span>
          <div class="flex-grow border-t border-primary" />
        </div>

        <UButton
          class="flex items-center justify-center gap-2 duration-300 border border-primary text-primary mb-6 cursor-pointer"
          block
          @click="loginWithGoogle"
        >
          <UIcon name="i-mdi-google" class="w-4 h-4 text-primary" />
          Log in With Google
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default text-dark-blue">
        Don't have an account?<nuxt-link
          to="/auth/SignUp"
          class="underline underline-offset-4 pl-1 font-semibold text-primary"
          >Sign Up</nuxt-link
        >
      </p>
    </div>
</template>
