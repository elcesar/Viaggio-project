import { FileWarning } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { formatDate } from '../../../shared/utils/dates';
export function PendingDocuments({ documents }) { return <Card><h2 className="section-title"><FileWarning size={19} /> Documentos pendientes</h2>{documents.length ? documents.map((document) => <div key={document.id} className="list-row"><div><b>{document.title}</b><small>{document.studentName} · vence {formatDate(document.dueDate)}</small></div><StatusBadge status={document.status} /></div>) : <EmptyState title="No hay documentos pendientes" />}</Card>; }
