export const useUserStore = defineStore('user', () => {
  const userEmail = ref("mostafanegm0002@gmail.com")
  function setEmail(email) {
    userEmail.value = email
  }
  return { userEmail, setEmail }
}, 
{
  persist: true
})