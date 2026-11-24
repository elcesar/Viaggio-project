import { Target } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { ProgressBar } from '../../../shared/components/ProgressBar';
import { formatClp } from '../../../shared/utils/currency';
export function FundingProgressCard({ funding }) { return <Card className="funding-card"><p className="card-kicker"><Target size={15} /> Fondo de la generación</p><strong>{funding.percentage}%</strong><p>{formatClp(funding.fundedClp)} de {formatClp(funding.targetClp)}</p><ProgressBar value={funding.percentage} /></Card>; }
