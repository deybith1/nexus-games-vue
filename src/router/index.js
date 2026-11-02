import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ProductosView from '../views/ProductosView.vue'
import FormularioProductoView from '../views/FormularioProductoView.vue'
import CarritoView from '../views/CarritoView.vue'
import NoEncontradoView from '../views/NoEncontradoView.vue'

const routes = [
  { path: '/', name: 'inicio', component: InicioView },
  { path: '/productos', name: 'productos', component: ProductosView },
  { path: '/productos/crear', name: 'crear-producto', component: FormularioProductoView },
  { path: '/productos/:id', name: 'editar-producto', component: FormularioProductoView, props: true },
  { path: '/carrito', name: 'carrito', component: CarritoView },
  { path: '/:pathMatch(.*)*', name: 'no-encontrado', component: NoEncontradoView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() { return { top: 0 } },
})

export default router
