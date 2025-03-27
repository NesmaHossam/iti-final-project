// stores/userEmail.js
export const useUserStore = defineStore('user', () => {
  const userEmail = ref("mostafanegm0002@gmail.com")
  
  function setEmail(email) {
    console.log("Setting email in store:", email)
    userEmail.value = email
    console.log("Email after setting:", userEmail.value)
  }
  
  return { userEmail, setEmail }
}, 
{
  persist: {
    enabled: true,
  }
})