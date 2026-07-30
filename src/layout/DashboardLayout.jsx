import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileSidebar } from './MobileSidebar';
import { 
  Menu, 
  Bell, 
  Search, 
  Command, 
  User, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  History, 
  X
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Dropdown } from '../components/ui/Dropdown';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const notifRef = useRef(null);

  // Close notifications popover on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const userMenuItems = [
    { label: 'View Profile', icon: User, onClick: () => navigate('/profile') },
    { label: 'Account Settings', icon: Settings, onClick: () => navigate('/settings') },
    { divider: true },
    { label: 'Logout', icon: LogOut, danger: true, onClick: handleLogout },
  ];

  const dummyNotifications = [
    {
      id: 1,
      title: 'Revision Queue Updated',
      desc: '3 problems (LRU Cache, Merge Intervals) are due for review today.',
      time: '10m ago',
      icon: History,
      iconColor: 'text-amber-400',
    },
    {
      id: 2,
      title: 'Extension Auto-Synced',
      desc: 'Accepted submission for "Minimum Window Substring" synced.',
      time: '1h ago',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden select-none">
      {/* Desktop Linear-style Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/[0.08] bg-surface/70 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-muted hover:text-white p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Command / Search Input */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface/80 border border-white/[0.08] text-xs text-muted w-72 focus-within:border-primary/50 transition-colors shadow-sm">
              <Search className="w-4 h-4 text-muted shrink-0" />
              <input
                type="text"
                placeholder="Search problems, topics, tags..."
                className="bg-transparent text-white placeholder:text-muted/60 text-xs focus:outline-none w-full"
              />
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted bg-white/[0.06] rounded border border-white/10 shrink-0">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </div>
          </div>

          {/* Right Topbar Actions */}
          <div className="flex items-center gap-3">
            {/* NOTIFICATION AREA POPOVER */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUnreadNotifications(0);
                }}
                className="relative p-2 rounded-xl text-muted hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface border border-white/[0.1] rounded-2xl shadow-2xl z-50 p-4 backdrop-blur-2xl"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">Notifications</span>
                        <Badge variant="primary" size="sm">2 New</Badge>
                      </div>
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="text-muted hover:text-white p-1 rounded-lg hover:bg-white/10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {dummyNotifications.map((n) => {
                        const Icon = n.icon;
                        return (
                          <div
                            key={n.id}
                            className="p-3 rounded-xl bg-surface-hover/80 border border-white/[0.06] flex items-start gap-3 transition-colors hover:border-white/10"
                          >
                            <div className={`p-2 rounded-lg bg-white/[0.04] ${n.iconColor} shrink-0 mt-0.5`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-semibold text-white">{n.title}</h4>
                                <span className="text-[10px] text-muted">{n.time}</span>
                              </div>
                              <p className="text-[11px] text-muted mt-1 leading-relaxed">{n.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

            {/* PROFILE MENU DROPDOWN */}
            <Dropdown
              align="right"
              items={userMenuItems}
              trigger={
                <button className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-colors cursor-pointer">
                  <Avatar name="LeetCoder" size="sm" status="online" />
                  <span className="hidden sm:inline-block text-xs font-semibold text-white">LeetCoder</span>
                </button>
              }
            />
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto relative p-4 sm:p-6 lg:p-8">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
