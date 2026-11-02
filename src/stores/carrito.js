import { defineStore } from 'pinia'

const STORAGE_KEY = 'nexus_vue_carrito_v1'

function cargarCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(datos)) return []
    return datos.filter(item =>
      item && typeof item.id === 'string' && typeof item.nombre === 'string' &&
      Number.isFinite(item.precio) && item.precio >= 0 &&
      Number.isInteger(item.cantidad) && item.cantidad > 0
    )
  } catch {
    return []
  }
}

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    items: cargarCarrito(),
  }),
  getters: {
    cantidadTotal: (state) => state.items.reduce((total, item) => total + item.cantidad, 0),
    total: (state) => state.items.reduce((total, item) => total + item.precio * item.cantidad, 0),
  },
  actions: {
    guardar() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items)) } catch { /* almacenamiento no disponible */ }
    },
    agregar(producto) {
      const existente = this.items.find(item => item.id === producto.id)
      if (existente) {
        existente.cantidad += 1
      } else {
        this.items.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          icono: producto.icono,
          tema: producto.tema,
          categoria: producto.categoria,
          cantidad: 1,
        })
      }
      this.guardar()
    },
    aumentar(id) {
      const item = this.items.find(item => item.id === id)
      if (item) { item.cantidad += 1; this.guardar() }
    },
    disminuir(id) {
      const item = this.items.find(item => item.id === id)
      if (!item) return
      if (item.cantidad <= 1) this.eliminar(id)
      else { item.cantidad -= 1; this.guardar() }
    },
    eliminar(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.guardar()
    },
    vaciar() {
      this.items = []
      this.guardar()
    },
    sincronizarProducto(producto) {
      const item = this.items.find(item => item.id === producto.id)
      if (!item) return
      Object.assign(item, {
        nombre: producto.nombre,
        precio: producto.precio,
        icono: producto.icono,
        tema: producto.tema,
        categoria: producto.categoria,
      })
      this.guardar()
    },
  },
})
