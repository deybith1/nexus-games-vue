<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductosStore, CATEGORIAS, ICONOS, TEMAS } from '../stores/productos'
import { formatoPrecio } from '../utils/formato'

const route = useRoute()
const router = useRouter()
const productos = useProductosStore()
const editando = computed(() => route.name === 'editar-producto')
const productoActual = computed(() => editando.value ? productos.obtenerPorId(route.params.id) : null)
const crearFormularioVacio = () => ({ nombre: '', descripcion: '', precio: '', categoria: 'Acción', tema: 'violeta', icono: '🎮' })
const formulario = ref(crearFormularioVacio())
const error = ref('')
const guardando = ref(false)

watch([editando, productoActual], () => {
  formulario.value = productoActual.value
    ? { nombre: productoActual.value.nombre, descripcion: productoActual.value.descripcion, precio: productoActual.value.precio,
        categoria: productoActual.value.categoria, tema: productoActual.value.tema, icono: productoActual.value.icono }
    : crearFormularioVacio()
  error.value = ''
}, { immediate: true })

function guardar() {
  error.value = ''
  guardando.value = true
  try {
    if (editando.value) productos.editar(route.params.id, formulario.value)
    else productos.crear(formulario.value)
    router.push('/productos')
  } catch (e) {
    error.value = e.message || 'No se pudo guardar el producto.'
  } finally {
    guardando.value = false
  }
}
</script>

<template>
  <div class="container page-section">
    <router-link to="/productos" class="back-link">← Volver al catálogo</router-link>
    <template v-if="!editando || productoActual">
      <div class="page-intro form-intro"><div><div class="eyebrow">PANEL DE ADMINISTRACIÓN</div><h1>{{ editando ? 'Editar' : 'Crear' }} <span>videojuego</span></h1><p>{{ editando ? 'Actualiza la información de tu producto.' : 'Completa los detalles para agregar un juego al catálogo.' }}</p></div></div>
      <div class="editor-grid">
        <form class="form-panel" @submit.prevent="guardar" novalidate>
          <div class="form-panel-heading"><span class="form-step">01</span><div><h2>Información del producto</h2><p>Los campos marcados son obligatorios.</p></div></div>
          <div v-if="error" role="alert" class="form-error">⚠ {{ error }}</div>
          <div class="form-row"><label for="nombre">Nombre del videojuego *</label><input id="nombre" v-model.trim="formulario.nombre" maxlength="60" type="text" placeholder="Ej. Neon Drift" required /></div>
          <div class="form-row"><label for="precio">Precio (MXN) *</label><div class="money-input"><span>$</span><input id="precio" v-model.number="formulario.precio" type="number" min="0.01" max="1000000" step="0.01" placeholder="499.00" required /></div></div>
          <div class="form-row"><label for="categoria">Categoría *</label><select id="categoria" v-model="formulario.categoria"><option v-for="categoria in CATEGORIAS" :key="categoria" :value="categoria">{{ categoria }}</option></select></div>
          <div class="form-row"><label for="descripcion">Descripción del videojuego *</label><textarea id="descripcion" v-model.trim="formulario.descripcion" rows="4" maxlength="240" placeholder="Escribe una breve descripción (mínimo 10 caracteres)..." required></textarea><small class="field-hint">{{ formulario.descripcion.length }} / 240 caracteres</small></div>
          <div class="form-row"><label for="tema">Color de portada *</label><select id="tema" v-model="formulario.tema"><option v-for="tema in TEMAS" :key="tema" :value="tema">{{ tema.charAt(0).toUpperCase() + tema.slice(1) }}</option></select></div>
          <div class="form-row"><label>Ícono de portada *</label><div class="icon-options"><button v-for="icono in ICONOS" :key="icono" type="button" :class="{ selected: formulario.icono === icono }" @click="formulario.icono = icono" :aria-label="`Seleccionar ícono ${icono}`">{{ icono }}</button></div></div>
          <div class="form-actions"><router-link to="/productos" class="btn btn-outline">Cancelar</router-link><button :disabled="guardando" class="btn btn-primary" type="submit">{{ editando ? 'Guardar cambios' : '+ Crear producto' }}</button></div>
        </form>
        <aside class="preview-panel"><div class="eyebrow">VISTA PREVIA EN VIVO</div><h3>Así se verá tu juego</h3>
          <div class="preview-game"><div class="game-cover preview-cover" :class="`theme-${formulario.tema}`"><span class="cover-tag">{{ formulario.categoria }}</span><span class="cover-planet planet-one"></span><span class="cover-emoji">{{ formulario.icono }}</span><span class="cover-title">{{ formulario.nombre || 'Tu videojuego' }}</span></div><div class="preview-copy"><small>PC DIGITAL</small><h4>{{ formulario.nombre || 'Nombre del videojuego' }}</h4><p>{{ formulario.descripcion || 'Aquí aparecerá la descripción de tu producto...' }}</p><strong>{{ formatoPrecio(Number(formulario.precio) || 0) }}</strong></div></div>
          <div class="preview-tip"><span></span> Gracias por crear tu juego con nosotros <strong></strong>.</div>
        </aside>
      </div>
    </template>
    <div v-else class="empty-state"><span>⚠️</span><h3>Producto no encontrado</h3><p>El producto que intentas editar ya no existe.</p><router-link to="/productos" class="btn btn-primary">Ir al catálogo</router-link></div>
  </div>
</template>
