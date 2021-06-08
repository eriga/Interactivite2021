import { createRouter, createWebHashHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Meteo from '../views/Meteo.vue';


const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/meteo/:city',
    name: 'Meteo',
    component: Meteo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
