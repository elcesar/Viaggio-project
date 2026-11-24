import { CalendarDays } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { formatDate } from '../../../shared/utils/dates';
export function UpcomingEvents({ events }) { return <Card><h2 className="section-title"><CalendarDays size={19} /> Próximas actividades</h2>{events.length ? events.map((event) => <div key={event.id} className="list-row"><div><b>{event.title}</b><small>{formatDate(event.date)} · {event.place}</small></div><StatusBadge status={event.registrationStatus} /></div>) : <EmptyState title="No hay actividades próximas" />}</Card>; }
