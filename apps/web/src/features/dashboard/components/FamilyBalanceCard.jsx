import { WalletCards } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { formatClp } from '../../../shared/utils/currency';
import { formatDate } from '../../../shared/utils/dates';
export function FamilyBalanceCard({ account }) { return <Card><p className="card-kicker"><WalletCards size={15} /> Cuenta familiar</p><div className="balance-line"><div><span>Avance de Martina Demo</span><strong>{formatClp(account.balanceClp)}</strong></div><div><span>Próxima cuota</span><strong>{formatClp(account.nextInstallmentClp)}</strong><small>Vence {formatDate(account.nextDueDate)}</small></div></div><div className="movement-list">{account.recentMovements.map((movement) => <div key={movement.id} className="movement-row"><div><b>{movement.title}</b><small>{formatDate(movement.date)}</small></div><div><b>+{formatClp(movement.amountClp)}</b><StatusBadge status={movement.status} /></div></div>)}</div></Card>; }
