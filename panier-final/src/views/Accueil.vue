<template>
  <div>
    <nav class="navbar navbar-dark bg-primary" style="color: white;">
      <a href="#" style="color: white;">Accueil</a>
      <router-link to="/panier" style="color: white;" class="btn btn-primary">Panier ({{ cart.length }})</router-link>      
    </nav>
    <div class="container">
        <h1>Accueil</h1>

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

  mounted(){
      const API_URL = "http://inter.ericgagne.net/api/panier/products.json";

      fetch(API_URL).then(resp => {
          resp.json().then(data => {
              this.products = data.products;
              //console.log(data);
          })
      })

      if(localStorage.cart){
          this.cart = JSON.parse(localStorage.cart);
      }
  }, // fin MOUNTED

  methods: {
      ajouter(product) {
          this.cart.push(product);

          this.sauvegarderCart();
      },

      sauvegarderCart(){
          localStorage.cart = JSON.stringify(this.cart);
      }
  }
}
</script>