# Backend modular futuro

El backend iniciará como monolito modular: autenticación, organización, familias, finanzas, documentos, comunicaciones, eventos, votaciones, agencias y cotizaciones. Cada módulo expone contratos internos; integraciones externas se encapsulan en adaptadores.

Las acciones financieras y de documentos generan auditoría. Las operaciones financieras usarán idempotency keys y reversas, nunca edición destructiva de un movimiento conciliado. Eventos derivados se publicarán mediante outbox pattern cuando exista mensajería.
