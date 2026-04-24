import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  CalendarDays,
  Users,
  Star,
  BarChart3,
  LogOut,
  Mountain,
  Dumbbell,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/events', labelKey: 'nav.events', Icon: CalendarDays },
  { to: '/activities', labelKey: 'nav.activities', Icon: Dumbbell },
  { to: '/users', labelKey: 'nav.users', Icon: Users },
  { to: '/reviews', labelKey: 'nav.reviews', Icon: Star },
  { to: '/analytics', labelKey: 'nav.analytics', Icon: BarChart3 },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const logout = useAuthStore((s) => s.logout);

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand">
          <Mountain className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Together</p>
          <p className="text-xs text-muted-foreground">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, labelKey, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          {t('auth.logout')}
        </Button>
      </div>
    </aside>
  );
}
