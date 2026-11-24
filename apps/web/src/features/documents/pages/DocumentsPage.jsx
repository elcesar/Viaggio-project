import { useMemo, useState } from 'react';
import { Download, FileCheck2, FileText, Search, ShieldAlert, Upload } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { PageContainer } from '../../../shared/layouts/PageContainer';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { documentsMock } from '../data/documentsMock';
import '../documents.css';

const filters = ['Todos', 'Pendiente', 'En revisión', 'Disponible'];

export function DocumentsPage() {
  const [filter, setFilter] = useState('Todos');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const visibleDocuments = useMemo(() => documentsMock.filter((document) => {
    const matchesFilter = filter === 'Todos' || document.status === filter;
    const matchesQuery = `${document.title} ${document.owner} ${document.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [filter, query]);

  return <PageContainer>
    <div className="page-heading">
      <div><p className="eyebrow">Mi gira · Documentación</p><h1>Documentos</h1><p>Consulta el estado de la documentación de tu familia.</p></div>
      <button className="button button--primary" onClick={() => setNotice('La carga real se habilitará cuando esté disponible el almacenamiento privado.')}><Upload size={17} /> Solicitar carga</button>
    </div>
    <div className="callout" role="note"><ShieldAlert size={21} /><div><strong>Vista de demostración</strong><p>Los registros son ficticios. No cargues documentos reales ni información sensible en esta versión.</p></div></div>
    {notice && <p className="module-notice" role="status">{notice}</p>}
    <Card className="documents-card">
      <div className="module-toolbar">
        <label className="search-field"><Search size={17} /><input aria-label="Buscar documentos" placeholder="Buscar por nombre o categoría" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <div className="filter-tabs" aria-label="Filtrar documentos">{filters.map((item) => <button key={item} className={filter === item ? 'is-selected' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
      </div>
      <div className="documents-list">
        {visibleDocuments.map((document) => <article className="document-row" key={document.id}>
          <span className="document-icon"><FileText size={19} /></span>
          <div className="document-main"><strong>{document.title}</strong><small>{document.owner} · {document.category}</small></div>
          <div className="document-status"><StatusBadge status={document.status} />{document.dueDate && <small>Plazo: {new Date(`${document.dueDate}T12:00:00`).toLocaleDateString('es-CL')}</small>}</div>
          <button className="icon-action" aria-label={`Ver ${document.title}`} title="Acción de demostración" onClick={() => setNotice(`“${document.title}” no tiene archivo asociado en esta maqueta.`)}><Download size={17} /></button>
        </article>)}
        {visibleDocuments.length === 0 && <div className="empty-state"><FileCheck2 size={25} /><strong>No encontramos documentos</strong><span>Cambia el filtro o prueba con otro término.</span></div>}
      </div>
    </Card>
  </PageContainer>;
}
