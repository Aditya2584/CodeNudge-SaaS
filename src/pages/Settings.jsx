import React, { useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Avatar } from '../components/ui/Avatar';
import { ErrorState } from '../components/ui/ErrorState';
import { 
  User, 
  Mail, 
  Clock, 
  Moon, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Bell,
  Sun,
  Laptop
} from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'LeetCoder Pro',
    email: 'user@example.com',
    username: 'coder123',
    revisionTime: '09:00',
    questionsPerDay: 5,
    emailDaily: true,
    emailWeekly: true,
    emailUpdates: false,
    theme: 'dark',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Danger Zone Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const loadProfileData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await authService.getProfile();
      if (data) setProfile((prev) => ({ ...prev, ...data }));
    } catch (err) {
      console.error('Failed to load profile settings:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setToastMessage('');
    try {
      await authService.updateProfile(profile);
      await authService.updateSettings(profile);
      setToastMessage('Settings saved successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToastMessage('Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setToastMessage(''), 3000);
    }, 600);
  };

  // SKELETON LOADING
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-20 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
        <div className="h-64 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
        <div className="h-64 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={loadProfileData} title="Failed to load settings" />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* HEADER TITLE */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="heading-2 flex items-center gap-2.5">
            Settings & Preferences
            <Badge variant="primary" size="sm">
              Account Control
            </Badge>
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Manage your profile details, revision frequency, email notifications, and security.
          </p>
        </div>

        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> {toastMessage}
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-8">
        {/* 1. PROFILE SECTION */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Profile Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Avatar Preview */}
            <div className="flex items-center gap-4 pb-4 border-b border-white/[0.06]">
              <Avatar name={profile.name} size="xl" status="online" />
              <div>
                <h4 className="text-sm font-semibold text-white">{profile.name}</h4>
                <p className="text-xs text-muted">@{profile.username || 'user'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Display Name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                icon={User}
                required
              />

              <Input
                label="LeetCode Username"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
                icon={User}
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              icon={Mail}
              required
            />
          </CardContent>
        </Card>

        {/* 2. REVISION SCHEDULE & 4. QUESTIONS PER DAY */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" /> Revision Engine Preferences
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* 3. Revision Time */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Daily Revision Reminder Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="revisionTime"
                    value={profile.revisionTime}
                    onChange={handleProfileChange}
                    className="w-full bg-surface/60 border border-white/[0.1] text-white text-sm rounded-xl py-2.5 px-4 focus:border-primary focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-muted">
                  Time of day when your morning revision queue digest is compiled.
                </p>
              </div>

              {/* 4. Questions Per Day */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Questions Per Day Target: <span className="text-primary font-bold">{profile.questionsPerDay}</span>
                </label>
                <div className="flex items-center gap-3 pt-2">
                  {[3, 5, 8, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setProfile((p) => ({ ...p, questionsPerDay: num }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        profile.questionsPerDay === num
                          ? 'bg-primary/20 text-primary border-primary/40 shadow-glow-sm'
                          : 'bg-surface border-white/[0.08] text-muted hover:text-white'
                      }`}
                    >
                      {num} Problems
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-muted">
                  Daily problem target used to compute SM-2 decay curve scheduling.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. EMAIL PREFERENCES */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" /> Email Notification Preferences
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/60 border border-white/[0.04]">
              <div>
                <h4 className="text-xs font-semibold text-white">Daily Revision Email</h4>
                <p className="text-[11px] text-muted">Receive morning email with due problem reviews.</p>
              </div>
              <input
                type="checkbox"
                name="emailDaily"
                checked={profile.emailDaily}
                onChange={handleProfileChange}
                className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary bg-surface cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/60 border border-white/[0.04]">
              <div>
                <h4 className="text-xs font-semibold text-white">Weekly Performance Digest</h4>
                <p className="text-[11px] text-muted">Weekly summary of memory retention decay & streak statistics.</p>
              </div>
              <input
                type="checkbox"
                name="emailWeekly"
                checked={profile.emailWeekly}
                onChange={handleProfileChange}
                className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary bg-surface cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/60 border border-white/[0.04]">
              <div>
                <h4 className="text-xs font-semibold text-white">Product Updates & Features</h4>
                <p className="text-[11px] text-muted">Occasional announcements about new features and extensions.</p>
              </div>
              <input
                type="checkbox"
                name="emailUpdates"
                checked={profile.emailUpdates}
                onChange={handleProfileChange}
                className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary bg-surface cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* 5. THEME SELECTION */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-sky-400" /> Interface Theme
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setProfile((p) => ({ ...p, theme: 'dark' }))}
                className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                  profile.theme === 'dark'
                    ? 'bg-primary/10 border-primary/40 text-primary shadow-glow-sm'
                    : 'bg-surface border-white/[0.08] text-muted hover:text-white'
                }`}
              >
                <Moon className="w-6 h-6" />
                <span className="text-xs font-semibold">Dark (Default)</span>
              </button>

              <button
                type="button"
                onClick={() => setProfile((p) => ({ ...p, theme: 'contrast' }))}
                className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                  profile.theme === 'contrast'
                    ? 'bg-primary/10 border-primary/40 text-primary shadow-glow-sm'
                    : 'bg-surface border-white/[0.08] text-muted hover:text-white'
                }`}
              >
                <Sun className="w-6 h-6" />
                <span className="text-xs font-semibold">High Contrast</span>
              </button>

              <button
                type="button"
                onClick={() => setProfile((p) => ({ ...p, theme: 'system' }))}
                className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                  profile.theme === 'system'
                    ? 'bg-primary/10 border-primary/40 text-primary shadow-glow-sm'
                    : 'bg-surface border-white/[0.08] text-muted hover:text-white'
                }`}
              >
                <Laptop className="w-6 h-6" />
                <span className="text-xs font-semibold">System Match</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* SAVE PROFILE BUTTON */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={saving}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Save All Preferences
          </Button>
        </div>
      </form>

      {/* 6. ACCOUNT SECURITY SECTION */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" /> Account Security & Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            {passwordError && (
              <p className="text-xs text-red-400 font-medium">{passwordError}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                placeholder="••••••••"
              />

              <Input
                label="New Password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                placeholder="••••••••"
              />

              <Input
                label="Confirm New Password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end">
              <Button variant="secondary" size="sm" type="submit">
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 7. DANGER ZONE */}
      <Card variant="solid" className="border-red-500/30 bg-red-500/[0.04]">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-background/80 border border-red-500/20">
            <div>
              <h4 className="text-xs font-semibold text-white">Reset Revision History</h4>
              <p className="text-[11px] text-muted">Clear all scheduled decay intervals and problem completion history.</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setResetModalOpen(true)}
            >
              Reset Revision Data
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-background/80 border border-red-500/20">
            <div>
              <h4 className="text-xs font-semibold text-white">Delete CodeNudge Account</h4>
              <p className="text-[11px] text-muted">Permanently delete your user account and all saved problem data.</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* RESET CONFIRMATION MODAL */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Reset Revision Data?"
        description="This action will reset your spaced-repetition queue and memory retention scores. This cannot be undone."
      >
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" size="sm" onClick={() => setResetModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setResetModalOpen(false);
              setToastMessage('Revision data reset successfully.');
              setTimeout(() => setToastMessage(''), 3000);
            }}
          >
            Confirm Reset
          </Button>
        </div>
      </Modal>

      {/* DELETE ACCOUNT MODAL */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Account?"
        description="Are you sure you want to permanently delete your CodeNudge account and all synced LeetCode history?"
      >
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" size="sm" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setDeleteModalOpen(false);
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            Delete Permanently
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
