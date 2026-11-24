import { PageContainer } from '../../../shared/layouts/PageContainer';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingState } from '../../../shared/components/LoadingState';
import { useFinanceOverview } from '../hooks/useFinanceOverview';
import { BudgetSummary } from '../components/BudgetSummary';
import { InstallmentList } from '../components/InstallmentList';
import { LedgerTable } from '../components/LedgerTable';
export function FinancePage() { const query = useFinanceOverview(); if (query.isLoading) return <PageContainer><LoadingState /></PageContainer>; if (query.isError) return <PageContainer><ErrorState onRetry={() => query.refetch()} /></PageContainer>; return <PageContainer><header className="page-heading"><div><p className="eyebrow">Finanzas de la gira</p><h1>Presupuesto y trazabilidad</h1><p>Datos ficticios. Viaggio no recibe ni custodia fondos; los pagos integrados no forman parte de esta etapa.</p></div></header><div className="dashboard-grid dashboard-grid--primary"><BudgetSummary budget={query.data.budget} /><InstallmentList installments={query.data.installments} /></div><LedgerTable entries={query.data.ledger} /></PageContainer>; }
