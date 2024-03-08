<template>
    <div class="view">
        <router-link to="/"><button v-if="$cookies.get('jwt')" @click="logout">Log Out</button></router-link>
        <br><br>
        <h1>Administration</h1>

        <div class="row">
          <div class="col-lg-6">
            <h2>Users</h2>
          </div>

          <div class="col-lg-6" id="crudIcons">
            <button class="bi bi-plus-lg" title="Add User"></button>
          </div>
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in displayUsers" :key="user.user_ID">
              <th>{{ user.user_ID }}</th>
              <td>{{ user.user_Name }}</td>
              <td>{{ user.user_Surname }}</td>
              <td>{{ user.user_Age }}</td>
              <td>{{ user.user_Gender }}</td>
              <td>{{ user.user_Email }}</td>
              <td>{{ user.user_Password }}</td>
              <td><img v-bind:src= "user.user_Image" alt="Profile Photo"></td>
              <td>
                <button class="bi bi-pencil" title="Edit User"></button>
                <br>
                <button class="bi bi-dash-lg" title="Delete User"></button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default{
    data(){
        return{
            user_ID: null,
            user_Name: null,
            user_Surname: null,
            user_Age: null,
            user_Gender: null,
            user_Email: null,
            user_Password: null,
            user_Image: null
        }
    },
    computed:{
    logout(){
      this.$store.dispatch('logout')
    },

    displayUsers(){
      this.$store.dispatch('getUsers')
    }
  }
}
</script>

<style>
button{
  margin-left: 5px;
  margin-right: 5px;
}
</style>