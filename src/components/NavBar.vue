<template>
    <nav class="navbar">
      <ul>
        <li><router-link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Harry_Potter_wordmark.svg/1200px-Harry_Potter_wordmark.svg.png" alt="Logo"></router-link></li>
        <li><router-link to="/potions">Potions</router-link></li>
        <li><router-link to="/sorts">Sorts</router-link></li>
        <li><router-link to="/livres">Livres</router-link></li>
        <li><router-link to="/personnages">Personnages</router-link></li>
      </ul>
      <input type="text" class="searchBar" placeholder="Rechercher 🔍">
    </nav>
  </template>
  
  <script>
  export default {
    // Logique du composant
  }
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  img{
    width: 100px;
    margin-right: 25px;
  }
  
  .searchBar{
    padding: 10px;
    border-radius: 30px;
    border: 1px solid #000;
    height: 25px;
    width: 300px;
  }
  .navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .navbar ul li {
    margin-right: 20px;
  }
  
  .navbar ul li a {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }

  li:hover{
    text-decoration: underline;
  }
  </style>
  