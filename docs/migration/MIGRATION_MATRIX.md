# Matriz de migración

| Módulo | Pantalla | Archivo actual | JavaScript | Datos | Estado | Destino React | Observaciones |
|---|---|---|---|---|---|---|---|
| Layout privado | Portal | `demo/index.html` | Inline | N/A | En migración | `shared/layouts` | Header, sidebar y móvil separados |
| Home apoderado | Home | `demo/index.html` | Inline | HTML/localStorage | Migrado con mocks | `features/dashboard` | Contrato Zod y repositorio preparado para API |
| Cuenta | Familia | `demo/index.html` | Inline | HTML/localStorage | Pendiente | `features/finance` | Requiere libro inmutable |
| Documentos | Documentos | `demo/index.html` | Inline | localStorage | Pendiente | `features/documents` | Requiere permisos y S3 privado |
| Eventos | Comunidad/eventos | `demo/index.html` | Inline | localStorage | Pendiente | `features/events` | Requiere asistencia y reglas |
| Votaciones | Home | `demo/index.html` | Inline | HTML/localStorage | Pendiente | `features/polls` | Requiere elegibilidad y auditoría |
| Mural/galería | Comunidad | `demo/index.html` | Inline | localStorage | Pendiente | `features/communications` | Requiere moderación y consentimiento |
