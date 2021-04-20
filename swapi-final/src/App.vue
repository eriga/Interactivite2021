<template>
  <div></div>
</template>

<script>
import SWAPI from "./SWAPI";

export default {
  name: "App",
  components: {}, // fin COMPONENTS
  methods: {
    // Affichage de "En chargement..." avant
    // la réception des données
    showLoading() {
      let p = document.createElement("p");
      p.classList.add("loading");
      p.innerHTML = "En chargement...";
      document.body.appendChild(p);
    },
    // On enlève "En chargement.." après
    // la réception des données
    hideLoading() {
      document.querySelector(".loading").remove();
    },
    // Tri des personnages en fonction de leur grandeur
    sortByHeight(data) {
      return data.sort((a, b) => {
        // On s'assure que les valeurs sont entières
        let x = parseInt(a.height);
        let y = parseInt(b.height);

        // Vérification que les valeurs sont des nombres
        if (isNaN(x)) x = 0;
        if (isNaN(y)) y = 0;

        // x - y = 0 , pas de tri
        // x - y = 1, on inverse a et b
        // x - y = -1, pas de tri

        return x - y;
      });
    },
    // Affichage de la liste des personnages
    // triés en ordre croissant de grandeur
    showList(data) {
      for (let i = 0; i < data.length; i++) {
        let person = data[i];
        let height = parseFloat(person.height);

        // Si la grandeur n'est pas un nombre,
        // on arrête ce tour de boucle et on
        // passe au suivant avec continue;
        if (isNaN(height)) continue;

        let p = document.createElement("p");
        p.innerHTML = `${person.name} : ${person.height}`;

        // Affichage dans la page
        document.body.appendChild(p);
      }
    },
  }, // fin METHODS
  mounted() {
    this.showLoading();
    SWAPI.people().then((data) => {
      this.hideLoading();
      this.showList(this.sortByHeight(data));
    });
  }, // fin MOUNTED
};
</script>

<style>
@import url("https://rsms.me/inter/inter.css");
html {
  font-family: "Inter", sans-serif;
}
@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}

* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

p {
  margin: 0px;
}
</style>
