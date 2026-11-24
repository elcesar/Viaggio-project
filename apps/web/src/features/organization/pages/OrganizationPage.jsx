import { Building2, Plus } from 'lucide-react';
import { PageContainer } from '../../../shared/layouts/PageContainer';
import { ContextSummary } from '../components/ContextSummary';
import { organizationMock } from '../../../mocks/organizationData';
export function OrganizationPage() { return <PageContainer><header className="page-heading"><div><p className="eyebrow">Administración institucional</p><h1>Colegio, curso y gira</h1><p>Contexto ficticio de administración. En producción, cada acción estará limitada al colegio y rol autorizados.</p></div><button type="button" className="button button--primary"><Plus size={17} /> Crear gira</button></header><ContextSummary organization={organizationMock} /><section className="callout"><Building2 size={20} /><div><b>Jerarquía productiva</b><p>Todo registro futuro se asociará a tenant, colegio, curso y gira. La separación visual de esta maqueta será reemplazada por controles de API y base de datos.</p></div></section></PageContainer>; }
