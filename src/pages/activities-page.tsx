import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  IActivity,
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from '@/api/activities';

interface ActivityFormState {
  name: string;
  icon: string;
}

type DialogMode = 'create' | 'edit' | null;

export default function ActivitiesPage() {
  const { t } = useTranslation();
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [editTarget, setEditTarget] = useState<IActivity | null>(null);
  const [form, setForm] = useState<ActivityFormState>({ name: '', icon: '' });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<IActivity | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchActivities();
      setActivities(data);
    } catch {
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm({ name: '', icon: '' });
    setFormError('');
    setEditTarget(null);
    setDialogMode('create');
  };

  const openEdit = (a: IActivity) => {
    setForm({ name: a.name, icon: a.icon });
    setFormError('');
    setEditTarget(a);
    setDialogMode('edit');
  };

  const closeDialog = () => {
    setDialogMode(null);
    setEditTarget(null);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setFormError(t('activities.nameRequired')); return; }
    if (!form.icon.trim()) { setFormError(t('activities.iconRequired')); return; }
    setSaving(true);
    setFormError('');
    try {
      if (dialogMode === 'create') {
        const created = await createActivity({ name: form.name.trim(), icon: form.icon.trim() });
        setActivities((prev) => [created, ...prev]);
      } else if (dialogMode === 'edit' && editTarget) {
        const updated = await updateActivity(editTarget._id, { name: form.name.trim(), icon: form.icon.trim() });
        setActivities((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
      }
      closeDialog();
    } catch {
      setFormError(t('common.error'));
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (a: IActivity) => {
    try {
      const updated = await updateActivity(a._id, { isActive: !a.isActive });
      setActivities((prev) => prev.map((x) => (x._id === updated._id ? updated : x)));
    } catch {}
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteActivity(deleteTarget._id);
      setActivities((prev) => prev.filter((a) => a._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch {}
    setDeleting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('activities.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('activities.subtitle')}</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          {t('activities.create')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-5 w-5 text-brand" />
            {t('activities.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm text-muted-foreground">{t('common.loading')}</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!loading && !error && activities.length === 0 && (
            <p className="text-sm text-muted-foreground">{t('common.noData')}</p>
          )}
          {!loading && activities.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">{t('activities.icon')}</th>
                  <th className="pb-3 pr-4 font-medium">{t('activities.name')}</th>
                  <th className="pb-3 pr-4 font-medium">{t('activities.status')}</th>
                  <th className="pb-3 font-medium">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a) => (
                  <tr key={a._id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
                        <img src={a.icon} alt={a.name} className="h-5 w-5" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-medium">{a.name}</td>
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => handleToggleActive(a)}
                        className="flex items-center gap-1.5 text-xs"
                      >
                        {a.isActive ? (
                          <>
                            <ToggleRight className="h-4 w-4 text-success" />
                            <span className="text-success">{t('activities.active')}</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t('activities.inactive')}</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(a)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeleteTarget(a)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {dialogMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">
              {dialogMode === 'create' ? t('activities.create') : t('activities.edit')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t('activities.name')}</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder={t('activities.namePlaceholder')}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t('activities.iconUrl')}</label>
                <Input
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  placeholder="https://example.com/icon.svg"
                />
              </div>
              {formError && <p className="text-sm text-destructive">{formError}</p>}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={closeDialog} disabled={saving}>{t('common.cancel')}</Button>
              <Button onClick={handleSave} disabled={saving}>{saving ? t('common.loading') : t('common.save')}</Button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-xl">
            <h2 className="mb-2 text-lg font-semibold">{t('activities.deleteTitle')}</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              {t('activities.deleteConfirm', { name: deleteTarget.name })}
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>{t('common.cancel')}</Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                {deleting ? t('common.loading') : t('common.delete')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
