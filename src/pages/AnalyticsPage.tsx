import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, CalendarDays, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  { labelKey: 'analytics.totalUsers', value: '—', Icon: Users },
  { labelKey: 'analytics.totalEvents', value: '—', Icon: CalendarDays },
  { labelKey: 'analytics.activeEvents', value: '—', Icon: Activity },
  { labelKey: 'analytics.newUsersThisMonth', value: '—', Icon: TrendingUp },
];

export default function AnalyticsPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('analytics.title')}</h1>
        <p className="text-sm text-muted-foreground">Platform performance overview</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ labelKey, value, Icon }) => (
          <Card key={labelKey}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t(labelKey)}
              </CardTitle>
              <Icon className="h-4 w-4 text-brand" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Chart coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
}
