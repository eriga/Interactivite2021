<template>
  <div id="login">
      <form action="#" @submit.prevent="submit">
        <div>
            <!-- <input v-model="nom" class="nom" type="text" placeholder="Nom d'utilisateur"> -->
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Nom d'utilisateur</span>
              <input v-model="nom" type="text" class="form-control " required>
            </div>
        </div>
        <div>
            <input v-model="hue" class="couleur form-range" type="range" min="0" max="360">
            <img class="personnage" src="../images/chat.png" :style="{filter: `hue-rotate(${hue}deg)`}">
        </div>
        <div>
            <input class="btn btn-primary submit" type="submit" value="Connexion">
        </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      nom: "",
      hue: 0
    }
  },

  mounted(){},

  methods: {
    previewCouleur(e){this.hue = e.target.value},

    submit() {
      if(this.nom !== "") this.$router.push(`/jeu/${this.nom}/${this.hue}`);      
    }
  }
}
</script>

<style>
#login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
#login form {
    width: 300px;
    height: auto;
}
#login input.nom {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    margin-bottom: 20px;
}
#login input.couleur {
    width: 100%;
}
#login .personnage {
    width: 50%;
}
#login .submit {
    margin-top: 30px;
    font-size: 24px;
}
</style>