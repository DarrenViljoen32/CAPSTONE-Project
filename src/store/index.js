import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2';

axios.defaults.withCredentials = true;

const baseUrl = 'https://capstone-project-4.onrender.com'
  
export default createStore({
  state: {
    users: null,
    admins: null,
    loggedin: false,
    loginMessage: null,
  },
  getters: {
  }, 
  mutations: {
    setUsers(state, payload){
      state.users = payload
    },

    setAdmins(state, payload){
      state.admins = payload
    },

    setLogged(state, payload){
      state.loggedin = payload
    },

    setLoginMessage(state, message){
      state.loginMessage = message
    }
  },
  actions: {

    //USERS

    //get all users
    async getUsers({commit}){
      try{
        let users = await axios.get(baseUrl + '/users')
        console.log(users);
        commit('setUsers', users.data)
      }catch(error){
        console.error('Error fetching users: ' , error);
        Swal.fire('Error fetching users ', error)
      }
    },

    //get one user
    async getOneUser({commit}, userDetails){
      try{
        await axios.post(baseUrl + '/users', userDetails)
        window.location.reload()
      }catch(err){
        console.error(err);
        Swal.fire('Error fetching a user ', err)
      }
    },

    //delete user
    async deleteUser({commit}, user_ID){
      try{
        await axios.delete(baseUrl + '/users/' + user_ID)
        window.location.reload()
      }catch(err){
        console.error(err);
        Swal.fire('Error deleting a user ', err)
      }
    },

    //update user
    async editUser({commit}, update){
      try{
        await axios.patch(baseUrl + '/users/' + update.user_ID, update)
        window.location.reload()
      }catch(err){
        console.error(err);
        Swal.fire('Error updating the user ', err)
      }
    },

    //add user
    async addUser({commit}, add){
      try{
        console.log(add);
        let {data} = await axios.post(baseUrl + '/users', add)
        // alert(data.msg)
        Swal.fire(data.msg)
        window.location.reload()
      }catch(err){
        console.error('Error adding user ', err);
        Swal.fire('Error adding user ', err)
      }
    },



    //ADMINS

    //get all admins
    async getAdmins({commit}){
      try{
        let admins = await axios.get(baseUrl + '/admins')
        console.log(admins);
        commit('setAdmins', admins.data)
      }catch(err){
        console.error(err);
        Swal.fire('Error fetching admins ', err)
      }
    },

    //get one admin
    async getOneAdmin({commit}, adminDetails){
      try{
        await axios.post(baseUrl + '/admins', adminDetails)
        window.location.reload()
      }catch(err){
        console.error(err);
        Swal.fire('Error fetching one admin ', err)
      }
    },

    //delete admin
    async deleteAdmin({commit}, admin_ID){
      try{
        await axios.delete(baseUrl + '/admins/' + admin_ID)
  
        window.location.reload()
      }catch(err){
        console.error(err);
        Swal.fire('Error deleting admin ', err)
      }
    },

    //update admin
    async editAdmins({commit}, update){
      try{
        await axios.patch(baseUrl + '/admins/' + update.admin_ID, update)
        window.location.reload()
      }catch(err){
        console.error(err);
        Swal.fire('Error updating admin ', err)
      }
    },

    //add admin
    async addAdmin({commit}, add){
      
      try{
        console.log(add);
        let {data} = await axios.post(baseUrl + '/admins' , add)
        // alert(data.msg)
        Swal.fire(data.msg)
        window.location.reload()
      }catch (err){
        console.error('Error adding admin ', err);
        Swal.fire('Error adding admin ', err)
      }
    },

    //login as admin
    async loginAdmin({commit}, admin_Password){
        console.log(admin_Password);
        let {data} = await axios.post(baseUrl + '/login', admin_Password)
  
        $cookies.set('jwt', data.token)
        commit('setLoginMessage', data.msg)
        
        // alert(data.msg)
        Swal.fire(data.msg)
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
