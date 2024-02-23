<template>
  <div>
    <h1>Détails du Livre</h1>
    <div v-if="livre" class="livre-details">
      <h2>{{ livre.attributes.title }}</h2>
      
      <img v-if="livre.attributes.cover" :src="livre.attributes.cover" :alt="livre.attributes.title">
      <p><strong>Auteur:</strong> {{ livre.attributes.author }}</p>
      <p><strong>Dédicace:</strong> {{ livre.attributes.dedication }}</p>
      <p><strong>Nombre de pages:</strong> {{ livre.attributes.pages }}</p>
      <p><strong>Date de sortie:</strong> {{ livre.attributes.release_date }}</p>
      <p><strong>Résumé:</strong> {{ livre.attributes.summary }}</p>
      
      <!-- Ajoutez d'autres informations nécessaires -->

      <p><a :href="livre.attributes.wiki" target="_blank">Wiki</a></p>
    </div>
    <div v-else>
      <p>Chargement en cours...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LivreView',
  data() {
    return {
      livre: null,
    };
  },
  mounted() {
    const slug = this.$route.params.slug; // Assuming you're using Vue Router and the route has a "slug" parameter
    this.fetchLivreDetails(slug);
  },
  methods: {
    fetchLivreDetails(slug) {
      axios.get(`https://api.potterdb.com/v1/livres/${slug}`)
        .then(response => {
          console.log('Données de l\'API:', response.data);
          this.livre = response.data.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des détails du livre:', error);
        });
    },
  },
};
</script>

<style scoped>
.livre-details {
  margin-top: 20px;
}

/* Add additional styling as needed */
</style>
