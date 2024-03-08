import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'

axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:8090'

export default createStore({
  state: {
    users: null,
    admins: null,
    loggedin: false
  },
  getters: {
  },
  mutations: {
    setUsers(state,payload){
      state.users = payload
    },

    setAdmins(state,payload){
      state.admins = payload
    },

    setLogged(state,payload){
      state.loggedin = payload
    }
  },
  actions: {

    //USERS

    //get all users
    async getUsers({commit}){
      let {users} = await axios.get(baseUrl + '/users')
      console.log(users);
      commit('setUsers', users)
    },

    //get one user
    async getOneUser({commit}, userDetails){
      await axios.post(baseUrl + '/users', userDetails)
      window.location.reload()
    },

    //delete user
    async deleteUser({commit}, user_ID){
      await axios.delete(baseUrl + '/users/' + user_ID)
      window.location.reload()
    },

    //update user
    async editUser({commit}, update){
      await axios.post(baseUrl + '/users/' + update.user_ID, update)
      window.location.reload()
    },

    //add user
    async addUser({commit}, add){
      console.log(add);
      let {data} = await axios.post(baseUrl + '/users', add)
      alert(data.msg)
      window.location.reload()
    },



    //ADMINS

    //get all admins
    async getAdmins({commit}){
      let {admins} = await axios.get(baseUrl + '/admins')
      console.log(admins);
      commit('setAdmins', admins)
    },

    //get one admin
    async getOneAdmin({commit}, adminDetails){
      await axios.post(baseUrl + '/admins', adminDetails)
      window.location.reload()
    },

    //delete admin
    async deleteAdmin({commit}, admin_ID){
      await axios.delete(baseUrl + '/admins/' + admin_ID)

      window.location.reload()
    },

    //update admin
    async editAdmins({commit}, update){
      await axios.post(baseUrl + '/admins/' + update.admin_ID, update)
      window.location.reload()
    },

    //add admin
    async addAdmin({commit}, add){
      console.log(add);
      let {data} = await axios.post(baseUrl + '/admins' , add)
      alert(data.msg)
      window.location.reload()
    },

    //login as admin
    async loginAdmin({commit}, admin_Password){
      console.log(admin_Password);
      let {data} = await axios.post(baseUrl + '/login', admin_Password)

      $cookies.set('jwt', data.token)
      alert(data.msg)

      await router.push('/home')

      //commit('setLogged', true)
      // window.location.reload()
    },

    //logout
    async logout(){
      let cookies = $cookies.keys()
      console.log(cookies);

      $cookies.remove('jwt')
      // window.location.reload()
    }
  },
  modules: {
  }
})
