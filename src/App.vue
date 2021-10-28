<template>
<img id="logo" src="@/assets/logo.png" alt="">
<div v-if="id">
<h1>Menú</h1>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <a @click.prevent="cerrarSesion" href="#">Cerrar Sesión</a>
  </div>
  </div>
  <router-view/>
</template>

<script>
export default {
  mounted(){
    this.id=localStorage.cliente
  },
  data(){
    return {
      id:-1
    }
  },
  methods:{
    cerrarSesion(){
      localStorage.clear();
      this.$router.push({name:"Login"});
    }
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logo{
  width: 5rem;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
