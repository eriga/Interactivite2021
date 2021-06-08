<template>
  <div class="info">
    <h1>
      <span class="ville">{{ reponse.name }}</span
      >, {{ reponse.sys.country }}
      <div class="icon">
        <img
          :src="
            'http://openweathermap.org/img/wn/' +
            reponse.weather[0].icon +
            '@2x.png'
          "
        />
      </div>
    </h1>
    <div>
      <h3>Température</h3>
      <p>{{ reponse.main.temp.toFixed(0) }} °C</p>
    </div>
    <div>
      <h3>Température ressentie</h3>
      <p>{{ reponse.main.feels_like.toFixed(0) }} °C</p>
    </div>
    <div>
      <h3>Description</h3>
      <p>
        {{ reponse.weather[0].description }}
      </p>
    </div>
    <div v-if="reponse.rain">
      <h3>Précipitation de pluie</h3>
      <p>
        {{ reponse.rain["1h"] }}
      </p>
    </div>
    <div v-if="reponse.snow">
      <h3>Précipitation de neige</h3>
      <p>
        {{ reponse.snow["1h"] }}
      </p>
    </div>
    <div>
      <h3>Vitesse du vent</h3>
      <p>{{ (reponse.wind.speed * 3.6).toFixed(1) }} km/h</p>
    </div>
    <div>
      <h3>Direction du vent</h3>
      <p>{{ getDirection() }}</p>
    </div>
    <div>
      <h3>Fuseau horaire</h3>
      <p>{{ reponse.timezone / 3600 }}</p>
    </div>
    <div>
      <h3>Soleil (lever et coucher)</h3>
      <p>
        {{ getTime(reponse.sys.sunrise) }} - {{ getTime(reponse.sys.sunset) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: ["reponse"],
  methods: {
    /*
      N: 337.5 à 22.5
      NE: 22.5 à 67.5
      E: 67.5 à 112.5
      SE: 112.5 à 157.5
      S: 157.5 à 202.5
      SO: 202.5 à 247.5
      O: 247.5 à 292.5
      NO: 292.5 à 337.5
    */
    getDirection() {
      let deg = this.reponse.wind.deg;
      
      switch (true) {
        case deg >= 337.5:
          return "N";
        case deg >= 292.5:
          return "NO";
        case deg >= 247.5:
          return "O";
        case deg >= 202.5:
          return "SO";
        case deg >= 157.5:
          return "S";
        case deg >= 112.5:
          return "SE";
        case deg >= 67.5:
          return "E";
        case deg >= 22.5:
          return "NE";
        default:
          return "N";
      }
    },
    getTime(time) {
      let date = new Date(time * 1000);
      let heures = date.getHours();
      let minutes = "0" + date.getMinutes();
      let secondes = "0" + date.getSeconds();

      return heures + ":" + minutes.substr(-2) + ":" + secondes.substr(-2);
    },
  },
};
</script>

<style scoped>
.info {
  width: 500px;
  margin: auto auto;
}

.info h1 {
  color: cornflowerblue;
  text-transform: uppercase;
}

.info h1 .ville {
  text-transform: capitalize;
}

.info h3,
.info p {
  display: inline-block;
}

.info h3 {
  font-size: 12px;
  margin: 0;  
}

.info p {
  font-size: 24px;
  padding: 5px 5px 0px 5px;
  color: rgb(148, 184, 250);
  font-weight: bold;
  margin: 0;
}

.icon {
  box-sizing: border-box;
  background-color: cornflowerblue;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
}

.icon img {
}
</style>