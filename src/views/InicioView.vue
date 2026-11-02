<script setup>
import { useProductosStore } from '../stores/productos'
import { useCarritoStore } from '../stores/carrito'
import { formatoPrecio } from '../utils/formato'

const productos = useProductosStore()
const carrito = useCarritoStore()
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow"><span class="pulse-dot"></span> TU UNIVERSO GAMER COMIENZA AQUÍ</div>
          <h1>El siguiente <em>nivel</em> comienza contigo.</h1>
          <p>Descubre nuevas aventuras, administra tus videojuegos favoritos y arma tu carrito en un solo lugar.</p>
          <div class="hero-actions">
            <router-link to="/productos" class="btn btn-primary btn-large">Explorar catálogo <span>↗</span></router-link>
            <router-link to="/productos/crear" class="btn btn-outline btn-large">+ Añadir juego</router-link>
          </div>
          <div class="hero-stats">
            <div><strong>{{ productos.cantidadProductos }}</strong><span>Juegos en catálogo</span></div>
            <div class="vertical-separator"></div>
            <div><strong>{{ carrito.cantidadTotal }}</strong><span>En tu carrito</span></div>
            <div class="vertical-separator"></div>
            <div><strong>100%</strong><span>Experiencia digital</span></div>
          </div>
        </div>
        <div class="hero-art" aria-label="Ilustración de tienda de videojuegos">
          <div class="hero-glow"></div>
          <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
          <div class="hero-float">✦ NEW DROP <span>2026</span></div>
          <div class="hero-console"><span class="console-spark spark-a">✧</span><span class="console-spark spark-b">✦</span>
            <div class="controller-body"><span class="cross">+</span><span class="controller-center">N</span><span class="controller-buttons">●<br />●</span></div>
          </div>
          <div class="hero-floating-card"><span class="floating-icon">⚡</span><div><strong>JUEGA SIN LÍMITES</strong><small>Explora. Elige. Disfruta.</small></div></div>
        </div>
      </div>
    </section>

    <section class="features-strip">
      <div class="container features-grid">
        <div><span>✦</span><strong>Catálogo dinámico</strong><small>Crea, edita y elimina productos</small></div>
        <div><span>◈</span><strong>Carrito inteligente</strong><small>Compra y calcula totales</small></div>
        <div><span>◎</span><strong>Todo en un lugar</strong><small>Navegación rápida sin recargas</small></div>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading">
        <div><div class="eyebrow">SELECCIÓN NEXUS</div><h2>Juegos <span>destacados</span></h2><p>Encuentra tu próxima aventura entre nuestros favoritos.</p></div>
        <router-link to="/productos" class="text-link">Ver todos los juegos ↗</router-link>
      </div>
      <div class="featured-grid" v-if="productos.destacados.length">
        <router-link v-for="producto in productos.destacados" :key="producto.id" to="/productos" class="featured-card" :class="`theme-${producto.tema}`">
          <span class="featured-icon">{{ producto.icono }}</span><span class="featured-info"><small>{{ producto.categoria }}</small><strong>{{ producto.nombre }}</strong><span>{{ formatoPrecio(producto.precio) }}</span></span><span class="featured-arrow">↗</span>
        </router-link>
      </div>
      <div v-else class="empty-state"><span>🎮</span><h3>Tu catálogo está vacío</h3><p>Crea el primer videojuego para comenzar.</p><router-link to="/productos/crear" class="btn btn-primary">Crear producto</router-link></div>
    </section>
    <section class="container bottom-callout"><div><span class="eyebrow">PANEL DE ADMINISTRACIÓN</span><h2>¿Tienes un nuevo juego?</h2><p>Gestiona tu catálogo completo desde una sola aplicación.</p></div><router-link class="btn btn-light" to="/productos/crear">+ Crear nuevo producto ↗</router-link></section>
  </div>
</template>
