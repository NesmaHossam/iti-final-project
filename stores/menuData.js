import { defineStore } from 'pinia'

const useMenuData = defineStore('menu' , () => {

    const menu = ref(null);
    const loading = ref(false);
    const error = ref(null) ;
    
    function async getItems() {

      loading = true
      try {
        const { data, error } = await useAsyncApi('/menu/getMenu')
        if (error.value) throw error.value
        items = data.value
      } catch (err) {
        error = err
      } finally {
        loading = false
      }

    }
    
    function setItemById(obj) {
      console.log("Setting user in store:", obj)
      userObj.value = obj
      console.log("obj after setting:", userObj.value)
    }
  
    return { userEmail, userObj, setEmail, setUserData }
  }, 
  {
    persist: {
      enabled: true,
    }
})