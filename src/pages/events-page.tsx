import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IEvent, fetchAdminEvents, updateEventStatus } from '@/api/events';

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  medium: 'Medium',
  pro: 'Pro',
};

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-warning/15 text-warning',
  approved: 'bg-success/15 text-success',
  rejected: 'bg-destructive/15 text-destructive',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

export default function EventsPage() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async (status?: string) => {
    setLoading(true);
    try {
      const data = await fetchAdminEvents(status === 'all' ? undefined : status);
      setEvents(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load(filter);
  }, [filter]);

  const handleStatus = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingId(id);
    try {
      const updated = await updateEventStatus(id, status);
      setEvents((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
    } catch {}
    setUpdatingId(null);
  };

  const STATUS_TABS: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: t('events.statusAll') },
    { key: 'pending', label: t('events.statusPending') },
    { key: 'approved', label: t('events.statusApproved') },
    { key: 'rejected', label: t('events.statusRejected') },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('events.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('events.subtitle')}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {STATUS_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === key
                ? 'bg-brand text-white'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarDays className="h-5 w-5 text-brand" />
            {t('events.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm text-muted-foreground">{t('common.loading')}</p>}
          {!loading && events.length === 0 && (
            <p className="text-sm text-muted-foreground">{t('common.noData')}</p>
          )}
          {!loading && events.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">{t('events.activity')}</th>
                  <th className="pb-3 pr-4 font-medium">{t('events.location')}</th>
                  <th className="pb-3 pr-4 font-medium">{t('events.date')}</th>
                  <th className="pb-3 pr-4 font-medium">{t('events.difficulty')}</th>
                  <th className="pb-3 pr-4 font-medium">{t('events.participants')}</th>
                  <th className="pb-3 pr-4 font-medium">{t('events.status')}</th>
                  <th className="pb-3 font-medium">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev._id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4 font-medium">{ev.activity?.name ?? '—'}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{ev.location}</td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {formatDate(ev.dateFrom)}{ev.dateTo ? ` — ${formatDate(ev.dateTo)}` : ''}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                        {DIFFICULTY_LABELS[ev.difficulty] ?? ev.difficulty}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {ev.spotsFilled + ev.alreadyGoing} / {ev.spots}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[ev.status] ?? ''}`}>
                        {t(`events.status_${ev.status}`)}
                      </span>
                    </td>
                    <td className="py-3">
                      {ev.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 text-success hover:text-success"
                            disabled={updatingId === ev._id}
                            onClick={() => handleStatus(ev._id, 'approved')}
                          >
                            <Check className="h-4 w-4" />
                            {t('events.approve')}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 text-destructive hover:text-destructive"
                            disabled={updatingId === ev._id}
                            onClick={() => handleStatus(ev._id, 'rejected')}
                          >
                            <X className="h-4 w-4" />
                            {t('events.reject')}
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
