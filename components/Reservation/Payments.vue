<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <div class="flex flex-col md:flex-row items-center w-full py-8">
    <div class="px-8 md:w-[40%]">
      <div>
        <h1 class="text-2xl font-bold mb-4 text-dark-blue cursor-default">
          Payment Method
        </h1>

        <p class="text-gray-500 cursor-default">
          Choose your preferred payment method to secure your reservation.
        </p>
      </div>
      <div class="mt-7">
        <h3 class="font-bold cursor-default">Need help?</h3>
        <h4>Call +20 100 506 6611</h4>
      </div>
    </div>
    <USeparator
      color="primary"
      type="solid"
      orientation="vertical"
      class="h-48 hidden md:block"
    />
    <div class="px-8 md:w-[60%]">
      <h1 class="text-2xl font-bold mb-4 text-dark-blue cursor-default">
        Payment Method
      </h1>

      <div class="mt-6 flex flex-col">
        <div>
          <p class="cursor-default">
            You can pay the required deposit online via VISA.
          </p>
          <UButton
            label="Pay using Card"
            variant="outline"
            class="mt-3 bg-primary text-white cursor-pointer hover:text-primary w-full md:w-[50%] flex items-center justify-center"
          />
        </div>
        <div class="my-5">
          <p class="cursor-default">
            Or choose to pay offline within 24 hours to confirm your
            reservation.
          </p>
          <!-- <UButton
            label="Pay On-site"
            variant="outline"
            class="mt-3 bg-primary text-white cursor-pointer hover:text-primary w-[50%] flex items-center justify-center"
          /> -->

          <UModal
            v-model:open="open"
            :ui="{
              content:
                'bg-transparent border-0 shadow-none rounded-none divided-none ring-transparent ',
            }"
          >
            <UButton
              class="mt-3 bg-primary text-white cursor-pointer hover:text-primary w-full md:w-[50%] flex items-center justify-center"
              label="Pay On-site"
              color="neutral"
              variant="subtle"
              @click="open = true"
            />

            <template #content>
              <div
                class="bg-slate-400/10 backdrop-blur-md shadow-md p-6 lg:p-12 overflow-hidden relative rounded-tl-[30%] rounded-br-[30%] border border-slate-300 w-full flex flex-col items-center"
              >
                <h2 class="text-2xl md:text-3xl font-bold text-center mb-3">
                  Reminder
                </h2>
                <p class="text-center text-l9">
                  Since you've chosen to pay on-site, please remember to
                  complete your payment within 24 hours to confirm your
                  reservation. Thank you for choosing us!
                </p>

                <div class="flex justify-end mt-5 gap-4">
                  <UButton
                    class="mr-2 px-2 py-1 md:px-10 md:py-2 text-sm bg-transparent border border-primary text-primary rounded cursor-pointer hover:text-white"
                    @click="open = false"
                  >
                    Cancel
                  </UButton>
                  <UButton
                    class="px-2 py-1 md:px-10 md:py-2 text-sm bg-primary text-white rounded cursor-pointer"
                  >
                    Submit
                  </UButton>
                </div>
              </div>
            </template>
          </UModal>
        </div>
        <div>
          <p class="cursor-default">
            The remaining balance can be settled upon arrival at the restaurant.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
