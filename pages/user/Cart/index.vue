<script setup>
// import { ref, computed, reactive, onMounted } from 'vue';
// import { useRouter, useCookie } from '#imports';

const router = useRouter();
const token = useCookie("token");
const cart = ref([]);

const totalCost = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const addItem = () => {
  cart.value.push({
    name: "Sample Item",
    price: Number((Math.random() * 100).toFixed(2)),
    quantity: 1,
    image: "/sample-image.png",
    description: "Delicious sample dish.",
  });
};

const removeItem = (index) => {
  cart.value.splice(index, 1);
};

onMounted

// quentity

// const increaseQuantity = (index) => {
//   cart.value[index].quantity++;
// };

// const decreaseQuantity = (index) => {
//   if (cart.value[index].quantity > 1) {
//     cart.value[index].quantity--;
//   } else {
//     removeItem(index);
//   }
// };

</script>



<template>
  <UContainer>
    <div class="mt-[35%] md:mt-[20%] lg:my-[10%]">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">Your Cart</h2>
      <div
        v-if="cart.length === 0"
        class="flex flex-col items-center justify-center text-center"
      >
        <img
          src="/assets/images/emptyCart.png"
          alt="Empty Cart"
          class="w-64 mb-4"
        />
        <p class="text-lg font-semibold">Your cart is empty</p>
        <p class="text-gray-500">but it does not have to be.</p>
      </div>

      <div
        v-else
        class="bg-slate-200/10 backdrop-blur-md shadow-lg p-6 lg:p-12 overflow-hidden relative rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full flex flex-col items-center"
      >
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="text-lg md:text-xl">Dish</th>
              <th class="text-lg md:text-xl">Price</th>
              <th class="text-lg md:text-xl">Quantity</th>
              <th class="text-lg md:text-xl">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart" :key="index" class="border-t">
              <td class="flex items-center p-3">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-30 h-30 rounded mr-4"
                />
                <div>
                  <h2 class="text-lg md:text-2xl text-bold">{{ item.name }}</h2>
                  <p class="text-gray-500 text-sm md:text-lg">
                    {{ item.description }}
                  </p>
                </div>
              </td>
              <td class="p-3 text-center text-lg md:text-xl">
                {{ item.price }} E.P
              </td>
              <td class="p-3 flex items-center justify-center">
                <!-- <button
                  @click="decreaseQuantity(index)"
                  class="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span class="mx-3">{{ item.quantity }}</span>
                <button
                  @click="increaseQuantity(index)"
                  class="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button> -->

                <UInputNumber v-model="item.quantity" color="neutral" highlight :min="1" />

              </td>
              <td class="p-3 text-center text-lg md:text-xl">
                {{ item.price * item.quantity }} E.P
              </td>
              <td class="p-3 text-center">
                <button
                  @click="removeItem(index)"
                  class="text-red-500 cursor-pointer"
                >
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-lg md:text-xl font-semibold mt-4">
          Food Total Cost: {{ totalCost }} E.P
        </p>
      </div>

      <div class="flex flex-col md:flex-row justify-between mt-6">
        <NuxtLink
          to="../user/Menu"
          class="bg-primary text-white px-6 py-2 rounded mb-4 md:mb-0 text-center cursor-pointer"
          >Back to Menu</NuxtLink
        >
        <NuxtLink
          to="../user/Tables"
          class="border border-primary text-primary px-6 py-2 rounded mb-2 md:mb-0 text-center cursor-pointer"
          >Reserve a Table</NuxtLink
        >
      </div>
    </div>
  </UContainer>
</template>


