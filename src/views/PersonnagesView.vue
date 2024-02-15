<template>
  <div>
    <h1>Liste des Personnages</h1>
    <div class="personnages-container">
      <div v-for="personnage in personnages" :key="personnage.id" class="personnage-card">
        <h2>{{ personnage.attributes.name }}</h2>
        <p><strong>Genre:</strong> {{ personnage.attributes.gender }}</p>
        <p><strong>Né en:</strong> {{ personnage.attributes.born }}</p>
        <p><strong>Marié:</strong> {{ personnage.attributes.marital_status }}</p>
        <p><strong>Famille:</strong> {{ personnage.attributes.family_member?.join(', ') }}</p>
        
        <!-- Nouvelles informations -->
        <p><strong>Couleur des yeux:</strong> {{ personnage.attributes.eye_color }}</p>
        <p><strong>Couleur des cheveux:</strong> {{ personnage.attributes.hair_color }}</p>
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
      personnages: []
    };
  },
  mounted() {
    axios.get('https://api.potterdb.com/v1/characters')
      .then(response => {
        console.log('Données de l\'API:', response.data);
        this.personnages = response.data.data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des personnages:', error);
      });
  },
  // methods: {
  //   formatWands(wands) {
  //     // Formatez les informations sur les baguettes comme vous le souhaitez
  //     return wands.map(wand => `${wand.wood} - ${wand.core}`).join(', ');
  //   }
  // }
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
</style>
