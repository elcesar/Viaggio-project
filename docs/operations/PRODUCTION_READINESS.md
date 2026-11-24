# Preparación para producción

Actualizado: 2026-11-24. Este documento registra evidencia técnica de la rama de migración. No es una autorización automática para tratar datos reales, custodiar fondos ni publicar una aplicación productiva.

## Veredicto actual

| Uso | Estado | Condición |
| --- | --- | --- |
| Demo comercial sin datos personales | Apto con advertencia | La demo publicada continúa siendo estática y local. |
| Revisión técnica de React | Apto para revisión | PR 01, PR 02 y PR 03 están abiertos y con CI aprobado. |
| Piloto con datos personales, documentos o cuentas familiares reales | Bloqueado | Faltan identidad, autorización de servidor, base de datos, auditoría y operación segura. |
| Producción para colegios | Bloqueado | Faltan todos los controles de la columna de salida a producción. |
| Custodia o recaudación de fondos por Viaggio | Fuera del alcance V1 | No se habilita hasta definir modelo legal, proveedor de pagos y controles financieros. |

## Evidencia revisada

- `demo/` se preserva como referencia y rollback; no es un sistema productivo.
- `apps/web/` contiene React/Vite, rutas, layout responsive, mocks separados, esquemas Zod y pruebas para Home, organización, familias y finanzas.
- Las ramas encadenadas `feature/react-foundation`, `feature/trip-family-migration` y `feature/finance-ledger-foundation` permanecen abiertas para revisión humana antes de fusionarse.
- El CI actual ejecuta lint, pruebas unitarias y de componentes, build, Playwright y build de contenedor. También incorpora análisis de secretos y auditoría de dependencias de producción.
- Los montos y registros de familias actuales son datos ficticios. Los repositorios de frontend no llaman una API real.

## Matriz de salida

| Dominio | Estado real | Requisito para piloto con datos reales | Requisito para producción |
| --- | --- | --- | --- |
| Código React | En migración con mocks | Fusionar PR 01 a PR 03, revisión de código y pruebas de regresión | Versionado y despliegue reproducible desde `main` protegido |
| Identidad | No implementada | Cognito, recuperación de cuenta, sesiones y MFA para tesorería/presidencia | MFA exigible por política, revocación, monitoreo e incidentes |
| Autorización | No implementada | API deriva identidad, tenant, colegio, curso, gira y rol desde JWT | Pruebas de aislamiento entre tenant, colegio, curso, gira y familia en cada versión |
| API y datos | No implementados | API modular, PostgreSQL, migraciones y auditoría | Alta disponibilidad razonable, restauración probada y controles de cambio |
| Finanzas | Maqueta con reglas documentadas | Libro inmutable, idempotencia, reversas, aprobaciones y conciliación | Auditoría, alertas, cierres y política contractual; sin custodiar fondos en V1 |
| Documentos | No implementados | S3 privado, URL prefirmada, autorización por objeto y análisis antimalware | Cifrado KMS, retención, borrado, Data Events y pruebas de recuperación |
| AWS | Solo arquitectura documentada | Cuenta AWS separada, entornos dev y staging, IaC revisada | CloudFront, WAF, ACM, Route 53, redes privadas, ECR/EKS, observabilidad y DR |
| Observabilidad | No implementada | Logs estructurados, correlation ID, alertas básicas y panel de salud | Métricas, trazas, retención, runbooks, alertas y responsable de guardia |
| Privacidad y cumplimiento | Pendiente | Inventario de datos, consentimiento versionado, retención y términos revisados | Evaluación legal vigente, DPA con proveedores y proceso de derechos de titulares |
| Operación | Pendiente | Mesa de ayuda, administración de colegios, onboarding y respaldo de soporte | Capacitación, SLA, proceso de incidentes y piloto aceptado por colegios |

## Controles de seguridad que no se pueden simular en frontend

1. Un selector de rol o contexto en el navegador nunca autoriza acceso a datos.
2. La API debe negar por defecto cualquier recurso cuyo `tenant_id`, `school_id`, `course_id`, `trip_project_id` o `family_account_id` no coincida con el contexto derivado del JWT.
3. Las entidades de negocio deben conservar `created_at`, `created_by`, `updated_at` y `updated_by`; las financieras además deben tener `idempotency_key`, motivo y referencia de reversa.
4. PostgreSQL debe aplicar Row Level Security donde corresponda, complementando y no reemplazando la autorización de la API.
5. Ninguna clave AWS, token, contraseña ni URL firmada se almacena en el repositorio, en `VITE_*`, en `localStorage` ni en una URL.
6. Los documentos médicos quedan fuera del MVP hasta definir base legal, finalidad, acceso restringido, cifrado y retención.

## Secuencia obligatoria de construcción

1. Revisar y fusionar en orden PR 01, PR 02 y PR 03, sin saltar la revisión humana.
2. Migrar documentos, comunicaciones, calendario, votaciones y eventos usando contratos y mocks; no agregar funciones a `demo/`.
3. Construir autenticación, backend modular, PostgreSQL, migraciones, auditoría y pruebas de aislamiento antes de cargar información real.
4. Implementar almacenamiento privado, trabajos asíncronos, notificaciones y adaptadores externos.
5. Crear infraestructura como código y los entornos AWS separados, empezando por desarrollo y staging.
6. Ejecutar hardening, prueba de restauración, prueba de carga, revisión de privacidad y piloto controlado antes de producción.

## Puertas de aprobación

| Puerta | Responsable mínimo | Evidencia requerida |
| --- | --- | --- |
| Revisión de código | Tecnología | PR aprobado, CI en verde, sin secretos ni dependencias críticas |
| Staging | Tecnología y operaciones | IaC revisada, entorno aislado, pruebas de integración y monitoreo básico |
| Piloto | Tecnología, operaciones y responsable legal | Identidad, aislamiento de datos, respaldos, consentimiento, términos y soporte |
| Producción | Dirección, tecnología, operaciones y asesoría legal | Checklist completo, prueba de restauración, plan de incidentes, aceptación del piloto |

## Límites conocidos

- El contenedor valida el build de la SPA. El frontend final se publicará en S3 privado detrás de CloudFront, no como servidor de aplicación en EKS.
- El análisis de dependencias cubre paquetes de producción declarados; no reemplaza un análisis SAST, revisión manual, pruebas de penetración ni monitoreo continuo.
- La evaluación jurídica, tributaria y contractual debe realizarla un profesional habilitado antes de firmar con colegios, familias, agencias o proveedores de pago.
