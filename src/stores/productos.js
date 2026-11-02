import { defineStore } from 'pinia'
import { useCarritoStore } from './carrito'

const STORAGE_KEY = 'nexus_vue_productos_v1'

export const CATEGORIAS = ['Acción', 'Aventura', 'Carreras', 'Estrategia', 'Indie']
export const TEMAS = ['violeta', 'turquesa', 'naranja', 'rosa', 'azul']
export const ICONOS = ['🎮', '🚗', '🚀', '⚔️', '🏎️', '🌌', '🕹️', '🧩', '🐉', '💎', '🎯', '👾']

const PRODUCTOS_INICIALES = [
  { id: '101', nombre: 'Neon Drift', precio: 499, categoria: 'Carreras', descripcion: 'Domina las calles del futuro en carreras de alta velocidad.', icono: '🏎️', tema: 'violeta' },
  { id: '102', nombre: 'Galaxy Raiders', precio: 649, categoria: 'Acción', descripcion: 'Explora galaxias desconocidas y supera batallas espaciales.', icono: '🚀', tema: 'azul' },
  { id: '103', nombre: 'Mystic Realms', precio: 579, categoria: 'Aventura', descripcion: 'Un mundo fantástico repleto de secretos por descubrir.', icono: '🐉', tema: 'turquesa' },
  { id: '104', nombre: 'Pixel Legends', precio: 299, categoria: 'Indie', descripcion: 'Una aventura retro con escenarios y desafíos únicos.', icono: '👾', tema: 'rosa' },
  { id: '105', nombre: 'Battle Tactics', precio: 799, categoria: 'Estrategia', descripcion: 'Planea tus movimientos y conquista cada partida.', icono: '⚔️', tema: 'naranja' },
  { id: '106', nombre: 'Cosmic Puzzle', precio: 349, categoria: 'Indie', descripcion: 'Resuelve enigmas ingeniosos a través del universo.', icono: '🧩', tema: 'azul' },
]

function cargarProductos() {
  try {
    const valor = localStorage.getItem(STORAGE_KEY)
    if (valor === null) return PRODUCTOS_INICIALES.map(producto => ({ ...producto }))
    const datos = JSON.parse(valor)
    if (!Array.isArray(datos)) throw new Error('Formato inválido')
    return datos.filter(p => p && typeof p.id === 'string' && typeof p.nombre === 'string' &&
      Number.isFinite(p.precio) && p.precio > 0 && typeof p.descripcion === 'string' &&
      CATEGORIAS.includes(p.categoria) && TEMAS.includes(p.tema) && ICONOS.includes(p.icono))
  } catch {
    return PRODUCTOS_INICIALES.map(producto => ({ ...producto }))
  }
}

function validar(datos) {
  const nombre = String(datos.nombre ?? '').trim()
  const descripcion = String(datos.descripcion ?? '').trim()
  const precio = Number(datos.precio)
  if (nombre.length < 3 || nombre.length > 60) throw new Error('El nombre debe tener entre 3 y 60 caracteres.')
  if (!Number.isFinite(precio) || precio <= 0 || precio > 1000000) throw new Error('El precio debe ser mayor que 0 y menor o igual a $1,000,000.')
  if (descripcion.length < 10 || descripcion.length > 240) throw new Error('La descripción debe tener entre 10 y 240 caracteres.')
  if (!CATEGORIAS.includes(datos.categoria)) throw new Error('Selecciona una categoría válida.')
  if (!TEMAS.includes(datos.tema)) throw new Error('Selecciona un tema visual válido.')
  if (!ICONOS.includes(datos.icono)) throw new Error('Selecciona un ícono válido.')
  return { nombre, descripcion, precio: Math.round(precio * 100) / 100, categoria: datos.categoria, tema: datos.tema, icono: datos.icono }
}

export const useProductosStore = defineStore('productos', {
  state: () => ({
    lista: cargarProductos(),
    busqueda: '',
    categoriaActiva: 'Todas',
  }),
  getters: {
    cantidadProductos: state => state.lista.length,
    productosFiltrados: state => state.lista.filter(producto => {
      const coincideCategoria = state.categoriaActiva === 'Todas' || producto.categoria === state.categoriaActiva
      const coincideTexto = `${producto.nombre} ${producto.descripcion} ${producto.categoria}`
        .toLocaleLowerCase('es').includes(state.busqueda.trim().toLocaleLowerCase('es'))
      return coincideCategoria && coincideTexto
    }),
    obtenerPorId: state => id => state.lista.find(producto => producto.id === String(id)),
    destacados: state => state.lista.slice(0, 3),
  },
  actions: {
    guardar() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lista)) } catch { /* almacenamiento no disponible */ }
    },
    buscar(texto) { this.busqueda = texto },
    filtrar(categoria) { this.categoriaActiva = categoria },
    crear(datos) {
      const producto = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...validar(datos) }
      this.lista.unshift(producto)
      this.guardar()
      return producto
    },
    editar(id, datos) {
      const indice = this.lista.findIndex(producto => producto.id === String(id))
      if (indice < 0) throw new Error('No se encontró el videojuego que quieres editar.')
      const actualizado = { ...this.lista[indice], ...validar(datos) }
      this.lista[indice] = actualizado
      this.guardar()
      useCarritoStore().sincronizarProducto(actualizado)
      return actualizado
    },
    eliminar(id) {
      const existe = this.lista.some(producto => producto.id === String(id))
      if (!existe) return
      this.lista = this.lista.filter(producto => producto.id !== String(id))
      this.guardar()
      // Evita que queden en el carrito productos eliminados del catálogo.
      useCarritoStore().eliminar(String(id))
    },
    restablecerDemo() {
      this.lista = PRODUCTOS_INICIALES.map(producto => ({ ...producto }))
      this.busqueda = ''
      this.categoriaActiva = 'Todas'
      this.guardar()
      useCarritoStore().vaciar()
    },
  },
})
