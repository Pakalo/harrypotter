<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Harry_Potter_wordmark.svg/1200px-Harry_Potter_wordmark.svg.png" alt="Logo"></router-link></li>
      <li><router-link to="/potions">Potions</router-link></li>
      <li><router-link to="/sorts">Sorts</router-link></li>
      <li><router-link to="/livres">Livres</router-link></li>
      <li><router-link to="/personnages">Personnages</router-link></li>
    </ul>
  </nav>
</template>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  width: 100px;
  margin-right: 25px;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.navbar ul li {
  margin-right: 20px;
}

.navbar ul li a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}

li:hover {
  text-decoration: underline;
}

/* Style pour la liste des résultats */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  cursor: pointer;
}

li:hover {
  background-color: #f1f1f1;
}
</style>
