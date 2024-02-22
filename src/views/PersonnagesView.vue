<template>
  <div>
    <h1>Liste des Personnages</h1>
    <div class="pagination-info">
      <button @click="fetchPage(currentPage - 1)" :disabled="currentPage === 1">Page précédente</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="fetchPage(currentPage + 1)" :disabled="currentPage === totalPages">Page suivante</button>
    </div>
    <div class="personnages-container">
      <div v-for="personnage in personnages" :key="personnage.id" class="personnage-card">
        <h2>{{ personnage.attributes.name }}</h2>
        
        <img v-if="personnage.attributes.image" :src="personnage.attributes.image" :alt="personnage.attributes.name">
        <p><strong>Maison:</strong> {{ personnage.attributes.house }}</p>
        <p><strong>Genre:</strong> {{ personnage.attributes.gender }}</p>
        <p><strong>Né en:</strong> {{ personnage.attributes.born }}</p>
        <p><strong>Marié:</strong> {{ personnage.attributes.marital_status }}</p>
        <p><strong>Famille:</strong> {{ personnage.attributes.family_member?.join(', ') }}</p>
        
        <!-- Nouvelles informations -->
        <p><strong>Taille:</strong> {{ personnage.attributes.height }}</p>
        <p><strong>Statut de sang:</strong> {{ personnage.attributes.blood_status }}</p>
        <p><strong>Métiers:</strong> {{ personnage.attributes.jobs?.join(', ') }}</p>
        <p><strong>Relations amoureuses:</strong> {{ personnage.attributes.romances?.join(', ') }}</p>
        <p><strong>Titres:</strong> {{ personnage.attributes.titles?.join(', ') }}</p>
        <!-- <p><strong>Baguettes:</strong> {{ formatWands(personnage.attributes.wand) }}</p> -->

        <!-- Ajoutez d'autres informations nécessaires -->

        <p><a :href="personnage.attributes.wiki" target="_blank">Wiki</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListePersonnages',
  data() {
    return {
      personnages: [],
      currentPage: 1,
      totalPages: 47,
    };
  },
  mounted() {
    this.fetchPage(this.currentPage);
  },
  methods: {
    fetchPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        axios.get(`https://api.potterdb.com/v1/characters?page[number]=${pageNumber}`)
          .then(response => {
            console.log('Données de l\'API:', response.data);
            this.personnages = response.data.data;
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
            console.error('Erreur lors de la récupération des personnages:', error);
          });
      }
    },
  },
};
</script>

<style scoped>
.personnages-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.personnage-card {
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

