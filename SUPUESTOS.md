# Supuestos de producto

1. El piloto se realiza en Chile, con moneda principal CLP y zona horaria
   `America/Santiago`.
2. Cada gira tiene un titular definido para recibir pagos; Viaggio no recibe ni
   custodia fondos de familias en el MVP.
3. La primera importacion de nomina se realiza mediante CSV y es revisada por
   la directiva antes de enviar invitaciones.
4. Los pagos por transferencia se marcan como informados hasta su conciliacion
   por un usuario autorizado.
5. Un egreso no se elimina: se anula o revierte mediante un movimiento trazable.
6. La informacion financiera individual es privada; solo se comparte avance
   agregado con el curso, salvo autorizacion expresa y una regla configurada.
7. Los documentos sensibles y los datos de salud se excluyen del MVP hasta
   contar con validacion juridica y tecnica especifica.
8. Las integraciones de pago, correo, firma y mensajeria se implementan como
   adaptadores, no como dependencias directas de la logica financiera.
9. El sitio publico solo muestra informacion agregada aprobada por la directiva
   y no publica fotos de menores sin consentimiento verificable.
