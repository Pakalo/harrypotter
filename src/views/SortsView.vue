<template>
  <div>
    <div class="top-of-page">
      <input type="text" v-model="searchQuery" @input="search" placeholder="🔎 Rechercher un sort" class="search-bar">
      <h1>Liste des Sorts</h1>
    </div>
    <div class="pagination-info">
      <button @click="fetchPage(currentPage - 1)" :disabled="currentPage === 1">Page précédente</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="fetchPage(currentPage + 1)" :disabled="currentPage === totalPages">Page suivante</button>
    </div>
    
    <div v-if="loading" class="loading-indicator">Chargement en cours...</div>

    <div v-if="!loading" class="sorts-container">
      <div v-for="sort in filteredSorts" :key="sort.id" class="sort-card">
        <h2>{{ sort.attributes.name }}</h2>
        
        <img v-if="sort.attributes.image" :src="sort.attributes.image" :alt="sort.attributes.name">
        <p><strong>Catégorie:</strong> {{ sort.attributes.category }}</p>
        <p><strong>Créateur:</strong> {{ sort.attributes.creator }}</p>
        <p><strong>Effet:</strong> {{ sort.attributes.effect }}</p>
        <p><strong>Mouvement de la main:</strong> {{ sort.attributes.hand }}</p>
        <p><strong>Incantation:</strong> {{ sort.attributes.incantation }}</p>
        <p><strong>Lumière:</strong> {{ sort.attributes.light }}</p>
        
        <!-- Ajoutez d'autres informations nécessaires -->

        <p><a :href="sort.attributes.wiki" target="_blank">Wiki</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListeSorts',
  data() {
    return {
      sorts: [],
      currentPage: 1,
      totalPages: 4, // Mettez à jour avec le nombre total de pages
      loading: false,
      searchQuery: '',
    };
  },
  computed: {
    filteredSorts() {
      return this.sorts.filter(sort => {
        return sort.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase());
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
        axios.get(`https://api.potterdb.com/v1/spells?page[number]=${pageNumber}`)
          .then(response => {
            console.log('Données de l\'API:', response.data);
            this.sorts = response.data.data;
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
            console.error('Erreur lors de la récupération des sorts:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    search() {
      this.loading = true;
      this.sorts = []; // Clear existing data
      
      axios.get('https://api.potterdb.com/v1/spells', {
        params: {
          'filter[name_cont]': this.searchQuery,
        }
      })
      .then(response => {
        console.log('Résultats de la recherche:', response.data);
        this.sorts = response.data.data;
      })
      .catch(error => {
        console.error('Erreur lors de la recherche des sorts:', error);
      })
      .finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.sorts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.sort-card {
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
