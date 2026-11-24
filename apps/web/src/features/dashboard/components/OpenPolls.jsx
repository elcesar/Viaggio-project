import { Vote } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ProgressBar } from '../../../shared/components/ProgressBar';
import { formatDate } from '../../../shared/utils/dates';
export function OpenPolls({ polls }) { return <Card><h2 className="section-title"><Vote size={19} /> Votaciones abiertas</h2>{polls.length ? polls.map((poll) => <div key={poll.id} className="poll-row"><b>{poll.title}</b><small>Cierra el {formatDate(poll.closesAt)} · Participación: {poll.participation}%</small><ProgressBar value={poll.participation} /></div>) : <EmptyState title="No hay votaciones abiertas" />}</Card>; }
