export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");

  // if (!token.value && to.path === "/about") {
  //   return navigateTo("/");
  // }

  if (token.value && to.path === "/login") {
    return navigateTo("/");
  }
});
