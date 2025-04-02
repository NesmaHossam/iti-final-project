<template>
    <h1>item details</h1>
</template>

<!-- ////////////////////////////// -->

<!-- <template>
  <UContainer>
    <div
      class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-tl-[30%] rounded-br-[30%] border border-slate-100 py-10 px-6"
    >
      <div v-if="loading" class="text-center text-lg font-semibold">
        Loading...
      </div>

      <div v-if="error" class="text-red-500 text-center text-lg font-semibold">
        {{ error }}
      </div>

      <div v-if="recipe">
        <div class="flex justify-around">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 my-4">Caesar salad</h1>
            <div class="flex justify-between">
              <h2 class="font-semibold text-xl mt-4">Dinner Dish</h2>
              <h2 class="font-semibold text-xl mt-4">price</h2>
            </div>
            <div>
              <h2 class="font-semibold text-2xl mt-4">Description</h2>
              <p class="text-xl mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                eum.
              </p>
            </div>
          </div>

          <div>
            <img
              :src="recipe.image"
              alt="Recipe Image"
              class="my-4 rounded-lg shadow-lg h-[300px] w-[300px]"
              style="height: 100%"
            />
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const route = useRoute();
const recipeId = route.params.id;
const recipe = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchRecipeDetails = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${recipeId}`);
    if (!response.ok) {
      throw new Error("Recipe not found");
    }
    recipe.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRecipeDetails);
</script> -->
