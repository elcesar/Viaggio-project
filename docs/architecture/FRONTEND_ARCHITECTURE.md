# Arquitectura frontend

`apps/web` es una SPA React construida con Vite. La migración se organiza por dominios; cada dominio reúne páginas, componentes, hook, repositorio y esquema de validación. Los componentes visuales no consultan datos directamente.

## Flujo

`Página -> hook TanStack Query -> repositorio -> contrato Zod -> API futura`.

En PR 01, el repositorio entrega una copia de mocks. El reemplazo por `GET /api/v1/me/dashboard` no debe requerir cambios en componentes.

## Guardas futuras

Se prepararán `ProtectedRoute`, `RoleGuard`, `TenantGuard` y `FeatureFlagGuard` como controles de experiencia. La autorización verdadera será responsabilidad de la API y base de datos.

## Dominios futuros

| Dominio | Propósito | Roles | Datos sensibles / auditoría |
|---|---|---|---|
| authentication | Sesión e identidad | Todos | Sesiones, MFA, accesos |
| schools/courses/trips | Estructura organizacional | Viaggio, colegio, directiva | Cambios de contexto |
| families/students | Familias y estudiantes | Colegio, directiva, familia | Datos personales y acceso propio |
| finance | Presupuesto, cuotas y libro | Tesorería, directiva, familia | Todo movimiento y aprobación |
| documents | Requisitos y autorizaciones | Por permiso | Acceso, descarga, versiones |
| communications/polls/events | Operación comunitaria | Por permiso | Publicaciones, voto y asistencia |
| agencies/packages/quotations | Oferta y cotización | Proveedor, directiva | Verificación y propuestas |
| administration | Gestión institucional | Viaggio | Roles, bloqueo, soporte |

Las pruebas mínimas por dominio incluyen contrato, estado vacío/error, permisos de API futuros y pruebas de aislamiento por tenant.
