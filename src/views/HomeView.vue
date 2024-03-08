<template>
  <div class="home">
    <router-link to="/"><button v-if="$cookies.get('jwt')" @click="logout">Log Out</button></router-link>
    <br><br>
    <h1>Home</h1>
  </div>
</template>

<script>

export default {
  components: {
  },

  computed:{
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>
