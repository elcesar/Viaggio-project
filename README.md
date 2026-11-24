# Viaggio

**Viaggio** es un producto digital orientado a la gestión integral de giras de estudio y al ecosistema que participa en su planificación, financiamiento, organización y ejecución.

## Objetivo

Construir una plataforma comercial reutilizable que conecte y apoye a colegios, generaciones, familias, comisiones, proveedores y aliados durante el ciclo completo de una gira de estudio.

## Caso de referencia inicial

El desarrollo toma como caso de referencia inicial la experiencia de **Viaggio in Italia – Generazione 2028 de la Scuola Italiana Vittorio Montiglio**.

Este caso se utiliza para identificar, modelar y validar necesidades reales de organización, actividades, turnos, asistencia, puntos, recaudación y coordinación. No limita el producto a ese colegio ni a esa generación.

## Etapa actual

La demo estática en `demo/` se mantiene disponible como referencia comercial y rollback. La migración productiva comenzó en `apps/web/`, una aplicación React con Vite que incorpora el Home ficticio del apoderado y una base modular para los siguientes dominios. Esta rama no contiene backend, autenticación real, datos reales ni despliegue AWS.

## Estructura

- `demo/`: prototipo navegable existente, preservado sin cambios.
- `apps/web/`: aplicación React/Vite en migración.
- `docs/`: documentación funcional, arquitectura, seguridad y migración.
- `infrastructure/nginx/`: configuración de validación de SPA en contenedor.

## Aplicación React

Requisitos: Node 22 y pnpm 10.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

El build se genera en `apps/web/dist/`. El `Dockerfile` valida la SPA detrás de Nginx con fallback de rutas. No publica ni ejecuta JSX en S3: Vite compila los assets antes de un futuro despliegue en S3 privado y CloudFront.

## Próximos pasos

El detalle de PR 01 y la hoja de ruta están en [docs/migration](docs/migration/PR01_SUMMARY.md). La arquitectura objetivo se documenta en [AWS target](docs/architecture/AWS_TARGET_ARCHITECTURE.md) y los límites de seguridad en [Security model](docs/security/SECURITY_MODEL.md).

## Preparación para producción

La aplicación no está autorizada aún para manejar datos reales de familias, documentos ni fondos. El estado verificable, los bloqueos y la secuencia de salida están en [la evaluación de producción](docs/operations/PRODUCTION_READINESS.md). La rama contiene validaciones de calidad, secretos y dependencias; estas validaciones no sustituyen autenticación, autorización de servidor, operación AWS, respaldo ni revisión legal.

## Base para el MVP

La definición ejecutable de la primera versión está en
[`docs/PLAN_MVP_PRODUCCION.md`](docs/PLAN_MVP_PRODUCCION.md). Resume el
alcance, arquitectura, datos, pantallas, permisos, seguridad y fases sin
reemplazar la documentación exploratoria existente.

El alcance comercial organizado para salir a ofrecer la V1.0 a colegios y
agencias está en [`docs/ALCANCE_MVP_V1_0.md`](docs/ALCANCE_MVP_V1_0.md).
Detalla los recorridos que deben operar, los límites de la primera versión y lo
que se reserva para una fase de pagos o transacciones regulada.

Los supuestos iniciales se registran en [`SUPUESTOS.md`](SUPUESTOS.md).
