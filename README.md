# LOVE — Guía del proyecto

Todo lo que hay que saber para usar y actualizar esta página. Escrito sin tecnicismos.

---

## 1. Tu página en internet

**https://kingslayer15124.github.io/love/**

Ese es el link que mandás por WhatsApp, por mail, o donde quieras.

- No hay que instalar nada.
- Funciona en celular, tablet y computadora.
- Tiene el candado de seguridad (HTTPS/SSL), por eso el candado aparece en el navegador.

Cualquiera que tenga el link puede verla. No hace falta cuenta ni login.

---

## 2. Ver los cambios en tu máquina

Antes de publicar, conviene ver cómo queda en tu computadora. Sirve para probar rápido, sin esperar internet.

```bash
cd /home/kingslayer14/projects/love
npm run dev
```

Después abrís en el navegador:

**http://localhost:5173**

Guardás el archivo y la página se actualiza sola. Para apagarlo, en la terminal: `Ctrl + C`.

> `localhost:5173` es solo tuyo. Nadie más puede verlo.
> Y `npm run dev` **no publica nada**. Solo lo ves vos.

---

## 3. Publicar cambios (lo importante)

Hacés el cambio en los archivos, guardás, y corrés **tres comandos**:

```bash
git add .
git commit -m "Lo que cambié"
git push
```

Y nada más. Eso es todo.

En unos 30 segundos el cambio está vivo en la URL del punto 1.

**Nunca más tenés que escribir `npm run build` ni arrastrar carpetas a ningún lado.**

### Ejemplo real

Si cambiaste los textos de las tarjetas en `src/tarjetas.js`:

```bash
git add .
git commit -m "Reemplazar textos de las tarjetas"
git push
```

El texto entre comillas es una descripción libre. Sirve para que vos (o GitHub) sepas qué cambiaste después. Poné lo que quieras.

---

## 4. Comprobar que se publicó bien

**En el navegador:** abrí la URL y recargá. Si te parece que no cambió, probá con `Ctrl + F5` (a veces el navegador guarda una copia vieja).

**Desde la terminal:**

```bash
gh run list --repo Kingslayer15124/love --limit 3
```

Cada línea es una publicación:

- `success` = salió bien, ya está en internet.
- `failure` = algo falló. Entrá a <https://github.com/Kingslayer15124/love/actions> y clickeá la corrida roja para ver el error.

También lo ves en la página del repo: pestaña **Actions**.

---

## 5. Qué es cada comando de git

Git es el sistema que guarda las versiones de tu código. Estos son los comandos que vas a usar:

| Comando | Qué hace |
|---|---|
| `git status` | Te dice qué archivos modificaste. **Correlo siempre antes de publicar.** |
| `git diff` | Te muestra línea por línea qué cambiaste exactamente. |
| `git add .` | "Elegí todo lo que cambié y preparalo". |
| `git commit -m "..."` | Guarda una versión con una nota de qué hiciste. |
| `git push` | Envía esa versión a internet (a GitHub), que es lo que dispara la publicación. |
| `git log --oneline` | Muestra el historial de versiones, la más reciente arriba. |
| `git pull` | Trae los cambios que se hicieron en GitHub. No lo necesitás si siempre trabajás solo en esta computadora. |

`add` + `commit` = "guardar". `push` = "subir a internet".

Comprobación rápida antes de publicar:

```bash
git status
git diff
```

Si `git status` lista archivos que no esperabas, mirá `git diff` para ver qué les hiciste.

---

## 6. La trampa de las rutas ⚠️

Este es el error más común y no se ve hasta que ya publicaste.

**Regla:** si una ruta empieza con `/`, funciona en tu computadora pero **se rompe en internet**.

```html
<!-- MAL: solo funciona con npm run dev -->
<link rel="icon" href="/public/imagen.svg" />

<!-- BIEN: funciona en los dos lugares -->
<link rel="icon" href="./imagen.svg" />
```

**Consecuencia práctica:** si tocás `index.html` y agregás un `<link>` o `<script>` con ruta que empiece con `/`, la página se verá perfecta en `localhost` pero **sale en blanco para el resto del mundo**.

**Reglas de rutas:**

- Archivos que están en la carpeta `public/` → escribilos con punto y barra: `./nombre-del-archivo.svg`
- Archivos que están dentro de `src/` y usás con `import` → `import './tal.js'` (normal, sin cambios, así funciona bien)

---

## 7. Qué se modificó en el proyecto

Esto es el registro técnico de los cambios que se hicieron para poder publicarlo:

| Archivo | Cambio | Por qué |
|---|---|---|
| `vite.config.js` | Se agregó `base: './'` en la línea 7 | Sin esto, el navegador pedía los archivos de estilos y código en la raíz del dominio y **la página salía en blanco**. |
| `index.html` | Línea 5: el favicon pasó de `/love/public/love-svgrepo-com.svg` a `./love-svgrepo-com.svg` | La ruta anterior solo funcionaba en modo desarrollo. En producción daba error y el ícono no aparecía. |
| `.github/workflows/deploy.yml` | Archivo nuevo | Publica la página automáticamente cada vez que hacés `git push`. |

Historial de versiones:

```
16df588  Agregar despliegue automatico a GitHub Pages
3cd2b3c  Primer commit
```

### Cómo funciona la publicación automática

`deploy.yml` es una "receta" que GitHub ejecuta sola en la nube cada vez que detectás un `push` a `main`:

1. Descarga tu código
2. Instala las dependencias (`npm ci`)
3. Compila la página (`npm run build`) → genera la carpeta `dist/`
4. Sube `dist/` a GitHub Pages y lo publica

Como los pasos 1 a 4 ocurren en la nube, tu computadora no hace nada de eso. Vos solo editás y hacés `git push`.

---

## 8. Cosas que faltan terminar

| Tema | Dónde |
|---|---|
| Las tarjetas dicen "Titulo 1", "Titulo 2" y "Lorem ipsum..." (texto de relleno) | `src/tarjetas.js` |
| La página dice `lang="en"` (inglés) pero el contenido es español | `index.html`, línea 2 |
| `README.md` es el de la plantilla de Vite, no explica nada de este proyecto | `README.md` |

Ninguna de las tres rompe nada. Son mejoras, no errores.

---

## 9. Si algún día querés un dominio propio

Por ahora tu dirección es `kingslayer15124.github.io/love/`, que pertenece a GitHub pero es gratis y permanente.

Si algún día comprás un dominio (hay algunos a 1 o 2 dólares el primer año), se conecta encima de lo que ya está hecho, sin rehacer nada: se agregan 3 registros DNS en el registrador y GitHub emite el certificado SSL solo en aproximadamente una hora.

No hay dominios gratuitos de verdad: lo que suele aparecer gratis son subdominios de otros (por ejemplo `.js.org`) que no te pertenecen y pueden quitártelos. Por eso la URL de GitHub es la opción más segura.

---

## 10. Resumen en 4 líneas

```bash
npm run dev                  # ver los cambios solo en mi máquina
git add . && git commit -m "mensaje" && git push    # publicar
```

Y la página está en **https://kingslayer15124.github.io/love/**
