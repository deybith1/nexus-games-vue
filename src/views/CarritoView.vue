<script setup>
import { useCarritoStore } from '../stores/carrito'
import { formatoPrecio } from '../utils/formato'

const carrito = useCarritoStore()
</script>

<template>
  <div class="container page-section">
    <div class="page-intro"><div><div class="eyebrow">TU SELECCIÓN</div><h1>Mi <span>carrito</span></h1><p>Revisa tus videojuegos y el resumen del pedido.</p></div><router-link to="/productos" class="btn btn-outline">← Seguir explorando</router-link></div>
    <div v-if="carrito.items.length" class="cart-grid">
      <div class="cart-items"><div class="cart-items-title"><h2>Tus videojuegos <span>({{ carrito.cantidadTotal }})</span></h2><button type="button" @click="carrito.vaciar()">Vaciar carrito</button></div>
        <div v-for="item in carrito.items" :key="item.id" class="cart-item">
          <div class="cart-thumb" :class="`theme-${item.tema}`"><span>{{ item.icono }}</span></div>
          <div class="cart-info"><small>{{ item.categoria }}</small><h3>{{ item.nombre }}</h3><span class="cart-unit-price">{{ formatoPrecio(item.precio) }} / unidad</span><button type="button" @click="carrito.eliminar(item.id)" class="cart-remove">Eliminar</button></div>
          <div class="cart-right"><strong>{{ formatoPrecio(item.precio * item.cantidad) }}</strong><div class="quantity-picker"><button type="button" :aria-label="`Quitar una unidad de ${item.nombre}`" @click="carrito.disminuir(item.id)">−</button><span>{{ item.cantidad }}</span><button type="button" :aria-label="`Agregar una unidad de ${item.nombre}`" @click="carrito.aumentar(item.id)">+</button></div></div>
        </div>
      </div>
      <aside class="order-summary"><div class="summary-heading"><span>◈</span><h2>Resumen del pedido</h2></div>
        <div class="summary-line"><span>Productos ({{ carrito.cantidadTotal }})</span><strong>{{ formatoPrecio(carrito.total) }}</strong></div>
        <div class="summary-line"><span>Envío digital</span><strong class="free-shipping">GRATIS</strong></div>
        <div class="summary-divider"></div>
        <div class="summary-total"><span>Total</span><strong>{{ formatoPrecio(carrito.total) }}</strong></div>
        <p class="summary-note">Precios finales de demostración. No se procesan pagos reales.</p>
        <div class="summary-finished"><span>✓</span> Tu pedido está listo para revisar</div>
      </aside>
    </div>
    <div v-else class="empty-state empty-cart"><span>🛒</span><h3>Tu carrito está vacío</h3><p>Agrega algunos videojuegos desde el catálogo y aparecerán aquí.</p><router-link to="/productos" class="btn btn-primary btn-large">Explorar videojuegos ↗</router-link></div>
  </div>
</template>
