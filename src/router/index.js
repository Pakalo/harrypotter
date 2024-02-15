import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/views/AccueilView.vue'
import Potions from '@/views/LivresView.vue'
import Sorts from '@/views/PersonnagesView.vue'
import Livres from '@/views/PotionsView.vue'
import Personnages from '@/views/SortsView.vue'

Vue.use(Router)

export default new Router({
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
})
