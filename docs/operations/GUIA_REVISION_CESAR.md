# Guía de revisión para César

## Contexto

Viaggio busca acompañar la organización completa de una gira escolar: colegio y curso, alumnos y familias, planificación, fondos, actividades, documentación, comunicación y conexión con agencias/proveedores. La demo pública actual es una maqueta HTML preservada como referencia. La aplicación React está migrándose por módulos y todavía usa datos ficticios; no es un sistema productivo.

## Qué revisar primero en GitHub

Los PR están encadenados. Revisar primero el PR base y no fusionar una rama dependiente si su base no está integrada o el CI no está verde.

| Orden | PR | Qué valida César |
| --- | --- | --- |
| 1 | [PR #1 React foundation](https://github.com/elcesar/Viaggio-project/pull/1) | Base React/Vite, layout privado, navegación, Home, adaptación móvil, preservación de demo y pruebas. |
| 2 | [PR #2 gira y familias](https://github.com/elcesar/Viaggio-project/pull/2) | Contexto colegio/curso/gira, familias, importación CSV local y límites claros de mock. |
| 3 | [PR #3 finanzas](https://github.com/elcesar/Viaggio-project/pull/3) | Presupuesto y libro de muestra; confirmar que no procese pagos, no custodie fondos y no edite movimientos como si fuera producción. |
| 4 | [PR #4 preparación de producción](https://github.com/elcesar/Viaggio-project/pull/4) | Estado real, riesgos, controles de secretos/dependencias y criterios de salida. |
| 5 | [PR #5 plan de liberación](https://github.com/elcesar/Viaggio-project/pull/5) | Secuencia propuesta de módulos/infraestructura, responsables y puertas de aprobación. |
| 6 | [PR #6 documentos](https://github.com/elcesar/Viaggio-project/pull/6) | UX de lista, búsqueda, filtros y estados; no debe aceptar documentos reales hasta existir almacenamiento privado y permisos de servidor. |

## Checklist de revisión por PR

- ¿El cambio cumple un objetivo concreto y evita ampliar el alcance sin decisión?
- ¿La navegación y los controles tienen comportamiento comprobable en desktop y móvil?
- ¿Se distinguen los datos de muestra de los datos reales?
- ¿Hay estados de carga, vacío, error y confirmación donde corresponda?
- ¿Los roles y permisos se aplican en backend cuando haya datos reales, no solo ocultando controles en la interfaz?
- ¿El acceso está limitado por tenant/colegio/curso/gira/familia y se prueban intentos de acceso cruzado?
- ¿Las acciones financieras son auditables, idempotentes y corregibles por reversa?
- ¿Los documentos son privados, cifrados, autorizados por objeto y sujetos a retención?
- ¿Se agregaron pruebas proporcionales al riesgo y CI, build, lint y análisis de dependencias pasan?
- ¿El PR explica migración, compatibilidad, rollback y si crea recursos/costos cloud?
- ¿Se preservó `demo/` como referencia y no se rompió GitHub Pages?
- ¿Hay secretos, datos personales reales o información sensible en código, fixtures, logs o capturas?

## Riesgos que impiden usar datos reales

1. No hay autenticación administrada de producción (Cognito), MFA ni recuperación de cuentas.
2. No existe autorización completa en API para separar tenant, colegio, curso, gira y familia.
3. La API y PostgreSQL/RLS aún no constituyen una plataforma desplegada y probada.
4. Documentos, registros financieros, notificaciones y conexiones a proveedores no están integrados a servicios reales.
5. No hay entorno AWS de staging, observabilidad, alertas, backups con restauración probada ni runbooks de incidentes.
6. Faltan revisión legal/privacidad, contratos, consentimiento versionado, plazos de retención y responsables operativos.
7. La maqueta no debe custodiar fondos ni presentarse como pasarela de pagos.

## Arquitectura objetivo que se propone revisar

- `apps/web`: React/JSX; artefacto estático en S3 privado y CloudFront, no dentro de Kubernetes.
- `apps/api`: monolito modular detrás de API Gateway; PostgreSQL privado, aislamiento y autorización del lado servidor.
- `apps/worker`: procesos asíncronos separados para colas/notificaciones e integraciones.
- `viaggio-migrations`: tarea temporal con permisos acotados.
- AWS: Terraform revisado, ambientes separados, KMS/Secrets Manager, WAF, monitoreo, respaldos y promoción manual.
- EKS/Kubernetes solo para API/worker si la escala y operación justifican su costo y complejidad. Evitar microservicios prematuros.

## Decisiones que se necesitan antes de crear recursos AWS

- Quién es titular y administrador de la cuenta AWS y quién aprueba los gastos.
- Región y requisitos de residencia/retención de datos.
- Dominio y acceso DNS/ACM.
- Presupuesto mensual, alertas de gasto y ambientes que se apagarán fuera de horario.
- Responsables de privacidad/legal, soporte, incidentes y guardia técnica.
- Confirmación del modelo de pagos: V1 sin custodia por Viaggio.

## Recomendación de aprobación

1. Revisar y aprobar el plan (#5) y la base (#1–#4) en orden, resolviendo observaciones antes de cada merge.
2. Revisar módulos JSX de forma aislada (#6 y siguientes), manteniendo datos ficticios hasta aprobar identidad, API y aislamiento.
3. No autorizar piloto con datos reales hasta que autenticación, autorización servidor, PostgreSQL, auditoría, privacidad y restauración estén probados.
4. Autorizar primero infraestructura de desarrollo/staging, una vez acordados cuenta, dominio, región y presupuesto.
5. Producción solo tras piloto aceptado, revisión legal, prueba de recuperación y aprobación formal de los responsables.

## Estado del PR #6

La pantalla de documentos usa registros ficticios, permite buscar y filtrar y presenta estados de muestra. La acción de carga no sube archivos. Se requieren API autorizada y almacenamiento privado antes de habilitar archivos de colegios o familias.
