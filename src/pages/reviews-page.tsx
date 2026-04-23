import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReviewsPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('reviews.title')}</h1>
        <p className="text-sm text-muted-foreground">Moderate user reviews</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Star className="h-5 w-5 text-brand" />
            {t('reviews.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{t('common.noData')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
