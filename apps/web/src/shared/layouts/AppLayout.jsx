import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { MobileNavigation } from './MobileNavigation';

export function AppLayout() {
  return <div className="app-shell"><AppSidebar /><main className="app-main"><AppHeader /><div className="app-content"><Outlet /></div></main><MobileNavigation /></div>;
}
