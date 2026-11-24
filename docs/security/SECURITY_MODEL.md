# Modelo de seguridad futuro

La identidad se resuelve desde Cognito y JWT; la API determina tenant, roles y propiedad del recurso. Nunca se confía en un `tenantId`, `familyId` o rol enviado por el navegador.

Controles requeridos: RBAC, validación de entradas, verificación de propiedad, bitácora inmutable, rate limiting, MFA para tesorería/presidencia, revocación de sesiones y pruebas de acceso horizontal entre familias y colegios. Las guardas de frontend no son un control de seguridad.
