# Mapa de rutas React

| Ruta | Vista | Estado |
|---|---|---|
| `/` | Redirección | Redirige a `/app/dashboard` |
| `/app/dashboard` | Home del apoderado | Migrado con mocks |
| `/app/trip` | Gira | Pendiente, placeholder explícito |
| `/app/account` | Cuenta familiar | Pendiente, placeholder explícito |
| `/app/documents` | Documentos | Pendiente, placeholder explícito |
| `/app/events` | Eventos | Pendiente, placeholder explícito |
| `/app/polls` | Votaciones | Pendiente, placeholder explícito |

S3/CloudFront deberán devolver `index.html` para rutas de SPA. El fallback no otorga acceso: la autorización futura se decide en la API.
