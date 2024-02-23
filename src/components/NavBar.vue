<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Harry_Potter_wordmark.svg/1200px-Harry_Potter_wordmark.svg.png" alt="Logo"></router-link></li>
      <li><router-link to="/potions">Potions</router-link></li>
      <li><router-link to="/sorts">Sorts</router-link></li>
      <li><router-link to="/livres">Livres</router-link></li>
      <li><router-link to="/personnages">Personnages</router-link></li>
    </ul>
    <div class="search-container">
      <input v-model="searchQuery" @input="handleSearch" type="text" class="searchBar" placeholder="Rechercher 🔍">
      <!-- Affichez les résultats en fonction du type de résultat -->
      <div v-if="searchResults.length > 0" class="search-results" @click="handleResultClick">
        <ul>
          <li v-for="result in searchResults" :key="result.id" class="search-result">
            <template v-if="result.type === 'character'">
              <p>{{ result.attributes.name }}</p>
              <!-- Affichez d'autres informations pour les personnages -->
            </template>
            <template v-else-if="result.type === 'spell'">
              <p>{{ result.attributes.name }}</p>
              <!-- Affichez d'autres informations pour les sorts -->
            </template>
            <template v-else-if="result.type === 'potion'">
              <p>{{ result.attributes.name }}</p>
              <!-- Affichez d'autres informations pour les potions -->
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
    };
  },
  methods: {
    handleSearch() {
      axios.get(`https://api.potterdb.com/v1/characters`, {
        params: {
          'filter[name_cont]': this.searchQuery,
        }
      })
      .then(response => {
        console.log('Résultats de recherche:', response.data);
        this.searchResults = response.data.data;
      })
      .catch(error => {
        console.error('Erreur lors de la recherche:', error);
      });
    },
    handleResultClick(result) {
      // Redirigez vers la page du wiki en fonction du type de résultat
      if (result.type === 'character') {
        this.$router.push(result.attributes.wiki);
      } else if (result.type === 'spell') {
        // Redirection pour les sorts (ajoutez la logique nécessaire)
      } else if (result.type === 'potion') {
        // Redirection pour les potions (ajoutez la logique nécessaire)
      }
    },
  },
};
</script>

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

.searchBar {
  padding: 10px;
  border-radius: 30px;
  border: 1px solid #000;
  height: 25px;
  width: 300px;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-result {
  margin-top: 10px;
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


/* Style pour les résultats de recherche */
.search-results {
  position: absolute;
  top: 100%; /* Place les résultats juste en dessous de la barre de recherche */
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-top: none; /* Supprime la bordure supérieure pour une apparence plus propre */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 150px; /* Limite la hauteur des résultats pour un affichage plus compact */
  overflow-y: auto; /* Ajoute une barre de défilement si nécessaire */
}

.search-result {
  padding: 10px;
  border-bottom: 1px solid #ddd;
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
