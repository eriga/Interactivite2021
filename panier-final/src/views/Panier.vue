<template>
  <div>
    <nav class="navbar navbar-dark bg-primary" style="color: white;">
      <a href="#" style="color: white;">Panier</a>
      <router-link to="/" style="color: white;" class="btn btn-primary">Accueil</router-link>      
    </nav> 
    <div class="container">
        <h1>Mon panier</h1>
        <div class="row">
            <div class="col-1"><strong>ID</strong></div>
            <div class="col-3"><strong>Nom</strong></div>
            <div class="col-1"><strong>Prix</strong></div>
        </div>
        <div class="row" v-for="product in cart" :key="product.id">
            <div class="col-1">{{ product.id }}</div>
            <div class="col-3">{{ product.name }}</div>
            <div class="col-1">{{ product.price.toFixed(2) }}$</div>
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-3"></div>
            <div class="col-1">{{ getTotal().toFixed(2) }}$</div>
        </div>
    </div>     
  </div>
</template>

<script>
export default {
  name: 'Panier',
  
  data() {
    return {
        cart: [],
    }
  },

  mounted() {
      if(localStorage.cart){
          this.cart = JSON.parse(localStorage.cart);
      }
  },

  methods: {
      getTotal(){
          let total = 0;

          for(let product of this.cart){
              total += product.price;
          }

          return total;
      }
  }

}
</script>
<style>
</style>