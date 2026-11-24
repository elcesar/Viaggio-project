# Estrategia de despliegue

PR 01 no despliega. El build Vite genera `apps/web/dist/`, apto para publicar luego en S3 privado y distribuir con CloudFront. `index.html` debe tener caché corto; los assets con hash, caché larga.

El contenedor Nginx existe solo para validación y entornos internos. Producción tendrá desarrollo, staging y producción separados. No se incluyen claves AWS, secretos ni datos reales en el repositorio.
