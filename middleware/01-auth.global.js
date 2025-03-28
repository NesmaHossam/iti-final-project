export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");

  // if (!token.value && to.path === "/about") {
  //   return navigateTo("/");
  // }

  if (token.value && to.path === "/login") {
    return navigateTo("/");
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////

// ✅ Authenticated-only pages:

// /cart

// /checkout

// /book-table

// /pre-order-meals

// /profile

// /profile/edit-info

// /profile/reservations

/////////////////////////////////////////
// ✅ Public pages:

// /login

// /signup

// /forget-pass

// /otp

// /re-set-pass

// /menu

// /view-item

// /about-us

// /contact-us

// /events-offers

// //////////////////////////////////////////////////////////////////////////////////////////////////////

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const token = useCookie("token");

//   const publicPages = [
//     '/',
//     'auth/Login',
//     'auth/SignUp',
//     'auth/ForgetPassword',
//     'auth/OTP',
//     'auth/ResetPassword',
//     'user/Menu',
//     'user/Menu/[id]',
//     'user/AboutUs',
//     'user/ContactUs',
//     'user/Events'
//   ];

//   const privatePages = [
//     'user/Cart',
//     'user/Cart/CheckOut',
//     'user/Tables/BookTable',
//     'user/pre-order-meals',
//     'user/profile',
//     'user/profile/Edit',
//     'user/profile/Reservation'
//   ];

//   // Redirect to login if trying to access private page without token
//   if (!token.value && privatePages.includes(to.path)) {
//     return navigateTo('/login');
//   }

//   // Redirect to home if already authenticated and tries to access login or signup
//   if (token.value && ['/login', '/signup'].includes(to.path)) {
//     return navigateTo('/');
//   }
// });

// /////////////////////////////////////
// another way to do it more daynamic:

// if (!token.value && privatePages.some(page => to.path.startsWith(page))) {
//   return navigateTo('/login');
// }

// ///////////////////////////////////////////////////another way////////////////////////////////////////////////////////

// // definePageMeta({
//   requiresAuth: true
// });

// like cart page
// <script setup>
// definePageMeta({
//   requiresAuth: true
// });
// </script>

// export default defineNuxtRouteMiddleware((to) => {
//   const token = useCookie("token");

//   // Protect private routes
//   if (to.meta.requiresAuth && !token.value) {
//     return navigateTo('/login');
//   }

//   // Prevent authenticated users from visiting login and signup pages
//   if (token.value && ['/login', '/signup'].includes(to.path)) {
//     return navigateTo('/');
//   }
// });

// if (token.value && ['/login', '/signup', '/forget-pass', '/otp', '/re-set-pass'].includes(to.path)) {
//   return navigateTo('/');
// }
// ///////////////////////////////////////

// لو عاوزة ارجعه عند نفس النقطة اللى كان فيها

// export default defineNuxtRouteMiddleware((to) => {
//   const token = useCookie("token");

//   // If user is not authenticated and the page requires auth
//   if (to.meta.requiresAuth && !token.value) {
//     // Save the target path to a query parameter
//     return navigateTo(`/login?redirect=${to.fullPath}`);
//   }

//   // Prevent logged-in users from going to login/signup/reset flows
//   if (token.value && ['/login', '/signup', '/forget-pass', '/otp', '/re-set-pass'].includes(to.path)) {
//     return navigateTo('/');
//   }
// });

// in login
{
  /* <script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

async function login() {
  // your normal login logic here...

  // Simulate successful login
  const token = useCookie('token');
  token.value = 'sample-token'; // normally you get this from your API

  // Redirect back if redirect param exists
  if (route.query.redirect) {
    return router.push(route.query.redirect);
  }

  // Otherwise go to home
  return router.push('/');
}
</script> */
}

// const redirectPath = route.query.redirect || '/';
// if (redirectPath.startsWith('/')) {
//   return router.push(redirectPath);
// }
// return router.push('/');
