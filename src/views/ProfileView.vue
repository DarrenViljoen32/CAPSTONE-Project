<template>
    <div class="view">
        <router-link to="/"><button v-if="$cookies.get('jwt')" @click="logout">Log Out</button></router-link>
        <br><br>
        <h1>Profile</h1>

        <div v-if="loadingContent">

        </div>

        <div v-else>
          <Spinner/>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
export default{

    components:{
      Spinner
    },

    data(){
        return{
            loadingContent : true,
        }
    },
    computed:{
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>