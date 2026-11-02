<script setup>
import { ref } from 'vue'
import { useCarritoStore } from './stores/carrito'

const carrito = useCarritoStore()
const menuAbierto = ref(false)
function cerrarMenu() { menuAbierto.value = false }
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="container nav-inner">
        <router-link class="brand" to="/" @click="cerrarMenu" aria-label="Nexus Games - Inicio">
          <span class="brand-icon">N<span>.</span></span>
          <span class="brand-name">NEXUS<span>GAMES</span></span>
        </router-link>
        <button class="mobile-menu-btn" type="button" @click="menuAbierto = !menuAbierto" :aria-expanded="menuAbierto" aria-label="Abrir menú">
          <span v-if="menuAbierto">✕</span><span v-else>☰</span>
        </button>
        <nav class="nav-links" :class="{ 'open': menuAbierto }" aria-label="Navegación principal">
          <router-link to="/" @click="cerrarMenu">Inicio</router-link>
          <router-link to="/productos" @click="cerrarMenu">Productos</router-link>
          <router-link to="/productos/crear" @click="cerrarMenu">+ Crear producto</router-link>
          <router-link to="/carrito" class="cart-nav" @click="cerrarMenu">
            <span>🛒 Carrito</span>
            <span class="cart-count">{{ carrito.cantidadTotal }}</span>
          </router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <div><strong>NEXUS<span>GAMES</span></strong><p>Tu próxima aventura comienza aquí.</p></div>
        <span>te damos la mejor experiencia que te mereces</span>
      </div>
    </footer>
  </div>
</template>
