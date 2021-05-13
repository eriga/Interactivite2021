import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Ajout d'une feuille de style à Vue
import './assets/css/style.css'

createApp(App).use(router).mount('#app')
