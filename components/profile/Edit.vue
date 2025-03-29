<script setup>
import { z } from "zod";
// state
const formState = reactive({
  userName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
});

// schema
const schema = z
  .object({
    userName: z.string().min(1, "User Name is required"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z
      .string()
      .min(10, "mobile Number number must be at least 10 digits")
      .max(15, "mobile Number number too long"),
    password: z
      .string()
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        "the password must 8-16 chars, A-Z, a-z, 0-9, special char, no spaces"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// submit function
const errorMsg = reactive({
  userName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
});
const errMsg = ref("");
const isLoading = ref(false);
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const user = useUserStore();
const router = useRouter();

async function signUp() {
  try {
    isLoading.value = true;
    Object.keys(errorMsg).forEach((key) => (errorMsg[key] = null));
    errMsg.value = null;

    const result = schema.safeParse(formState);
    if (!result.success) {
      result.error.errors.forEach((e) => {
        errorMsg[e.path[0]] = e.message;
      });
      return;
    }
    user.setEmail(formState.email);
    await auth.signup(formState);
    console.log("Email before redirect:", user.userEmail);
    router.push("/auth/OTP");
  } catch (error) {
    console.error("Signup error:", error);
    errMsg.value = error.message || "An unexpected error occurred";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="w-full">
    <div class="mb-6 ms-0 md:ms-14 flex justify-between">
          <h2 class="text-xl md:text-3xl font-semibold">Edit Profile</h2>
          <UButton class="text-xl" @click="display=!display">Save</UButton>
        </div>
    <ProfileWrapper class="py-12">
  
      <UForm :state="formState" :schema="schema" class="w-[80%] mx-auto" @submit="signUp">
      <div class="mb-4 flex flex-col lg:gap-8 gap-4 md:flex-row justify-between">
        <UFormGroup
          label="User Name"
          name="userName"
          class="grow-1 flex flex-col h-[50px]"
        >
          <UInput
            v-model="formState.userName"
            placeholder="User Name"
            class="text-primary border-primary rounded-lg grow-1"
          >
            <template #leading>
              <UIcon name="i-heroicons-user" class="w-5 h-5 text-primary" />
            </template>
          </UInput>
          <p v-if="errorMsg.userName" class="text-red-500 text-sm mt-1">
            {{ errorMsg.userName }}
          </p>
        </UFormGroup>
      </div>
  
      <div class="mb-4 h-[50px]">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="formState.email"
            placeholder="Email"
            class="w-full text-primary border-primary rounded-lg"
          >
            <template #leading>
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-primary" />
            </template>
          </UInput>
          <p v-if="errorMsg.email" class="text-red-500 text-sm mt-1">
            {{ errorMsg.email }}
          </p>
        </UFormGroup>
      </div>
  
      <div class="mb-4 h-[50px]">
        <UFormGroup label="mobile Number" name="phoneNumber">
          <UInput
            v-model="formState.phoneNumber"
            placeholder="Mobile Number"
            class="w-full text-primary border-primary rounded-lg"
          >
            <template #leading>
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-primary" />
            </template>
          </UInput>
          <p v-if="errorMsg.phoneNumber" class="text-red-500 text-sm mt-1">
            {{ errorMsg.phoneNumber }}
          </p>
        </UFormGroup>
      </div>
  
      <div class="mb-4 h-[50px]">
        <UFormGroup label="Password" name="password">
          <UInput
            v-model="formState.password"
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="Password"
            class="w-full text-primary border-primary rounded-lg"
          >
            <template #leading>
              <UIcon name="i-heroicons-lock-open" class="w-5 h-5 text-primary" />
            </template>
            <template #trailing>
              <UIcon
                :name="
                  isPasswordVisible ? 'i-heroicons-eye-off' : 'i-heroicons-eye'
                "
                class="w-5 h-5 text-primary cursor-pointer"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </UInput>
          <p v-if="errorMsg.password" class="text-red-500 text-sm mt-1">
            {{ errorMsg.password }}
          </p>
        </UFormGroup>
      </div>
  
      <div class="mb-4 h-[50px]">
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
          <p v-if="errorMsg.confirmPassword" class="text-red-500 text-sm mt-1">
            {{ errorMsg.confirmPassword }}
          </p>
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
    </UForm>
    
    </ProfileWrapper>
  </div>

</template>
