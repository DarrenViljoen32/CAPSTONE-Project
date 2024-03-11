<template>
    <div class="view">
        <router-link to="/"><button v-if="$cookies.get('jwt')" @click="logout">Log Out</button></router-link>
        <br><br>
        <h1>Administration</h1>
        <br><br>
        <div class="row">
          <div class="col-lg-6">
            <h2>Users</h2>
          </div>

          <div class="col-lg-6" id="crudIcons">
            <button data-bs-toggle="modal" data-bs-target="#exampleModal3" class="bi bi-plus-lg" title="Add User"></button>Add User
          </div>

        <!-- Add Users Modal -->
          <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add Users</h5>
                  <a class="btn-close" data-bs-dismiss="modal" aria-label="Close"></a>
                </div>
                <div class="modal-body">
                  <input type="text" name="user_Name" id="user_Name1" placeholder="First Name" v-model="user_Name">
                  <br><br>
                  <input type="text" name="user_Surname" id="user_Surname1" placeholder="Surname" v-model="user_Surname">
                  <br><br>
                  <input type="text" name="user_Age" id="user_Age1" placeholder="Age" v-model="user_Age">
                  <br><br>
                  <input type="text" name="user_Gender" id="user_Gender1" placeholder="Gender" v-model="user_Gender">
                  <br><br>
                  <input type="email" name="user_Email" id="user_Email1" placeholder="Email" v-model="user_Email">
                  <br><br>
                  <input type="password" name="user_Password" id="user_Password1" placeholder="Password" v-model="user_Password">
                  <br><br>
                  <input type="text" name="user_Image" id="user_Image1" placeholder="Image Url" v-model="user_Image">
                  <br><br>
                </div>
                <div class="modal-footer">
                  <button type="button" data-bs-dismiss="modal">Close</button>
                  <button type="button" @click="addUser">Add</button>
                </div>
              </div>
            </div>
          </div>
        
          <!-- Edit Users Modal -->
        <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-for="user in $store.state.users" :key="user.user_ID">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                <a class="btn-close" data-bs-dismiss="modal" aria-label="Close"></a>
              </div>
              <div class="modal-body">
                  <input type="text" name="user_Name" id="user_Name2" placeholder="First Name" v-model="user_Name">
                  <br><br>
                  <input type="text" name="user_Surname" id="user_Surname2" placeholder="Surname" v-model="user_Surname">
                  <br><br>
                  <input type="text" name="user_Age" id="user_Age2" placeholder="Age" v-model="user_Age">
                  <br><br>
                  <input type="text" name="user_Gender" id="user_Gender2" placeholder="Gender" v-model="user_Gender">
                  <br><br>
                  <input type="email" name="user_Email" id="user_Email2" placeholder="Email" v-model="user_Email">
                  <br><br>
                  <input type="password" name="user_Password" id="user_Password2" placeholder="Password" v-model="user_Password">
                  <br><br>
                  <input type="text" name="user_Image" id="user_Image2" placeholder="Image Url" v-model="user_Image">
                  <br><br>
                </div>
              <div class="modal-footer">
                  <button type="button" data-bs-dismiss="modal">Close</button>
                  <button @click="userEdit">Save</button>
              </div>
            </div>
          </div>
        </div>



        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Password</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.user_ID">
              <th>{{ user.user_ID }}</th>
              <td>{{ user.user_Name }}</td>
              <td>{{ user.user_Surname }}</td>
              <td>{{ user.user_Age }}</td>
              <td>{{ user.user_Gender }}</td>
              <td>{{ user.user_Email }}</td>
              <td>{{ user.user_Password }}</td>
              <td><img v-bind:src= "user.user_Image" alt="Profile Photo" class="img-fluid"></td>
              <td>
                <button class="bi bi-pencil" title="Edit User" @click="populateUserFields(user)" data-bs-toggle="modal" data-bs-target="#exampleModal4"></button>
                <br><br>
                <button class="bi bi-dash-lg" title="Delete User" @click="deleteUser(user.user_ID)"></button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
  import AdminModalView from '@/components/AdminModalView.vue'

export default{
  components:{
    AdminModalView
  },

    data(){
        return{
            users: [],

            
            user_ID: null,
            user_Name: null,
            user_Surname: null,
            user_Age: null,
            user_Gender: null,
            user_Email: null,
            user_Password: null,
            user_Image: null,
            
            editedUsers: {
              user_ID: null,
              user_Name: null,
              user_Surname: null,
              user_Age: null,
              user_Gender: null,
              user_Email: null,
              user_Password: null,
              user_Image: null,
            },

            modalVisable: false,
        }
    },


    methods:{
      logout(){
        this.$store.dispatch('logout')
      },
  
      
      async displayUsers(){
          await this.$store.dispatch('getUsers')
          this.users = this.$store.state.users
      },

      deleteUser(user_ID){
        this.$store.dispatch('deleteUser', user_ID)
      },

      addUser(){
        this.$store.dispatch('addUser', this.$data)
      },

      populateUserFields(user){
        this.user_Name = user.user_Name
        this.user_Surname = user.user_Surname
        this.user_Age = user.user_Age
        this.user_Gender = user.user_Gender
        this.user_Email = user.user_Email
        this.user_Password = user.user_Password
        this.user_Image = user.user_Image
        this.editedUsers = {...user}
      },

      userEdit(){
        this.$store.dispatch('editUser', this.editedUsers);
        this.editedUsers = {
              user_ID: null,
              user_Name: null,
              user_Surname: null,
              user_Age: null,
              user_Gender: null,
              user_Email: null,
              user_Password: null,
              user_Image: null,
        }
    }
  },
    
    computed:{

  },

  mounted(){
    this.displayUsers()
  }
}
</script>

<style>
/* hide scrollbar */
*{
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*::-webkit-scrollbar{
  display: none;
}

button{
  margin-left: 5px;
  margin-right: 5px;
}
</style>