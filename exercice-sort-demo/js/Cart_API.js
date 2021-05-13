import { http_get } from './utils/request.js'

export default class Cart_API {
    static getList() {
        return http_get("http://inter.ericgagne.net/api/panier/products.json")
    }

    static loadCartFromMemory() {
        const items = localStorage.items

        if (items) {
            return JSON.parse(items)
        } else {
            return []
        }
    }

    static saveCartToMemory(items) {
        localStorage.items = JSON.stringify(items)
    }
}