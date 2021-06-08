<template>
  <div class="accueil" id="content">
    <main>
      <div class="titre">
        <h2>Vérifiez la météo d'une ville</h2>
        <h1>en temps réel</h1>
      </div>
      <form name="cityChoice" action="#" method="POST" @submit="submit">
        <input
          type="text"
          name="city"
          class="city"
          placeholder="Ville"
          v-model="city"
          required
        />
        <input type="submit" value="Envoyer" class="submit" />
      </form>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Accueil",
  components: {},
  data() {
    return {
      city: "",
    };
  }, // fin DATA
  methods: {
    submit(e) {
      e.preventDefault();
      this.$router.push({
        path: "/meteo/" + this.city,
      });
    },
  }, // fin METHODS
};
</script>

<style scoped>
.accueil {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.accueil .titre {
  color: cornflowerblue;
  text-decoration: underline;
  line-height: 1;
  padding: 10px;
  margin-bottom: 15px;
}

.accueil .titre > * {
  margin: 0;
}

.accueil input.city {
  width: 300px;
  border-radius: 8px;
  border: none;
  padding: 15px 15px;
  background: #464646;
  font-size: 16px;
  color: #ccc;
}

.accueil input.submit {
  border-radius: 8px;
  border: none;
  padding: 15px 15px;
  margin-left: 5px;
  background-color: cornflowerblue;
  font-size: 16px;
  color: #fff;
  transition: background-color 0.2s ease;
  cursor: pointer;
}
.accueil input.submit:hover {
  background-color: #0c4769;
}
</style>
