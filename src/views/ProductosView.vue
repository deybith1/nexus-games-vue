<script setup>
import ProductoCard from '../components/ProductoCard.vue'
import { useProductosStore, CATEGORIAS } from '../stores/productos'

const productos = useProductosStore()
const categorias = ['Todas', ...CATEGORIAS]
</script>

<template>
  <div class="container page-section">
    <div class="page-intro"><div><div class="eyebrow">EL CATÁLOGO</div><h1>Explora los <span>videojuegos</span></h1><p>Tu próxima aventura está a un clic. Encuentra, administra y agrega tus favoritos.</p></div>
      <router-link class="btn btn-primary" to="/productos/crear">+ Nuevo producto</router-link></div>
    <div class="catalog-controls">
      <div class="search-box"><span>⌕</span><input type="search" placeholder="Buscar videojuegos..." :value="productos.busqueda" @input="productos.buscar($event.target.value)" aria-label="Buscar productos" /></div>
      <span class="results-label">{{ productos.productosFiltrados.length }} resultados</span>
    </div>
    <div class="category-tabs" aria-label="Filtrar por categoría">
      <button v-for="categoria in categorias" :key="categoria" type="button" :class="{ active: productos.categoriaActiva === categoria }" @click="productos.filtrar(categoria)">{{ categoria }}</button>
    </div>
    <div class="product-grid" v-if="productos.productosFiltrados.length">
      <ProductoCard v-for="producto in productos.productosFiltrados" :key="producto.id" :producto="producto" />
    </div>
    <div v-else class="empty-state"><span>🔎</span><h3>No encontramos videojuegos</h3><p>Prueba otra búsqueda o categoría, o crea un nuevo producto.</p>
      <button class="btn btn-outline" type="button" @click="productos.buscar(''); productos.filtrar('Todas')">Limpiar filtros</button>
    </div>
    <div class="reset-demo"><span>¿Quieres volver a los productos iniciales?</span><button type="button" @click="productos.restablecerDemo()">Restablecer demostración ↻</button></div>
  </div>
</template>
