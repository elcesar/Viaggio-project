import { CalendarClock } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { formatClp } from '../../../shared/utils/currency';
import { formatDate } from '../../../shared/utils/dates';
export function InstallmentList({ installments }) { return <Card><h2 className="section-title"><CalendarClock size={19} /> Cuotas familiares</h2>{installments.map((item) => <div className="list-row" key={item.id}><div><b>{item.label}</b><small>Vence {formatDate(item.dueDate)} · {formatClp(item.amountClp)}</small></div><StatusBadge status={item.status} /></div>)}</Card>; }
