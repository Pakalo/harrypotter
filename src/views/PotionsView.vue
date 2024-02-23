<template>
  <div>
    <h1>Liste des Potions</h1>
    <div class="pagination-info">
      <button @click="fetchPage(currentPage - 1)" :disabled="currentPage === 1">Page précédente</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="fetchPage(currentPage + 1)" :disabled="currentPage === totalPages">Page suivante</button>
    </div>
    <div class="potions-container">
      <div v-for="potion in potions" :key="potion.id" class="potion-card">
        <h2>{{ potion.attributes.name }}</h2>
        
        <img v-if="potion.attributes.image" :src="potion.attributes.image" :alt="potion.attributes.name">
        <p><strong>Type:</strong> {{ potion.attributes.type }}</p>
        <p><strong>Ingrédients:</strong> {{ potion.attributes.ingredients ? potion.attributes.ingredients.split(',').join(', ') : 'N/A' }}</p>
        <p><strong>Effets:</strong> {{ potion.attributes.effects?.join(', ') }}</p>
        <p><strong>Difficulté de préparation:</strong> {{ potion.attributes.difficulty }}</p>
        
        <!-- Nouvelles informations spécifiques aux potions -->
        <p><strong>Température de brassage:</strong> {{ potion.attributes.brewing_temperature }}</p>
        <p><strong>Durée de brassage:</strong> {{ potion.attributes.brewing_time }}</p>
        <p><strong>Niveau de danger:</strong> {{ potion.attributes.danger_level }}</p>
        
        <!-- Ajoutez d'autres informations nécessaires -->

        <p><a :href="potion.attributes.wiki" target="_blank">Wiki</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListePotions',
  data() {
    return {
      potions: [],
      currentPage: 1,
      totalPages: 2, // Mettez à jour avec le nombre total de pages
    };
  },
  mounted() {
    this.fetchPage(this.currentPage);
  },
  methods: {
    fetchPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        axios.get(`https://api.potterdb.com/v1/potions?page[number]=${pageNumber}`)
          .then(response => {
            console.log('Données de l\'API:', response.data);
            this.potions = response.data.data;
            this.currentPage = pageNumber;

            // Récupérer le nombre total de pages à partir de l'en-tête Link
            const linkHeader = response.headers.link;
            if (linkHeader) {
              const totalPagesMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
              if (totalPagesMatch) {
                this.totalPages = parseInt(totalPagesMatch[1]);
              }
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des potions:', error);
          });
      }
    },
  },
};
</script>

<style scoped>
.potions-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.potion-card {
  width: calc(25% - 20px);
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

.pagination-info {
  margin-bottom: 10px;
}
</style>
