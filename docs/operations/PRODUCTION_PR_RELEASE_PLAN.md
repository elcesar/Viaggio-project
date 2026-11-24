# Plan ordenado de PR para producción

Actualizado: 2026-11-24. Documento de coordinación para que César revise cada Pull Request antes de aprobar su avance. Este plan no implica que AWS exista, que se hayan creado recursos ni que un módulo esté listo antes de que su PR pase revisión y CI.

## Reglas de liberación

1. Un PR aborda un dominio o una capacidad operativa acotada; no se mezclan migración UI, identidad y despliegue cloud en una sola entrega.
2. Cada PR declara alcance, riesgos, migraciones, pruebas y procedimiento de reversa.
3. Datos de colegios, familias, alumnos, documentos y finanzas continúan siendo ficticios hasta que identidad, autorización del servidor y separación multiinstitución estén desplegadas y probadas.
4. La autorización de interfaz nunca sustituye autorización de API.
5. PRs en secuencia: no fusionar un PR dependiente antes de su base. César valida diseño/alcance y CI; el responsable de producto valida el comportamiento; operaciones valida despliegue cuando aplique.
6. Sin despliegue automático a producción desde PR. Promoción manual después de staging y aprobación registrada.
7. No desplegar infraestructura ni iniciar gastos cloud antes de contar con cuenta AWS, presupuesto, región, dominio, responsable de billing y aprobador.

## Estado del backlog actual

| PR | Rama / título | Estado verificado | Acción |
| --- | --- | --- | --- |
| #1 | `feature/react-foundation` | Abierto; CI aprobado | Revisión de César y resolver comentarios; base React y Home con mocks. |
| #2 | `feature/trip-family-migration` | Abierto sobre PR #1; CI aprobado | Revisar organización, gira, familias y validación CSV local. |
| #3 | `feature/finance-ledger-foundation` | Abierto sobre PR #2; CI aprobado | Revisar presupuesto/libro demostrativo; confirmar que no implica procesamiento/custodia real. |
| #4 | `feature/production-readiness-controls` | Abierto sobre PR #3; CI de calidad y seguridad aprobado | Revisar evaluación de preparación, Zod actualizado, Gitleaks y auditoría de dependencias. |
| #5 | Este plan de entregas | En preparación en rama de documentación | Aprobar el orden, dueños y criterios antes de abrir los siguientes PR de producto. |

Los cuatro PR existentes son fundaciones revisables, no una aplicación completa ni una autorización de producción.

## PRs propuestos después del #5

Cada fila es un PR futuro. Se crea solo cuando su alcance puede terminarse, probarse y presentarse para revisión por separado.

| Orden | PR futuro | Entrega verificable | Bloqueadores / aceptación |
| --- | --- | --- | --- |
| #6 | `feat: migrate documents and consents` | Pantallas JSX de documentos, estados, autorizaciones y vencimientos; fixtures ficticios; cargas deshabilitadas para documentos reales. | Loading/empty/error, responsive, permisos UI solo demostrativos, pruebas; retención/consentimiento definidos antes de uso real. |
| #7 | `feat: migrate communications calendar and polls` | Mural por colegio/gira, calendario, tareas, votaciones y decisiones en JSX con mocks aislados. | Pruebas de contexto, audiencia/visibilidad clara, accesibilidad, moderación y estados. |
| #8 | `feat: migrate events and attendance` | Eventos, inscripción, tickets simulados, asistencia y resultados. | Sin pagos reales; reglas de cupos/cancelación auditables y pruebas. |
| #9 | `feat: migrate agency marketplace and quotes` | Perfil/verificación de proveedor, ofertas, buscador, solicitudes, propuestas y mensajería mediada. | Sin revelar correo/teléfono; estados de verificación, expiración y consentimiento; datos ficticios. |
| #10 | `feat: add identity and authorization contracts` | Contratos de usuario, tenant/rol/contexto, guards del cliente para experiencia y adaptador de identidad desacoplado. | No autenticar con credenciales estáticas. Cognito solo cuando existan entorno y secretos aprobados; la decisión final de acceso pertenece al servidor. |
| #11 | `feat: add modular API and tenant authorization` | API modular, validación de entrada/salida, JWT verificado por issuer/audience, políticas de rol/propiedad y auditoría. | Pruebas negativas de acceso cruzado tenant/colegio/curso/gira/familia; rate limits; errores sin filtrar datos. No permitir modo de desarrollo en producción. |
| #12 | `feat: add PostgreSQL schema and migrations` | Modelo completo relacional, migraciones reversibles/compatibles, llaves foráneas, índices, RLS y roles DB mínimos. | PostgreSQL de prueba en CI; pruebas RLS con rol de aplicación no propietario/superuser y sin `BYPASSRLS`; revisión independiente de seguridad. |
| #13 | `feat: connect web to API contracts` | Repositorios HTTP, TanStack Query, expiración/reintento controlados y conexión de módulos migrados. | Reemplazo de mocks por feature flags; pruebas de contrato e integración; nada sensible en URL, localStorage o logs. |
| #14 | `feat: implement immutable finance ledger` | Registro append-only de cuotas, pagos informados/conciliados, crédito, egreso, reversa y devolución; idempotencia y aprobación dual configurable. | Integridad transaccional y pruebas concurrentes; conciliación; sin custodia/pasarela hasta aprobación comercial y jurídica. |
| #15 | `feat: add private document storage` | Adaptador S3 privado, escaneo antimalware, URL firmada corta tras autorización, cifrado, retención y auditoría. | Pruebas de acceso por objeto/tenant; bloqueo público; no entregar credenciales S3 al navegador. |
| #16 | `feat: add async jobs and notifications` | Worker separado, SQS/DLQ/EventBridge/SES mediante adaptadores, outbox, retry e idempotencia. | Pruebas de reintentos y duplicados, métricas/DLQ y redacción de PII en registros. |
| #17 | `infra: add AWS dev and staging foundations` | Terraform para red, IAM, KMS, secretos, repos ECR, base de datos privada, buckets y observabilidad mínima por ambiente. | Revisión de plan, presupuesto y tags; OIDC GitHub sin credenciales largas; ningún recurso de producción. Ejecutar solo con cuenta autorizada. |
| #18 | `infra: deploy API and worker containers` | Imágenes endurecidas, no-root, filesystem read-only, health probes, límites, EKS y despliegue declarativo en staging. | ECR scan, políticas de red, IAM por workload, rollback y smoke tests; no desplegar el frontend en Kubernetes. |
| #19 | `infra: publish web through CloudFront` | Build estático en S3 privado con OAC, CloudFront, ACM, WAF, DNS y SPA fallback; ruta `/api/*` hacia API Gateway. | Dominio/DNS y cuenta listos; TLS, headers/CSP, caché/invalidación, rollback y pruebas smoke en staging. |
| #20 | `security: production hardening and pilot gate` | SAST, SBOM, análisis de imágenes, pruebas de penetración, carga, backups/PITR, restauración, DR, runbooks y checklist privacidad/contratos. | Cero hallazgos críticos/altos sin excepción formal; aprobación de César, operaciones y asesoría legal. Piloto controlado primero. |
| #21 | `release: controlled school pilot` | Activación limitada por feature flag, colegio(s) autorizados, soporte, métricas y proceso de salida/rollback. | Consentimientos/contratos, capacitación, aceptación del colegio y aprobación de dirección. Sin habilitar custodia de fondos. |
| #22 | `release: production promotion` | Promoción manual de la versión aceptada de staging a producción y plan de operación. | Gate #20 y piloto superados; responsable de guardia, SLA, incidentes, respaldo probado, costos aprobados y checklist firmado. |

## Separación de módulos, paquetes y contenedores

El código de interfaz se implementa en `apps/web` con JSX y dominios independientes. Los contratos/validaciones compartidos se ubican en `packages/contracts` y `packages/validation` cuando se creen con uso real; no se crean carpetas vacías.

El backend empieza como monolito modular dentro de `apps/api`; módulos internos incluyen auth, tenants, schools, courses, trips, families, students, finance, documents, communications, polls, events, agencies, packages, quotations, audit e integrations. Procesos de larga duración van a `apps/worker` como proceso/contenedor separado. Un despliegue por servicio no significa un microservicio por dominio.

Contenedores previstos:

- `viaggio-web`: artefacto estático publicado en S3 privado + CloudFront; Nginx se conserva para pruebas locales/contenerizadas, no es requisito correr el frontend en EKS.
- `viaggio-api`: API sin estado, detrás de API Gateway y un ALB interno, desplegada en EKS solo cuando escala/operación lo justifique.
- `viaggio-worker`: consumidores asíncronos separados del ciclo HTTP, con colas/DLQ.
- `viaggio-migrations`: Job temporal con permiso de migración acotado, no un servicio permanente.

Kubernetes/EKS, API Gateway y AWS son fases futuras. Primero se debe demostrar que un servicio necesita ese modo de operación y que el costo operacional es aceptable; staging puede usar una opción administrada más simple si el equipo decide que EKS no se justifica inicialmente.

## Puertas de revisión de César

En cada PR, César debe revisar: (1) objetivo y no-alcance, (2) diferencias visibles y prueba de usuario, (3) contratos y esquema de datos, (4) controles de autorización y privacidad aplicables, (5) evidencias de CI, (6) plan de migración/reversa, (7) base correcta del PR y (8) declaración explícita de si toca infraestructura o genera costos. Un PR que falla un criterio queda abierto; no se avanza su dependencia.

## Definición de listo para liberar

- PR aprobado por revisión humana y CI exitoso desde la rama base vigente.
- Pruebas unitarias, integración y E2E acordes al riesgo, con casos negativos de autorización.
- Sin secretos; auditoría de dependencias aprobada o excepción documentada.
- Migraciones revisadas y rollback/forward-fix documentado.
- No hay datos personales reales en fixtures, logs o screenshots de prueba.
- Despliegue primero a staging con smoke test, monitor y rollback ensayado.
- La promoción a producción es manual, aprobada y ligada a una versión/commit inmutable.

## Pendiente de decisión antes de AWS

- Cuenta AWS organizacional, responsable de administración y aprobador de costos.
- Región y residencia de datos aceptada por la empresa/colegios.
- Dominio DNS y titular con acceso para ACM/Route 53.
- Ambientes/cuentas separados y política de IAM/OIDC para GitHub Actions.
- Presupuesto mensual, alarmas de costos y política de apagado de ambientes no productivos.
- Proveedor legal/comercial de pagos; V1 no debe custodiar dinero.
- Responsable de privacidad, términos, contratos, plazos de retención y atención a titulares.
