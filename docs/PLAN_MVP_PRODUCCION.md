# Plan de MVP para Produccion

## Objetivo del piloto

Validar con uno a tres colegios que una directiva pueda administrar una gira sin
planillas paralelas y que cada familia pueda revisar solo su informacion,
movimientos y pendientes desde el celular.

El MVP no administra dinero propio de Viaggio. Los pagos se procesan por una
pasarela y una cuenta definida por el titular correspondiente; Viaggio conserva
la trazabilidad, los comprobantes y la conciliacion.

## Alcance de fase 1

1. Onboarding de colegio, curso y gira.
2. Importacion de familias y estudiantes desde CSV.
3. Roles: super administrador, administrador de colegio, directiva, profesor,
   apoderado y consulta.
4. Presupuesto, cuotas, plan de pago, estado de cuenta por familia y registro
   de pagos informados.
5. Egresos con comprobante y aprobacion en dos pasos cuando se supere el monto
   configurado por la gira.
6. Comunicados, tareas, calendario de hitos y notificaciones por correo.
7. Checklist documental basico y autorizaciones.
8. Portal publico opcional por gira: avance agregado, eventos, auspicios y
   formulario de interes comercial.
9. Bitacora de auditoria de toda accion financiera, documental y de permisos.

No se incluyen en el MVP: custodia de fondos, POS de eventos, rifas, modo viaje
offline, marketplace transaccional, fichas medicas, WhatsApp, auspicios con
facturacion automatica ni integracion directa con Sernatur.

## Arquitectura objetivo

```text
Navegador web y PWA futura
        |
Frontend Next.js + TypeScript
        |
API de aplicacion
        |
PostgreSQL con aislamiento por tenant y auditoria
        |
 +------+-------+--------+--------+
 Auth   Archivos Pagos    Correo
```

- Cada dato transaccional tiene `tenant_id` y se valida contra la membresia del
  usuario antes de leer o escribir.
- PostgreSQL es la fuente de verdad; los montos se guardan como enteros en CLP.
- Los archivos se almacenan fuera de la base de datos, con URL firmada y acceso
  por rol.
- Un adaptador de pagos permite cambiar de proveedor sin modificar el libro de
  movimientos.
- Despliegues separados para desarrollo, staging y produccion. Nunca se prueba
  con datos de familias en desarrollo.

## Modelo de datos inicial

| Dominio | Entidades de fase 1 | Regla principal |
|---|---|---|
| Organizacion | School, Course, TripProject, Membership, Role | Todo pertenece a un tenant. |
| Personas | User, Guardian, Student, FamilyAccount | Una familia solo puede acceder a su propio grupo. |
| Finanzas | Budget, BudgetItem, PaymentPlan, Installment, Payment, LedgerEntry, Expense | No se modifica un movimiento conciliado; se revierte con otro movimiento. |
| Operacion | Task, Event, Announcement, Document, DocumentRequirement | Cada elemento tiene responsable, fecha y estado. |
| Gobierno | Approval, Consent, AuditLog | AuditLog es inmutable y guarda actor, fecha, accion y contexto. |

Campos transversales: `id`, `tenant_id`, `created_at`, `updated_at`,
`deleted_at` para borrado logico cuando aplique. Zona horaria: `America/Santiago`.

## Mapa de pantallas

### Directiva

1. Inicio: meta, recaudacion, proyeccion, alertas y proximos hitos.
2. Familias: estado agregado, convenios y seguimiento sin exponer informacion
   individual a otros apoderados.
3. Finanzas: presupuesto, cuotas, conciliacion, egresos y aprobaciones.
4. Eventos: calendario, tareas y responsables.
5. Documentos: requisitos, vencimientos y evidencias.
6. Informes: estado general y exportacion PDF/Excel.

### Familia

1. Inicio: deuda, pagos confirmados, avance de meta y siguiente accion.
2. Estado de cuenta: cargos, abonos y comprobantes propios.
3. Documentos: requisitos de sus estudiantes y autorizaciones.
4. Tareas, comunicados y calendario.
5. Mis datos: consentimientos, preferencias y solicitudes sobre sus datos.

### Sitio publico

1. Presentacion de la gira y avance agregado opcional.
2. Eventos y campanas abiertas.
3. Auspiciadores aprobados y formulario de interes comercial.
4. No publica nombres, saldos individuales ni fotos de menores sin permiso.

## Matriz minima de permisos

| Accion | Directiva | Profesor | Apoderado | Proveedor |
|---|---:|---:|---:|---:|
| Ver avance general | Si | Si | Si | No |
| Ver saldo individual propio | Si, segun permiso | No | Solo propio | No |
| Registrar pago o egreso | Tesorero autorizado | No | Solo informar pago propio | No |
| Aprobar egreso | Presidente o tesorero segun regla | No | No | No |
| Ver documentos personales | Solo autorizados | Solo los necesarios | Solo propios | No |
| Ver convenio propio | No | No | No | Solo propio |

## Seguridad y cumplimiento

- Inicio de sesion por correo y enlace seguro; MFA obligatorio para tesorero y
  presidente antes de habilitar operaciones financieras.
- Limite de intentos, sesiones revocables, cifrado en transito y registro de
  accesos.
- Consentimientos versionados para comunicaciones, fotos y tratamiento de datos.
- Los datos de salud no forman parte del MVP. Cualquier modulo futuro requiere
  revision legal especifica y una arquitectura de acceso restringido.
- Las fotos publicas requieren autorizacion expresa y verificable.
- Retencion y eliminacion configurables al cierre de la gira.
- Viaggio organiza controles y evidencia; no certifica cumplimiento legal ni
  reemplaza obligaciones del colegio, familias o proveedores.

## Fases y criterios de salida

| Fase | Duracion estimada | Resultado verificable |
|---|---:|---|
| Fundaciones | 2 semanas | Diseno de datos, roles, auditoria, entorno staging y semilla ficticia. |
| MVP financiero | 4 semanas | Gira, familias, cuotas, pagos informados, egresos y estados de cuenta. |
| Operacion | 2 semanas | Tareas, comunicados, documentos y calendario. |
| Piloto | 2 a 4 semanas | 1 a 3 colegios activos, soporte y medicion de uso. |

El piloto se acepta cuando una directiva puede crear una gira e importar una
nomina en menos de 30 minutos; una familia puede encontrar su saldo y siguiente
cuota en menos de un minuto; y las pruebas confirman que ninguna familia ve
datos individuales ajenos.

## Decisiones pendientes antes de pagos reales

1. Titular de la cuenta recaudadora y responsable de devoluciones.
2. Pasarela de pago, costos, conciliacion y comprobantes tributarios.
3. Contratos de uso con colegio, familias y proveedores.
4. Reglas por gira para excedentes, reembolsos, ausencias y bajas.
5. Revision legal sobre rifas, alimentos, auspicios y datos personales.
