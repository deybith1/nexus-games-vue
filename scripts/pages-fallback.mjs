// GitHub Pages sirve 404.html para rutas profundas. Se copia el HTML de la SPA
// para que Vue Router pueda interpretar /productos, /carrito, etc., al recargar.
import { copyFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
console.log('Generado dist/404.html para las rutas de GitHub Pages.')
