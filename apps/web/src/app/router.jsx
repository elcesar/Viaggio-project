import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ParentDashboardPage } from '../features/dashboard';
import { OrganizationPage } from '../features/organization/pages/OrganizationPage';
import { FamiliesPage } from '../features/families/pages/FamiliesPage';
import { AppLayout } from '../shared/layouts/AppLayout';
import { MigrationPending } from '../shared/components/MigrationPending';

const pendingPages = [
  ['trip', 'Gira'], ['account', 'Estado de cuenta'], ['documents', 'Documentos'],
  ['events', 'Eventos'], ['polls', 'Votaciones'],
];

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/app/dashboard" replace /> },
  {
    path: '/app', element: <AppLayout />, children: [
      { path: 'dashboard', element: <ParentDashboardPage /> },
      { path: 'organization', element: <OrganizationPage /> },
      { path: 'families', element: <FamiliesPage /> },
      ...pendingPages.map(([path, title]) => ({ path, element: <MigrationPending title={title} /> })),
    ],
  },
  { path: '*', element: <Navigate to="/app/dashboard" replace /> },
]);
