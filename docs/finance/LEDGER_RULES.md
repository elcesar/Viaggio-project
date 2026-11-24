# Reglas del libro financiero

El libro financiero de Viaggio es una fuente de trazabilidad, no una cuenta custodiada por Viaggio. Los montos se guardarán como enteros CLP.

Los tipos previstos son: cuota, pago informado, pago conciliado, crédito, ajuste, egreso, reversa, devolución y beneficio. Un movimiento conciliado no se edita ni elimina. Las correcciones se expresan mediante una reversa con motivo, usuario, fecha y referencia al movimiento original.

Cada operación productiva requerirá `idempotency_key`, tenant, gira, cuenta familiar, actor y fecha. Egresos sobre el umbral de la gira requerirán doble aprobación.
