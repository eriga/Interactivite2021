<template>
<div>
    <nav class="navbar navbar-light bg-light">
        <a href="#">Accueil</a>
        <router-link to="/panier" class="btn btn-primary">
            Panier ({{ cart.length }})
        </router-link>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Accueil</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-3" v-for="product in products" :key="product.id">
                <div class="card mt-4">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <a href="#" class="btn btn-primary" @click="ajouter(product)">Ajouter</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accueil',
  data() {
    return {
      products: [],
      cart: [], 
    }
  }, // fin DATA


  mounted() {
        const API_URL = "http://inter.ericgagne.net/api/panier/products.json";

        fetch(API_URL).then(resp => {
            resp.json().then(data => {
                this.products = data.products
            })
        })

        if (localStorage.cart) {
            this.cart = JSON.parse(localStorage.cart)
        }
    }, // fin MOUNTED


    methods: {

      ajouter(product) {
          this.cart.push(product)
          this.sauvegarderCart()
      },

      sauvegarderCart() {
          localStorage.cart = JSON.stringify(this.cart)
      }

    }, // fin METHODS
}
</script>

<style scoped>

</style>
