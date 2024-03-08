<template>
  <div class="about">
    <router-link to="/"><button v-if="$cookies.get('jwt')" @click="logout">Log Out</button></router-link>
    <br><br>
    <h1>About</h1>
  </div>
</template>

<script>
export default{
  data(){
    return{

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