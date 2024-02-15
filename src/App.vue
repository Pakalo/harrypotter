<template>
  <div id="app">
    <!-- Utiliser votre composant de barre de navigation -->
    <NavBar/>
    <!-- Inclure le composant router-view pour afficher le contenu de chaque route -->
    <router-view/>
  </div>
</template>

<script>
// Importer votre composant de barre de navigation
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    // Enregistrer votre composant de barre de navigation pour l'utiliser dans ce composant
    NavBar
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

/* Vous pouvez conserver vos styles de la barre de navigation ici */

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
