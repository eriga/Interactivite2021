import List from './pages/List'
import Cart from './pages/Cart'

export default new VueRouter({
    routes: [
        { path: '/', component: List },
        { path: '/cart', component: Cart },
    ],
})