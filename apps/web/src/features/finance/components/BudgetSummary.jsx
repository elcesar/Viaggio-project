import { Landmark } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { ProgressBar } from '../../../shared/components/ProgressBar';
import { formatClp } from '../../../shared/utils/currency';
export function BudgetSummary({ budget }) { const percentage = Math.round((budget.committedClp / budget.targetClp) * 100); return <Card className="budget-card"><p className="card-kicker"><Landmark size={15} /> Presupuesto de la gira</p><div className="budget-amounts"><div><span>Meta</span><b>{formatClp(budget.targetClp)}</b></div><div><span>Comprometido</span><b>{formatClp(budget.committedClp)}</b></div></div><ProgressBar value={percentage} /><p className="budget-note">Disponible según presupuesto: <b>{formatClp(budget.availableClp)}</b> · Egresos aprobados: {formatClp(budget.approvedExpensesClp)}</p></Card>; }
