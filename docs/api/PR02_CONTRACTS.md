# Contratos previstos para PR 02

`GET /api/v1/organizations/current-context` devolverá colegio, curso y gira para la identidad autenticada. El contexto nunca se tomará de parámetros libres del navegador.

`GET /api/v1/trips/{tripId}/families` será exclusivo para roles autorizados. `POST /api/v1/trips/{tripId}/families/imports` validará y auditará el archivo en el servidor; la simulación local solo permite validar UX.

Cada importación registrará actor, tenant, colegio, curso, gira, fecha, recuento de filas, filas rechazadas y motivo. No se aceptan RUT, salud ni saldos en el CSV inicial.
