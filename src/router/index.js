import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '@/views/AccueilView.vue';
import Potions from '@/views/PotionsView.vue';
import Sorts from '@/views/SortsView.vue';
import Livres from '@/views/LivresView.vue';
import Personnages from '@/views/PersonnagesView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/potions',
      name: 'Potions',
      component: Potions
    },
    {
      path: '/sorts',
      name: 'Sorts',
      component: Sorts
    },
    {
      path: '/livres',
      name: 'Livres',
      component: Livres
    },
    {
      path: '/personnages',
      name: 'Personnages',
      component: Personnages
    }
  ]
});

export default router;
