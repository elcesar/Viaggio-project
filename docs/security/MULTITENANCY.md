# Multiinstitución

Toda entidad transaccional deberá incluir `tenant_id`, `trip_project_id`, `created_at` y `created_by`; según corresponda, `school_id`, `course_id`, `family_account_id`, `updated_at`, `updated_by` y `deleted_at`.

Jerarquía: Tenant -> School -> Course -> TripProject -> familias, estudiantes, finanzas, documentos, eventos, votaciones, agencias y cotizaciones.

Se evaluará Row Level Security en PostgreSQL como defensa adicional. Toda consulta validará membrecía y alcance antes de leer o modificar recursos.
