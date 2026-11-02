<script setup>
import { ref } from 'vue'
import { useProductosStore } from '../stores/productos'
import { useCarritoStore } from '../stores/carrito'
import { formatoPrecio } from '../utils/formato'

const props = defineProps({ producto: { type: Object, required: true } })
const productos = useProductosStore()
const carrito = useCarritoStore()
const confirmar = ref(false)
const agregado = ref(false)

function agregar() {
  carrito.agregar(props.producto)
  agregado.value = true
  setTimeout(() => { agregado.value = false }, 1300)
}
function eliminar() {
  productos.eliminar(props.producto.id)
  confirmar.value = false
}
</script>

<template>
  <article class="game-card">
    <div class="game-cover" :class="`theme-${producto.tema}`">
      <span class="cover-tag">{{ producto.categoria }}</span>
      <span class="cover-planet planet-one"></span>
      <span class="cover-planet planet-two"></span>
      <span class="cover-emoji" aria-hidden="true">{{ producto.icono }}</span>
      <span class="cover-title">{{ producto.nombre }}</span>
    </div>
    <div class="game-content">
      <div class="game-meta"><span class="game-category">{{ producto.categoria }}</span><span class="game-platform">PC DIGITAL</span></div>
      <h3>{{ producto.nombre }}</h3>
      <p class="game-description">{{ producto.descripcion }}</p>
      <div class="game-bottom">
        <div><span class="price-label">PRECIO</span><strong class="game-price">{{ formatoPrecio(producto.precio) }}</strong></div>
        <button class="btn btn-primary add-btn" type="button" @click="agregar">{{ agregado ? '✓ Agregado' : '+ Agregar' }}</button>
      </div>
      <div class="game-actions" v-if="!confirmar">
        <router-link :to="`/productos/${producto.id}`" class="action-link">✎ Editar</router-link>
        <button type="button" class="action-link danger-link" @click="confirmar = true">⌫ Eliminar</button>
      </div>
      <div class="delete-confirm" v-else>
        <span>¿Eliminar este juego?</span>
        <button type="button" class="mini-btn" @click="eliminar">Sí, eliminar</button>
        <button type="button" class="mini-btn ghost" @click="confirmar = false">Cancelar</button>
      </div>
    </div>
  </article>
</template>
