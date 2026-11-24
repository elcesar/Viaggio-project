import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingState } from '../../../shared/components/LoadingState';
import { PageContainer } from '../../../shared/layouts/PageContainer';
import { useParentDashboard } from '../hooks/useParentDashboard';
import { FamilyBalanceCard } from '../components/FamilyBalanceCard';
import { FundingProgressCard } from '../components/FundingProgressCard';
import { ImportantNotices } from '../components/ImportantNotices';
import { OpenPolls } from '../components/OpenPolls';
import { PendingDocuments } from '../components/PendingDocuments';
import { TripSummaryCard } from '../components/TripSummaryCard';
import { UpcomingEvents } from '../components/UpcomingEvents';

export function ParentDashboardPage() {
  const query = useParentDashboard();
  if (query.isLoading) return <PageContainer><LoadingState /></PageContainer>;
  if (query.isError) return <PageContainer><ErrorState onRetry={() => query.refetch()} /></PageContainer>;
  const data = query.data;
  return <PageContainer><header className="page-heading"><div><p className="eyebrow">Viaggio Home</p><h1>Todo lo importante de tu gira, en un solo lugar.</h1><p>Información ficticia para validar la experiencia del portal de apoderados.</p></div><Link className="button button--primary" to="/app/trip">Ver gira <ArrowRight size={17} /></Link></header><div className="dashboard-grid dashboard-grid--top"><TripSummaryCard trip={data.trip} /><FundingProgressCard funding={data.funding} /></div><div className="dashboard-grid dashboard-grid--primary"><FamilyBalanceCard account={data.familyAccount} /><UpcomingEvents events={data.events} /></div><div className="dashboard-grid dashboard-grid--secondary"><OpenPolls polls={data.polls} /><PendingDocuments documents={data.documents} /><ImportantNotices notices={data.notices} /></div></PageContainer>;
}
