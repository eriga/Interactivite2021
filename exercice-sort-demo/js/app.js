import Cart_API from './Cart_API.js'

new Vue({
    el: '#app',
    
    data() {
        return {
            products: [],
            currentSort: null,
            filter: null
        }
    },
    
    mounted() {
        Cart_API.getList().then(data => {
            this.products = data.products
        })    
    },
    
    methods: {
        sort(key) {
            this.currentSort = key

            this.products = this.products.sort((a, b) => {
                if (typeof(a[key]) === "string") {
                    return a[key].localeCompare(b[key])
                } else {
                    return a[key] - b[key]
                }
            })
       },
       
       filterToggle(name) {
           if (this.filter === name) {
               this.filter = null
           } else {
               this.filter = name
           }
       }
    }, // end methods
})