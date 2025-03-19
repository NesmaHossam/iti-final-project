export const useUserStore = defineStore('user', () => {
  const userEmail = ref("Negm")
  function setEmail(email) {
    userEmail.value = email
  }
  return { userEmail,  setEmail}
},
{
  persist: true // Enable persistence
}
)