import { LayoutDashboard, FileText, ReceiptText, Vote } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const links = [['/app/dashboard', 'Inicio', LayoutDashboard], ['/app/account', 'Cuenta', ReceiptText], ['/app/documents', 'Docs', FileText], ['/app/polls', 'Votos', Vote]];
export function MobileNavigation() { return <nav className="mobile-navigation" aria-label="Navegación móvil">{links.map(([to, label, Icon]) => <NavLink key={to} to={to}><Icon size={18} /><span>{label}</span></NavLink>)}</nav>; }
