<template>
  <div>
    <div class="top-of-page">
      <input type="text" v-model="searchQuery" @input="search" placeholder="🔎 Rechercher un livre" class="search-bar">
      <h1>Liste des Livres</h1>
    </div>
    <div class="pagination-info">
      <button @click="fetchPage(currentPage - 1)" :disabled="currentPage === 1">Page précédente</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="fetchPage(currentPage + 1)" :disabled="currentPage === totalPages">Page suivante</button>
    </div>
    
    <div v-if="loading" class="loading-indicator">Chargement en cours...</div>

    <div v-if="!loading" class="livres-container">
      <div v-for="livre in filteredLivres" :key="livre.id" class="livre-card">
        <h2>{{ livre.attributes.title }}</h2>
        
        <img v-if="livre.attributes.cover" :src="livre.attributes.cover" :alt="livre.attributes.title">
        <p><strong>Auteur:</strong> {{ livre.attributes.author }}</p>
        <p><strong>Pages:</strong> {{ livre.attributes.pages }}</p>
        <p><strong>Date de sortie:</strong> {{ livre.attributes.release_date }}</p>
        <p><strong>Résumé:</strong> {{ livre.attributes.summary }}</p>
        <p><strong>Dédicace:</strong> {{ livre.attributes.dedication }}</p>
        <p><a :href="livre.attributes.wiki" target="_blank">Wiki</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListeLivres',
  data() {
    return {
      livres: [],
      currentPage: 1,
      totalPages: 5, // Update with the actual total pages for books
      loading: false,
      searchQuery: '',
    };
  },
  computed: {
    filteredLivres() {
      return this.livres.filter(livre => {
        return livre.attributes.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  mounted() {
    this.fetchPage(this.currentPage);
  },
  methods: {
    fetchPage(pageNumber) {
      this.loading = true;
      
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        axios.get(`https://api.potterdb.com/v1/books?page[number]=${pageNumber}`)
          .then(response => {
            console.log('Données de l\'API:', response.data);
            this.livres = response.data.data;
            this.currentPage = pageNumber;

            const linkHeader = response.headers.link;
            if (linkHeader) {
              const totalPagesMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
              if (totalPagesMatch) {
                this.totalPages = parseInt(totalPagesMatch[1]);
              }
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des livres:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    search() {
      this.loading = true;
      this.livres = []; // Clear existing data
      
      axios.get('https://api.potterdb.com/v1/books', {
        params: {
          'filter[title_cont]': this.searchQuery,
        }
      })
      .then(response => {
        console.log('Résultats de la recherche:', response.data);
        this.livres = response.data.data;
      })
      .catch(error => {
        console.error('Erreur lors de la recherche des livres:', error);
      })
      .finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.livres-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.livre-card {
  width: calc(25% - 20px);
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

.top-of-page{
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 0 .5vh 0 .5vh;
  align-items: center;
}

.search-bar{
  height: 0px;
  width: 300px;
  padding: 20px;
  border-radius: 200px;
  font-size: large;
}

.pagination-info {
  margin-bottom: 10px;
}

.loading-indicator {
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
}
</style>
