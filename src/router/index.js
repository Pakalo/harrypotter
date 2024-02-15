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
      name: 'AccueilView',
      component: Accueil
    },
    {
      path: '/potions',
      name: 'PotionsView',
      component: Potions
    },
    {
      path: '/sorts',
      name: 'SortsView',
      component: Sorts
    },
    {
      path: '/livres',
      name: 'LivresView',
      component: Livres
    },
    {
      path: '/personnages',
      name: 'PersonnagesView',
      component: Personnages
    }
  ]
});

export default router;
