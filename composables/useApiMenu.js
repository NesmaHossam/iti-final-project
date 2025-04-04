// import { useFetch } from "nuxt/app";
// import { useCookie } from "nuxt/app";
// import { useRuntimeConfig } from "nuxt/app";
// import { ref } from "vue";

// export const useApiMenu = (
//   endPoint,
//   method = "GET",
//   payload = null,
//   moreHeaders = {}
// ) => {
//   const config = useRuntimeConfig();
//   const token = useCookie("token");

//   const headers = { ...moreHeaders };

//   if (token.value) {
//     headers["Authorization"] = `Bearer ${token.value}`;
//   }

//   const baseURL = config.public.API_BASE_URL || "https://dummyjson.com";

//   const { data, pending, error } = useFetch(`${baseURL}${endPoint}`, {
//     method,
//     headers,
//     body: payload,
//   });

//   const errorMessage = ref(null);
//   if (error.value) {
//     errorMessage.value =
//       error.value.response?.data?.message || "An error occurred.";
//   }

//   return { data, pending, error: errorMessage, error };
// };



// ///////////////////////////////////////////// another way/////////////////


// import { ref, computed, watchEffect } from "vue";
// import { useApiMenu } from "@/composables/useApiMenu";

// export default function useMenu() {
//   const { data, pending, error } = useApiMenu("/menu");

//   const menuItems = ref([]);
//   const selectedFilters = ref([]);
//   const sortOrder = ref("");

//   watchEffect(() => {
//     if (data.value) {
//       menuItems.value = data.value; 
//     }
//   });

//   const filteredAndSortedItems = computed(() => {
//     let filtered = menuItems.value;

//     if (selectedFilters.value.length && !selectedFilters.value.includes("All")) {
//       filtered = filtered.filter((item) => selectedFilters.value.includes(item.category));
//     }

//     if (sortOrder.value === "asc") {
//       filtered.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortOrder.value === "desc") {
//       filtered.sort((a, b) => b.name.localeCompare(a.name));
//     } else if (sortOrder.value === "low-high") {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (sortOrder.value === "high-low") {
//       filtered.sort((a, b) => b.price - a.price);
//     }

//     return filtered;
//   });

//   return {
//     menuItems,
//     selectedFilters,
//     sortOrder,
//     filteredAndSortedItems,
//     pending,
//     error,
//   };
// }


