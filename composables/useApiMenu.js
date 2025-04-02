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

