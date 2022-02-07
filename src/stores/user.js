import {defineStore,acceptHMRUpdate} from 'pinia'

/**
 * 模拟登录
 * @param {string} a 
 * @param {string} p 
 * @returns 
 */
function apiLogin(a,p){
    if(a==='Admin' && p ==='Admin') return Promise.resolve({isAdmin:true})
    if(a==='User') return Promise.resolve({isAdmin:false})
    return Promise.reject(new Error('invalid credentials'))
}

export const useUserStore=defineStore({
    id:'user',
    state:()=>({
        name:'Admin',
        isAdmin:true
    }),
    actions:{
        logout(){
            this.$patch({
                name:'',
                isAdmin:false
            })
            // we could do other stuff like redirecting the user
        },

        /**
         * Attempt to login a user
         * @param {string} user 
         * @param {string} password 
         */
        async login(user,password){
          const userData=await apiLogin(user,password)
          this.$patch({
              name:user,
              ...userData
          })
        }


    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useUserStore,import.meta.hot))
}