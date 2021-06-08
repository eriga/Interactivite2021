<template>
  <div class="meteo" id="content">
    <Info :reponse="reponse" v-if="!isFetching" />
    <router-link class="btn-retour" to="/">Retour</router-link>
  </div>
</template>

<script>
import { http_get } from "../utils/request";
import Info from "../components/Info";

export default {
  name: "Meteo",
  components: { Info },
  data() {
    return {
      reponse: {},
      isFetching: true,
    };
  }, // fin DATA
  methods: {
    getMeteo() {
      // Récupération de la ville dans l'URL
      const city = this.$route.params.city;
      const api_key = "b8cade034b7089638166a533d76f5b2d";
      const units = "metric";
      const lang = "fr";

      // Requête
      http_get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}&lang=${lang}`
      ).then((data) => {
        this.reponse = data;
        this.isFetching = false;        
      });
    },
  }, // fin METHODS
  created() {
    this.getMeteo();
  }, // fin MOUNTED
};
</script>

<style scoped>
.btn-retour {
  border-radius: 8px;
  border: none;
  padding: 15px 15px;
  margin: 15px;
  background-color: cornflowerblue;
  font-size: 16px;
  color: #fff;
  transition: background-color 0.2s ease;
  cursor: pointer;
  height: 50px;
  text-decoration: none;
}

.btn-retour:hover {
  background-color: #0c4769;
}
</style>
