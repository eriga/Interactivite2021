<template>
<div>
    <nav class="navbar navbar-dark bg-primary" style="color: white;">
      <a href="#" style="color: white;">Panier</a>
      <router-link to="/" style="color: white;" class="btn btn-primary">Accueil</router-link>      
    </nav> 
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Mon panier</h1>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-1"><strong>ID</strong></div>
            <div class="col-3"><strong>Nom du produit</strong></div>
            <div class="col-1"><strong>Prix</strong></div>
        </div>

        <hr>

        <div class="row" v-for="product in cart" :key="product.id">
            <div class="col-1">{{ product.id }}</div>
            <div class="col-3">{{ product.name }}</div>
            <div class="col-1">{{ product.price.toFixed(2) }}$</div>
        </div>

        <hr>
        
        <div class="row">
            <div class="col-1"></div>
            <div class="col-3"></div>
            <div class="col-1">{{ getTotal().toFixed(2) }}$</div>
            <div class="col-2" id="paypal-bt"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "Panier",

  data() {
        return {
            cart: [],
        }
  }, // fin DATA

  mounted() {
      if (localStorage.cart) {
          this.cart = JSON.parse(localStorage.cart)
      }

      this.createPaypal();
  }, // fin MOUNTED

  methods: {

      getTotal() {
          let total = 0

          for (let product of this.cart) {
              total += product.price
          }

          return total
      },

      createPaypal(){
          let options = {
              // Arrow functions (fonction à flèche)
                createOrder: (data, actions) => {
                    // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: this.getTotal()
                            }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    // This function captures the funds from the transaction.
                    return actions.order.capture().then((details) => {
                        // vider le panier
                        // rediriger l'utilisateur vers une confirmation
                        // this.$router.push({path: '/panier/confirmation'})
                        alert("Transaction réussie!");
                        this.$router.push({path: '/'});
                    });
                }
            };

            paypal.Buttons(options).render('#paypal-bt');
      }

  }, // fin METHODS
}
</script>


<style scoped>

</style>
