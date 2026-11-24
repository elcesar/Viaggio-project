import { Megaphone } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { formatDate } from '../../../shared/utils/dates';
export function ImportantNotices({ notices }) { return <Card><h2 className="section-title"><Megaphone size={19} /> Comunicados</h2>{notices.length ? notices.map((notice) => <div key={notice.id} className="list-row"><div><b>{notice.title}</b><small>{notice.category} · {formatDate(notice.date)}</small></div><span className={notice.isRead ? 'notice-read' : 'notice-new'}>{notice.isRead ? 'Leído' : 'Nuevo'}</span></div>) : <EmptyState title="No hay comunicados nuevos" />}</Card>; }
