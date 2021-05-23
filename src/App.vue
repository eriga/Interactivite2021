<template>
  <div id="app" class="container">
    <div class="row mb-2">
      <h1>Produits</h1>
    </div>
    <hr>
    <div 
      class="row" 
      :class="{active: produitActif && produitActif.id === produit.id}"
      v-for="produit in produits" 
      :key="produit.id"
      @click="setProduitActif(produit)"
    >
      <div class="col-auto thumbnail">
        <img :src="produit.image" :alt="produit.nom">
      </div>
      <div class="col nom">
        {{ produit.nom }}
      </div>
      <div class="col-3 prix">
        <strong>{{ produit.prix.toFixed(2) }}$</strong>
      </div>
      
    </div>
    <div class="row mt-5" v-show="produitActif !== null">
      <div id="paypal-bt"></div>
    </div>
    <div class="row mt-5" v-if="achatFinal">
      <h2 class="text-success">Merci pour votre achat!</h2>
    </div>

  </div>
</template>

<script>
const API_URL = "http://inter.ericgagne.net/api/revision/produits.json";

export default {
  name: 'App',
  data() {
    return {
      produits: [],
      produitActif: null,
      achatFinal: false,
    }
  }, // fin DATA
  
  mounted(){
    this.createPaypal();
    this.fetchData();
  }, // fin MOUNTED

  methods: {
    createPaypal(){
      const paypal_options = {
          createOrder: (data, actions) => {
              return actions.order.create({
                  purchase_units: [{
                      amount: {
                          value: this.produitActif.prix
                      }
                  }]
              });
          },

          onApprove: (data, actions) => {
              return actions.order.capture().then(details => {
                  this.achatFinal = true;
                  this.produitActif = null;
              });
          }
      }
      paypal.Buttons(paypal_options).render('#paypal-bt');
    },

    fetchData(){
      fetch(API_URL)
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          console.log(data);
          this.produits = data;
        })
    },

    setProduitActif(produit){
      if(this.produitActif && this.produitActif.id === produit.id){
        this.produitActif = null;
      } else {
        this.produitActif = produit;
      }

      this.achatFinal = false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.prix,
.nom,
.thumbnail {
  display: flex;
  align-items: center;
  height: 60px;
}

.nom {
  text-align: left;
}

.thumbnail {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60px;
}

.thumbnail img {
  max-width: 100%;
  max-height: 100%;
}

.row.active {
  background-color: #cfcfff;
}
.text-success {
  color: green;
}
</style>
