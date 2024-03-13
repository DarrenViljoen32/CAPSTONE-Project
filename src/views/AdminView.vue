<template>
    <div class="view">
        <router-link to="/"><button v-if="$cookies.get('jwt')" @click="logout">Log Out</button></router-link>
        <br><br>
        <h1>Administration</h1>
        <br><br>
          
          
          
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
                  <input type="text" name="user_Name" id="user_Name2" placeholder="First Name" v-model="editedUsers.user_Name">
                  <br><br>
                  <input type="text" name="user_Surname" id="user_Surname2" placeholder="Surname" v-model="editedUsers.user_Surname">
                  <br><br>
                  <input type="text" name="user_Age" id="user_Age2" placeholder="Age" v-model="editedUsers.user_Age">
                  <br><br>
                  <input type="text" name="user_Gender" id="user_Gender2" placeholder="Gender" v-model="editedUsers.user_Gender">
                  <br><br>
                  <input type="email" name="user_Email" id="user_Email2" placeholder="Email" v-model="editedUsers.user_Email">
                  <br><br>
                  <input type="password" name="user_Password" id="user_Password2" placeholder="Password" v-model="editedUsers.user_Password">
                  <br><br>
                  <input type="text" name="user_Image" id="user_Image2" placeholder="Image Url" v-model="editedUsers.user_Image">
                  <br><br>
                </div>
                <div class="modal-footer">
                  <button type="button" data-bs-dismiss="modal">Close</button>
                  <button @click="userEdit">Save</button>
                </div>
              </div>
            </div>
          </div>
          
        

          <!-- Add Admin Modal -->
          <div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add Admin</h5>
                  <a class="btn-close" data-bs-dismiss="modal" aria-label="Close"></a>
                </div>
                <div class="modal-body">
                  <input type="text" name="admin_Name" id="admin_Name1" placeholder="Full Name" v-model="admin_Name">
                  <br><br>
                  <input type="email" name="admin_Email" id="admin_Email1" placeholder="Email" v-model="admin_Email">
                  <br><br>
                  <input type="password" name="admin_Password" id="admin_Password1" placeholder="Password" v-model="admin_Password">
                  <br><br>
                </div>
                <div class="modal-footer">
                  <button type="button" data-bs-dismiss="modal">Close</button>
                  <button type="button" @click="addAdmin">Add</button>
                </div>
              </div>
            </div>
          </div>


          <!-- Edit Admin Modal -->
          <div class="modal fade" id="exampleModal8" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-for="admin in $store.state.admins" :key="admin.admin_ID">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Edit Admin</h5>
                  <a class="btn-close" data-bs-dismiss="modal" aria-label="Close"></a>
                </div>
                <div class="modal-body">
                  <input type="text" name="admin_Name" id="admin_Name2" placeholder="Full Name" v-model="editedAdmins.admin_Name">
                  <br><br>
                  <input type="email" name="admin_Email" id="admin_Email2" placeholder="Email" v-model="editedAdmins.admin_Email">
                  <br><br>
                  <input type="password" name="admin_Password" id="admin_Password2" placeholder="Password" v-model="editedAdmins.admin_Password">
                  <br><br>
                </div>
                <div class="modal-footer">
                  <button type="button" data-bs-dismiss="modal">Close</button>
                  <button @click="adminEdit">Save</button>
                </div>
              </div>
            </div>
          </div>


          <!-- USERS -->
        <div v-if="loadingUsers">

          <div class="row">
            <div class="col-lg-6" id="subTitle">
              <h2>Users</h2>
            </div>

            <div class="col-lg-6" id="crudIcons">
              <button data-bs-toggle="modal" data-bs-target="#exampleModal3" class="bi bi-plus-lg" title="Add User" @click="clearInput"></button>Add User
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
                <!-- <th>Password</th> -->
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
                <!-- <td>{{ user.user_Password }}</td> -->
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

        <div v-else>
          <Spinner/>
        </div>

        
        <!-- ADMINS -->
        <div v-if="loadingAdmins">
          <div class="row">

            <div class="col-lg-6" id="subTitle">
              <h2>Admins</h2>
            </div>

            <div class="col-lg-6" id="crudIcons">
              <button data-bs-toggle="modal" data-bs-target="#exampleModal6" class="bi bi-plus-lg" title="Add Admin" @click="clearAdminInput"></button>Add Admin
            </div>

          </div>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="admin in admins" :key="admin.admin_ID">
                <th>{{ admin.admin_ID }}</th>
                <td>{{ admin.admin_Name }}</td>
                <td>{{ admin.admin_Email }}</td>
                <td>{{ admin.admin_Password }}</td>
                <td>
                  <button class="bi bi-pencil" title="Edit Admin" @click="populateAdminFields(admin)" data-bs-toggle="modal" data-bs-target="#exampleModal8"></button>
                  <br><br>
                  <button class="bi bi-dash-lg" title="Delete Admin" @click="deleteAdmin(admin.admin_ID)"></button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

        <div v-else>
          <Spinner/>
        </div>



    </div>
</template>

<script>
  import AdminModalView from '@/components/AdminModalView.vue'
  import Spinner from '@/components/Spinner.vue'

export default{
  components:{
    AdminModalView,
    Spinner,
  },

    data(){
        return{
            users: [],
            admins: [],

            loadingUsers: true,
            loadingAdmins: true,
            
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

            admin_ID: null,
            admin_Name: null,
            admin_Email: null,
            admin_Password: null,

            editedAdmins: {
              admin_ID: null,
              admin_Name: null,
              admin_Email: null,
              admin_Password: null,
            },

            modalVisable: false,
        }
    },


    methods:{
      logout(){
        this.$store.dispatch('logout')
      },
  
      //USERS

      async displayUsers(){
        try{
          this.loadingUsers = false
          await this.$store.dispatch('getUsers')
          this.users = this.$store.state.users
        }catch(err){
          console.error(err);
        }finally{
          this.loadingUsers = true
        }
      },

      deleteUser(user_ID){
        try{
          this.$store.dispatch('deleteUser', user_ID)
        }catch(err){
          console.error(err);
        }
      },

      addUser(){
        try{
          this.$store.dispatch('addUser', this.$data)
        }catch(err){
          console.error(err);
        }
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

      clearInput(){
        this.user_Name = ''
        this.user_Surname = ''
        this.user_Age = ''
        this.user_Gender = ''
        this.user_Email = ''
        this.user_Password = ''
        this.user_Image = ''
      },
 
      userEdit(){
        try{
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
        }catch(err){
          console.error(err);
        }
    },


    //ADMINS

    async displayAdmins(){
      try{
        this.loadingAdmins = false
        await this.$store.dispatch('getAdmins')
        this.admins = this.$store.state.admins
      }catch(err){
        console.error(err);
      }finally{
        this.loadingAdmins = true
      }
    },

    deleteAdmin(admin_ID){
      try{
        this.$store.dispatch('deleteAdmin', admin_ID)
      }catch(err){
        console.error(err);
      }
    },

    addAdmin(){
      try{
        this.$store.dispatch('addAdmin', this.$data)
      }catch(err){
        console.error(err);
      }
    },

    populateAdminFields(admin){
      this.admin_Name = admin.admin_Name
      this.admin_Email = admin.admin_Email
      this.admin_Password = admin.admin_Password
      this.editedAdmins = {...admin}
    },

    clearAdminInput(){
      this.admin_Name = ''
      this.admin_Email = ''
      this.admin_Password = ''
    },

    adminEdit(){
      try{
        this.$store.dispatch('editAdmins', this.editedAdmins)
        this.editedAdmins = {
          admin_Name : null,
          admin_Email : null,
          admin_Password : null
        }
      }catch(err){
        console.error(err);
      }
    }


  },
    
  computed:{

  },

  mounted(){
    this.displayUsers()
    this.displayAdmins()
  }
}
</script>

<style scoped>
/* hide scrollbar */
*{
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*::-webkit-scrollbar{
  display: none;
}

#subTitle{
  text-align: left;
  margin-left: 25px;
}
#crudIcons{
  text-align: right;
}

button{
  margin-left: 5px;
  margin-right: 2px;
}

table{
  table-layout: fixed;
}

td{
  word-wrap: break-word;
}
</style>