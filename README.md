# Mas del Molí — sitio web

Sitio web multi-página para "Mas del Molí" (casa rural histórica en Reus, Costa Daurada), pensado como escaparate de marca: fotografía grande, historia de la casa, entorno y un apartado de "Compromiso" (turismo consciente). **Las reservas no se gestionan aquí**: cada botón "Reservar" enlaza directamente al motor de reservas ya existente en Lodgify (`https://masdelmoli.lodgify.com/`).

Es un sitio 100% estático (HTML + CSS + JS vanilla, sin build ni dependencias), pensado para desplegarse gratis en **Cloudflare Pages** desde un repositorio de **GitHub**.

## Estructura

```
site/
├── index.html        Inicio
├── la-casa.html       Historia + espacios + servicios
├── galeria.html        Galería completa con filtros y lightbox
├── entorno.html        Ubicación, puntos de interés, mapa
├── compromiso.html     Turismo consciente / sostenibilidad
├── contacto.html        Contacto + CTA de reserva
├── css/style.css       Estilos (una sola hoja, variables CSS arriba del todo)
├── js/main.js           Menú móvil, animaciones, lightbox, filtros
└── images/
    ├── large/           Fotos a 1600px (hero, secciones grandes)
    └── thumb/            Fotos a 700px (miniaturas de galería)
```

Todas las fotos son las mismas que ya existen en el anuncio actual de Lodgify (son fotos reales de la casa, no de stock).

## Ver el sitio en local

No hace falta ningún framework. Basta con servir la carpeta `site/` como archivos estáticos, por ejemplo:

```bash
# con Python
python3 -m http.server 8080 --directory site

# o con Node (npx)
npx serve site
```

Y abrir `http://localhost:8080`.

## Desplegar: GitHub + Cloudflare Pages

1. **Crear el repositorio en GitHub**
   ```bash
   cd site
   git init
   git add .
   git commit -m "Sitio Mas del Molí"
   gh repo create mas-del-moli-web --public --source=. --remote=origin --push
   ```
   (o crea el repo desde github.com y haz `git remote add origin <url>` + `git push -u origin main`)

2. **Conectar Cloudflare Pages**
   - Entra en [dash.cloudflare.com](https://dash.cloudflare.com) → *Workers & Pages* → *Create* → *Pages* → *Connect to Git*.
   - Elige el repositorio recién creado.
   - Framework preset: **None**. Build command: (vacío). Output directory: `/` (la raíz del repo, ya que `site/` sería el propio repo).
   - Deploy. Cloudflare te da una URL `*.pages.dev` al momento.

3. **Dominio propio (opcional)**
   - En el proyecto de Pages → *Custom domains* → añade tu dominio (por ejemplo `masdelmoli.com`).
   - Si el dominio está en Cloudflare, se activa solo. Si está en otro registrador, te dará los registros DNS (CNAME) a añadir.

Cada `git push` a `main` vuelve a desplegar el sitio automáticamente.

## Cosas a personalizar antes de publicar

- **Instagram**: el enlace del icono en el pie de página apunta a `instagram.com` genérico — cámbialo por el perfil real (o quítalo si no existe).
- **Formulario de contacto**: usa `mailto:` (abre el cliente de correo del visitante). Si prefieres un formulario que llegue directo a tu bandeja sin depender del cliente de correo, se puede conectar a un servicio como Formspree o Web3Forms en cinco minutos.
- **Mapa**: el iframe usa OpenStreetMap centrado en Reus (sin marcador exacto, por privacidad hasta confirmar contigo las coordenadas exactas). Si quieres el pin exacto sobre la casa, dímelo y lo ajusto.
- **Textos**: todo el copy (historia, compromiso, entorno) está escrito a partir de la info pública del anuncio actual — revísalo y dime qué matizar.
- **Favicon**: `images/favicon.svg` es un monograma provisional ("M" sobre círculo terracota); si tienes un logotipo real, lo sustituimos.

## Enlaces de reserva

Todos los botones "Reservar" / "Reservar ahora" apuntan a `https://masdelmoli.lodgify.com/`. Si cambiáis de motor de reservas en el futuro, es el único sitio a actualizar (búsqueda global de esa URL en el repo).
