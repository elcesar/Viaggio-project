import { Building2, CalendarDays, FileText, LayoutDashboard, Map, ReceiptText, UsersRound, Vote } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  ['/app/dashboard', 'Mi generación', LayoutDashboard], ['/app/trip', 'Mi gira', Map],
  ['/app/account', 'Mi cuenta', ReceiptText], ['/app/documents', 'Documentos', FileText],
  ['/app/events', 'Eventos', CalendarDays], ['/app/polls', 'Votaciones', Vote],
  ['/app/organization', 'Colegio y gira', Building2], ['/app/families', 'Familias', UsersRound],
];

export function AppSidebar() {
  return <aside className="app-sidebar"><a className="sidebar-brand" href="/">Viaggio<span>.</span></a><p className="sidebar-label">Espacio de familia</p><nav aria-label="Navegación principal">{navigation.map(([to, label, Icon]) => <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}><Icon size={18} />{label}</NavLink>)}</nav><div className="sidebar-note"><strong>Gira Italia 2028</strong><span>Información ficticia de demostración.</span></div></aside>;
}
