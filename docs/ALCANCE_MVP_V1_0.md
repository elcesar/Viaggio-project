# Viaggio V1.0: alcance comercial del MVP

## Proposito

Viaggio V1.0 permite ofrecer a colegios y agencias un espacio unico para
planificar, financiar, organizar y comunicar una gira de estudio. El objetivo
del piloto no es custodiar dinero: es demostrar que una gira puede operar con
informacion ordenada, permisos claros y trazabilidad, sin depender de chats,
planillas y carpetas compartidas como fuente de verdad.

Este documento **organiza y complementa** el
[Plan de MVP para Produccion](PLAN_MVP_PRODUCCION.md). No elimina modulos ni
reemplaza el trabajo exploratorio ya visible en la maqueta.

## Alcance comercial inicial

El producto se ofrece a:

1. Colegios y directivas que administran una o mas giras independientes.
2. Familias y estudiantes que necesitan ver solo la informacion que les
   corresponde.
3. Agencias, hoteles y servicios de destino que desean responder solicitudes
   de cotizacion sin intercambiar datos personales fuera de la plataforma.

El piloto recomendado considera uno a tres colegios. La arquitectura se diseña
desde el inicio para separar cada `colegio`, `curso` y `gira`.

## Regla de aislamiento

Cada gira tiene su propio fondo, presupuesto, cuotas, actividades, proveedores,
documentos, familias, reglas, portal publico opcional y proceso de cierre.

Todo registro productivo debe incluir como minimo `school_id`, `course_id` y
`trip_project_id`. La interfaz puede mostrar un selector de contexto, pero el
aislamiento efectivo debe verificarse en el servidor: una familia no puede ver
cuentas, documentos privados ni publicaciones de otra familia; un colegio no
puede consultar datos de otro colegio.

## Perfiles de la V1.0

| Perfil | Alcance operativo |
|---|---|
| Superadministrador Viaggio | Gestiona colegios, cuentas, soporte, bloqueos y auditoria global. |
| Administrador de colegio | Administra los cursos, usuarios y giras de su establecimiento. |
| Directiva / tesoreria | Configura la gira, presupuesto, cuotas, actividades, cotizaciones, documentos y comunicaciones. |
| Coordinador o profesor | Apoya actividades, comunicados, calendario y listas segun permiso otorgado. |
| Apoderado | Ve solo el estado de su familia, sus pagos, documentos, actividades, votaciones y comunicaciones autorizadas. |
| Estudiante | Accede a contenidos permitidos: calendario, actividades, tareas, comunicados y recuerdos; no ve finanzas familiares. |
| Agencia o proveedor | Mantiene su ficha, paquetes y responde solicitudes que le hayan sido enviadas. |

Los perfiles de la maqueta muestran este modelo; en produccion cada permiso se
valida en API y base de datos, no solo ocultando botones.

## Modulos que deben funcionar para vender la V1.0

### 1. Inicio de la gira para familias

La vista de inicio de cada apoderado debe concentrar, en una sola pantalla:

- avance de la meta en pesos chilenos;
- fecha estimada, destino, curso y cantidad de alumnos;
- proximos eventos, tareas y actividades;
- votaciones abiertas y decisiones ya publicadas;
- estado de cuenta, proxima cuota y comprobantes propios;
- documentos y autorizaciones requeridos para su estudiante;
- comunicados del curso y acceso al mural privado.

El dato financiero individual se muestra solo a la familia correspondiente. El
avance publico o comunitario siempre es agregado.

### 2. Configuracion y gestion de la gira

La directiva debe poder crear o completar una gira con colegio, curso, fecha,
destino, numero de alumnos, meta, presupuesto, reglas de aprobacion y equipo
responsable. Tambien debe poder administrar:

- presupuesto base, categorias, proyeccion y ejecucion;
- cuotas, vencimientos, convenios y recordatorios;
- calendario, tareas, responsables y evidencias;
- documentos, requisitos, vencimientos y autorizaciones;
- comunicados, mural, albumes y moderacion de contenido;
- cierre y rendicion por gira.

### 3. Cobranza, pagos informados y rendicion

V1.0 requiere un libro de movimientos inmutable por familia y por gira. Los
tipos minimos son: cuota, pago informado, pago conciliado, ajuste, credito por
actividad, egreso, reversa, devolucion y comprobante.

Un boton `Pagar` puede dirigir a un enlace externo configurado por el titular
de la recaudacion o iniciar una instruccion de pago. En esta version, Viaggio
no recibe ni custodia fondos. La conciliacion y la acreditacion se registran
con evidencia y trazabilidad.

La integracion nativa con pasarela, confirmacion por webhook, liquidacion y
recaudacion dentro de la plataforma pertenece a la version posterior, luego de
definir la razon social contratante, titularidad de fondos, devoluciones,
costos, comprobantes y contrato con el proveedor de pagos.

### 4. Cotizador y solicitudes de viaje

La directiva puede crear una solicitud de cotizacion desde la plataforma con:

- colegio y curso;
- cantidad de alumnos y acompanantes;
- fecha o ventana estimada;
- presupuesto estimado por persona y total;
- destinos preferidos;
- restricciones, servicios deseados y observaciones.

La agencia responde dentro de Viaggio con alternativas comparables. La
solicitud, las respuestas y las decisiones quedan en la bitacora. Telefonos y
correos de familias no se exponen a proveedores; la mensajeria se canaliza por
la plataforma hasta que una relacion comercial autorizada justifique otro
medio.

### 5. Marketplace de agencias y servicios

Cada empresa dispone de una ficha de enrolamiento con identidad comercial,
servicios, cobertura, documentos de respaldo, responsable y estado de
verificacion.

Las ofertas de paquetes incluyen fotos, descripcion, itinerario resumido,
servicios incluidos, precio referencial, vigencia y condiciones. El buscador
debe filtrar como minimo por:

- destino: Chile, Brasil, Caribe, Europa, Asia u otros;
- zona: norte, centro o sur;
- rango por persona: `0-500 mil`, `500 mil-1 millon`, `1-2 millones` y `mas de 2 millones`;
- fechas, tipo de servicio y capacidad.

En V1.0 se prioriza la solicitud, comparacion y seleccion informada. La
contratacion transaccional y el cobro de comisiones automatizado quedan fuera
hasta definir contratos, impuestos, responsabilidades y pagos.

### 6. Votaciones y decisiones

Todas las familias autorizadas pueden participar en votaciones de su propia
gira. Cada votacion define pregunta, alternativas, periodo, quorum si aplica,
quien puede votar y resultado publicado. El sistema debe conservar la decision
tomada, fecha, responsable y respaldo de la votacion.

### 7. Eventos, actividades y tickets

La directiva crea eventos con objetivo, fecha, lugar, responsables, capacidad,
presupuesto, tareas, participantes y resultado de recaudacion. V1.0 puede
incluir confirmacion de asistencia y ticket o lista QR no transaccional.

La venta de entradas, POS, rifas o tickets pagados requiere procesamiento de
pagos y reglas tributarias; se incorpora en una version posterior. Mientras
tanto, la recaudacion real de una actividad se acredita como movimiento
validado en el libro de cada familia o en el fondo comun, segun la regla de la
gira.

### 8. Desafios y reconocimiento

La gamificacion de V1.0 permite crear desafios, enrolar participantes, definir
metas, responsables, evidencias, resultados y reconocimientos. Los puntos o
beneficios no son dinero ni saldo disponible: representan una regla de
asignacion aprobada por la directiva.

Cuando un beneficio impacta el valor a pagar de una familia, se registra como
un credito identificable en el libro de movimientos, con origen en el evento,
aprobador y comprobante. No se habilitan tokens convertibles, retiros ni
transferencias entre familias en esta version.

### 9. Documentos, contratos y comunicacion

Viaggio conserva contratos, autorizaciones, requisitos de viaje, cotizaciones,
comprobantes y actas de decision con version, responsable, fecha y permisos.
Las familias ven solo los documentos necesarios para su estudiante. La
plataforma debe permitir solicitar acceso, registrar aprobaciones, recuperar
desde papelera y mantener bitacora.

Los contratos con agencias, familias o colegios se administran como documentos
versionados. Su validez juridica, firma electronica y textos definitivos deben
ser revisados por asesoria legal antes de ponerlos en produccion.

## Recorridos que la V1.0 debe demostrar

| Usuario | Recorrido verificable |
|---|---|
| Colegio/directiva | Crea colegio, curso y gira; carga familias; publica una cuota, evento, votacion y solicitud de cotizacion. |
| Apoderado | Ingresa a su giro, entiende su avance, revisa su proxima cuota, informa pago, vota, confirma actividad y carga un documento. |
| Agencia | Completa ficha, recibe solicitud sin datos sensibles, envia propuesta y responde mensajes dentro de la plataforma. |
| Viaggio | Da soporte, revisa auditoria, bloquea una cuenta, restablece acceso y confirma que no se mezclan colegios o giras. |

## Lo que queda expresamente para V2.0 o fase regulada

1. Pasarela de pago integrada, webhooks y conciliacion automatica.
2. Custodia o dispersion de fondos por Viaggio.
3. POS de eventos, rifas, venta de tickets y marketplace transaccional.
4. Facturacion automatica de auspicios y comisiones a proveedores.
5. Modo viaje offline, app instalable y funcionalidades de destino.
6. Fichas medicas o antecedentes de salud.
7. Integraciones regulatorias o sectoriales que requieran acuerdos externos.

## Requisitos no negociables antes de un piloto real

- Autenticacion segura, MFA para tesoreria y presidencia, sesiones revocables y
  recuperacion de acceso.
- Permisos validados en servidor y pruebas de aislamiento entre colegio, curso,
  gira y familia.
- Libro contable inmutable, trazabilidad de aprobaciones y exportacion de
  respaldo.
- Consentimientos versionados para datos personales, comunicaciones y fotos de
  menores.
- Almacenamiento privado de archivos, enlaces firmados, retencion definida y
  eliminacion al cierre de la gira.
- Contratos de uso para colegio, familias, agencias y proveedores de pago.
- Revision legal y tecnica de privacidad antes de manejar informacion personal
  real. Las fichas medicas permanecen fuera del MVP.

## Orden recomendado de construccion

1. Base multi-colegio: autenticacion, roles, aislamiento, auditoria y modelo
   de datos.
2. Gira, familias, presupuesto, cuotas, pagos informados, conciliacion y libro
   de movimientos.
3. Panel de directiva y panel de familia, con pruebas de acceso separado.
4. Comunicados, calendario, tareas, documentos, votaciones y mural moderado.
5. Cotizador, fichas de agencias y mensajeria protegida para propuestas.
6. Eventos, desafios, creditos validados y experiencias comerciales del
   marketplace no transaccional.
7. Evaluacion del piloto y definicion contractual para pagos en linea y
   transacciones de V2.0.

## Criterios para ofrecer el piloto

La V1.0 esta lista para ofrecer cuando una directiva pueda crear una gira y
cargar su nomina en menos de 30 minutos; una familia pueda identificar su
proxima accion y saldo en menos de un minuto; una agencia pueda responder una
cotizacion sin recibir datos personales; y las pruebas demuestren que ningun
usuario puede acceder a informacion de otra familia, curso o colegio.
