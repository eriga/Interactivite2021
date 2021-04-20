<template>
  <div></div>
</template>

<script>
import SWAPI from "./SWAPI";

export default {
  name: "Crawl",
  components: {}, // fin COMPONENTS
  methods: {
    showCrawl(ep) {
      // Création du div contenant le texte qui défile
      let container = document.createElement("div");
      container.classList.add("crawl");
      document.body.appendChild(container);

      let texte = ep.opening_crawl;
      console.log(ep);

      // Remplacement des '\r\n' dans le texte par des balises <br>
      texte = texte.split("\r\n").join("<br>");

      container.innerHTML = texte;
    },
  }, // fin METHODS
  mounted() {
    SWAPI.films().then((data) => {
      data.sort((a, b) => a.episode_id - b.episode_id);

      // Suppression des boutons déjà existants s'il y a lieu
      let boutons = document.getElementsByClassName("boutons");
      if (boutons) {
        for (let bouton of boutons) {
          bouton.parentNode.removeChild(bouton);
        }
      }

      // Création de la zone des boutons
      let buttons = document.createElement("div");
      buttons.classList.add("boutons");
      document.body.appendChild(buttons);

      // Ajout des boutons pour chaque film et affichage
      // du "crawl"
      for (let ep of data) {
        let bt = document.createElement("input");
        bt.type = "button";
        bt.value = ep.episode_id;
        buttons.appendChild(bt);

        bt.addEventListener("click", () => {
          this.showCrawl(ep);
          buttons.remove();
        });
      }
    });
  }, // fin MOUNTED
};
</script>

<style>
body {
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Hyades.jpg/1200px-Hyades.jpg");
  background-size: cover;
  overflow: hidden;
}

.crawl {
  color: rgb(228, 225, 46);
  font-size: 42px;
  text-align: center;
  animation: crawl-animation 155s;
}

@keyframes crawl-animation {
  0% {
    transform: perspective(220px) rotateX(20deg) translateY(700px);
  }
  100% {
    transform: perspective(220px) rotateX(20deg) translateY(-5000px);
  }
}
</style>