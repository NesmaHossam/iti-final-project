<script setup>
import { z } from "zod";

definePageMeta({
  layout: false,
});
// state
const formState = reactive({
  username: undefined,
  password: undefined,
});
const rememberMe = ref(false);

// schema
const schema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(1, "Password is required"),
});

// submit function
const isLoading = ref(false);
const errorMsg = ref(null);
const auth = useAuth();
const router = useRouter();

async function login({ data }) {
  console.log("Submitting:", data);
  try {
    isLoading.value = true;
    await auth.login(data);
    router.push("/");
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
</script>

<template>
  <div class="h-screen flex items-center justify-center p-6">
    <div class="bg-gray-300 shadow-lg rounded-lg w-[500px] p-8 overflow-hidden">
      <h1 class="text-3xl mb-6 text-center font-bold">LOG IN</h1>

      <div class="h-[30px] mb-4">
        <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 rounded">
          {{ errorMsg }}
        </p>
      </div>

      <UForm :state="formState" :schema="schema" @submit="login">
        <div class="mb-4">
          <UFormGroup label="Email" name="username">
            <UInput
              v-model="formState.username"
              placeholder="Email"
              class="w-full"
            />
          </UFormGroup>
        </div>
        <div class="mb-4">
          <UFormGroup label="Password" name="password">
            <UInput
              type="password"
              v-model="formState.password"
              placeholder="Password"
              class="w-full"
            />
          </UFormGroup>
        </div>

        <div class="flex items-center justify-between mb-4">
          <label>
            <input type="checkbox" v-model="rememberMe" />
            <span class="ml-2 text-sm">Remember me</span>
          </label>
          <nuxt-link to="/auth/ForgetPassword">Forget Password?</nuxt-link>
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-gray-400 hover:bg-gray-200 cursor-pointer"
          block
        >
          Login
        </UButton>

        <div class="my-3 text-center">
          <span class="text-sm text-white cursor-default">OR</span>
        </div>

        <UButton
          @click="loginWithGoogle"
          class="duration-300 border mb-6 cursor-pointer"
          block
        >
          Log in With Google
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default">
        Don't have an account?<nuxt-link
          to="/auth/SignUp"
          class="underline underline-offset-4 pl-1"
          >Sign Up</nuxt-link
        >
      </p>
    </div>
  </div>
</template>
