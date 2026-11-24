import { Bell } from 'lucide-react';

export function AppHeader() {
  return <header className="app-header"><span>Espacio privado / Mi generación</span><div className="app-user"><button className="icon-button" type="button" aria-label="Notificaciones"><Bell size={18} /><span className="notification-count">3</span></button><span className="avatar" aria-hidden="true">FR</span><div><strong>Familia Rossi Demo</strong><small>Apoderado</small></div></div></header>;
}
