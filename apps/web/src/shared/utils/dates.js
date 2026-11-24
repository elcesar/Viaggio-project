export function formatDate(value) { const date = new Date(`${value}T12:00:00`); return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short', year: 'numeric' }).format(date); }
