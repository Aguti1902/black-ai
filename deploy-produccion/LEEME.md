# Subida manual a black-ai.ai (hosting Apache de Abierto365)

El dominio `black-ai.ai` apunta a `31.47.77.250`, el servidor Apache del hosting,
no a Vercel. Por eso los cambios que se suben a GitHub no se ven en la web: hay
que copiar los archivos compilados a mano.

Esta carpeta contiene **solo los 3 archivos que han cambiado**. El resto de la web
(vídeos, fotos, el worker de PDF, el `.htaccess`) ya está correcto en el servidor
y no hay que volver a subirlo.

## Archivos y dónde van

Se copian dentro de la carpeta pública del dominio, respetando la estructura
(la carpeta pública es la que ya contiene el `index.html` y la carpeta `assets`):

| Archivo de esta carpeta        | Destino en el servidor        |
| ------------------------------ | ----------------------------- |
| `assets/index-DQptneOV.js`     | `assets/index-DQptneOV.js`    |
| `assets/index-DtmK_NCP.css`    | `assets/index-DtmK_NCP.css`   |
| `index.html`                   | `index.html` (reemplaza)      |

## Orden de subida (importante)

1. Primero los dos archivos de `assets/`. Son nuevos, no sobrescriben nada.
2. **Después, y solo cuando los dos anteriores estén subidos**, reemplazar
   `index.html`.

El orden importa porque el `index.html` nuevo apunta a los archivos nuevos. Si se
sube primero, la web queda en blanco durante unos segundos hasta que terminen de
subir los demás.

## Comprobación

Tras subirlo, verificar que `index.html` pesa **2.634 bytes** en el servidor. Si
aparece con 0 bytes, la subida ha fallado y la web se verá en blanco: hay que
volver a subirlo.

Luego abrir `https://black-ai.ai/` con Ctrl+F5 (recarga forzada) y comprobar que
el código fuente de la página menciona `index-DQptneOV.js`.

## Qué incluye esta actualización

- La galería de imágenes en las noticias (editor y web pública).
- Las etiquetas `og:image`, que faltaban en el `index.html` que hay ahora en
  producción. Son las que hacen que LinkedIn muestre la imagen al compartir la web.

Las fotos que se suban desde el panel de administración van a Supabase Storage,
no a este servidor, así que no hay que subir nada más cada vez que se añada una
galería a una noticia.

## Limpieza opcional

Los archivos antiguos `assets/index-Dq-yfJ5s.js` y `assets/index-DWB_RF6N.css`
dejan de usarse y se pueden borrar. No molestan si se dejan.
