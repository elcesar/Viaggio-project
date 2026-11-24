# Inventario de demo estática

Fecha de auditoría: 24 de noviembre de 2026.

`demo/index.html` es un prototipo autónomo de 304 líneas visuales, con HTML, CSS y JavaScript embebidos. Usa Lucide desde CDN, imágenes remotas de Unsplash y `localStorage` para simular operaciones por contexto de colegio, curso y gira.

## Inventario funcional

| Área | Elementos observados | Estado actual |
|---|---|---|
| Sitio público | Hero, journey de 8 etapas, propuesta comercial, tienda, cumplimiento, alianzas, formulario de empresas | Demostrativo; los formularios no envían información a servidor. |
| Acceso privado | Modal de acceso, selector de rol y contextos simulados | Demostrativo; no hay autenticación ni autorización real. |
| Portal | Sidebar, header, navegación móvil, vistas y tarjetas | Operativo visualmente en navegador. |
| Operación de gira | Giras, tareas, presupuesto, cobranza, calendario, documentos, fotos y mural | Estado local en navegador; no es persistencia productiva. |
| Finanzas | Indicadores, movimientos, cuotas, presupuesto y rendición | Datos de ejemplo; no existe libro inmutable ni conciliación real. |
| Comunidad | Mural por colegio, comentarios, galería y eventos | Simulación local; no existe moderación ni consentimiento verificable. |

## Dependencias y riesgos de migración

- JavaScript, estilos y datos están acoplados al DOM en un solo archivo.
- Hay handlers inline, variables globales y listeners delegados; no se trasladan automáticamente a React.
- Las reglas de acceso visuales no constituyen autorización de producción.
- Las imágenes remotas y el CDN de iconos deben evaluarse antes de producción.
- Datos actuales representan escenarios de maqueta, no contratos de API.
- La demo se mantiene como rollback y referencia visual durante la migración.
