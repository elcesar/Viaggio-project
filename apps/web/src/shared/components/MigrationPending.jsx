import { Construction } from 'lucide-react';
import { PageContainer } from '../layouts/PageContainer';
export function MigrationPending({ title }) { return <PageContainer><div className="pending-page"><Construction size={32} /><p className="eyebrow">Migración progresiva</p><h1>{title}</h1><p>Esta sección sigue disponible en la demo estática mientras se migra a React con contratos y controles productivos.</p></div></PageContainer>; }
