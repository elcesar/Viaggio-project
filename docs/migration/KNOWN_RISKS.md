# Riesgos conocidos de migración

1. La demo simula controles de rol, pero no tiene autenticación ni aislamiento de datos real.
2. El estado local puede perderse y no permite auditoría ni concurrencia.
3. La migración coexistirá temporalmente con la demo, por lo que pueden existir diferencias visuales menores.
4. Finanzas, documentos y fotos no pueden pasar a producción sin contratos de API, permisos, auditoría y almacenamiento privado.
5. La app React del PR 01 no debe publicarse ni presentar sus guardas de frontend como seguridad productiva.
