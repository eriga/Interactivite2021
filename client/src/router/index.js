import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login'
import Jeu from '../views/Jeu'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/jeu/:nom/:hue',
    name: 'Jeu',    
    component: Jeu
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
