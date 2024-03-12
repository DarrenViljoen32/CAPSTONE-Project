<template>
  <div class="home">
    <router-link to="/"><button v-if="$cookies.get('jwt')" @click="logout">Log Out</button></router-link>
    <br><br>
    <h1>Home</h1>

    <div v-if="loadingContent">

    </div>

    <div v-else>
      <Spinner/>
    </div>

  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
export default {

  data(){
    return{
      loadingContent : true,
    }
  },

  components: {
    Spinner
  },

  computed:{
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>
