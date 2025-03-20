<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { z } from "zod";

definePageMeta({
  layout: "auth",
});

// State
const formState = reactive({
  otp: "",
});
const isLoading = ref(false);
const errorMsg = ref(null);
const successMsg = ref(null);
const timerValue = ref(84);

// Schema
const schema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});

// Auth function
const auth = useAuth();

async function submitOTP({ data }) {
  console.log("Submitting OTP: ", data.otp);
  console.log("Current formState.otp: ", formState.otp);

  try {
    isLoading.value = true;
    await auth.verifyOTP(data.otp);
    successMsg.value = "OTP verified successfully!";
    errorMsg.value = null;
  } catch (error) {
    errorMsg.value = error.message || "Failed to verify OTP";
    successMsg.value = null;
  } finally {
    isLoading.value = false;
  }
}

// Timer Logic
let timerInterval = null;

function startTimer() {
  timerInterval = setInterval(() => {
    if (timerValue.value > 0) {
      timerValue.value--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}
console.log(formState.otp);

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  clearInterval(timerInterval);
});
const formattedTimer = computed(() => {
  const minutes = Math.floor(timerValue.value / 60);
  const seconds = (timerValue.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

const user = useUserStore();
const { userEmail } = storeToRefs(user);
console.log(userEmail.value);
</script>

<template>
  <div class="h-screen flex items-center justify-center p-6 relative">
    <img
      src="../../assets/images/Auth/OTP1.png"
      alt="OTP Image"
      class="absolute top-[15%] right-[16%] w-[300px]"
    />
    <div
      class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-lg w-[600px] p-8 relative z-2"
    >
      <h1
        class="text-3xl mb-6 text-center font-bold cursor-default text-[#312D27]"
      >
        VERIFICATION CODE
      </h1>
      <p class="text-xl text-[#7A7161] text-center cursor-default">
        We have sent you a One Time Password to your email!
      </p>
      <p class="text-xl text-[#7A7161] text-center cursor-default mt-2">
        Please Enter OTP
      </p>
      <p
        class="text-2xl text-[#7A7161] text-center cursor-default mt-2"
        id="timer"
      >
        {{ formattedTimer }}
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

      <UForm :state="formState" :schema="schema" @submit="submitOTP">
        <div class="mb-4 flex justify-center">
          <UFormGroup label="OTP" name="otp">
            <UPinInput
              type="number"
              v-model="formState.otp"
              class="border-b gap-4 border-[#A39782] focus:outline-none focus:border-[#A39782] bg-transparent"
              variant="none"
              size="xl"
              style="display: flex; justify-content: space-between"
            />
          </UFormGroup>
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-[#A39782] text-white cursor-pointer text-lg"
          block
          >Submit
        </UButton>

        <p class="mt-4 text-center text-sm cursor-default text-[#7A7161]">
          Didn’t receive the code?
          <nuxt-link
            to="/auth/resend-otp"
            class="underline underline-offset-4 pl-1 font-semibold"
            >Resend OTP</nuxt-link
          >
        </p>
      </UForm>
    </div>
    <img
      src="../../assets/images/Auth/OTP2.png"
      alt="Background Image"
      class="absolute bottom-[6%] left-[16%] w-[400px] z-0"
    />
  </div>
</template>
