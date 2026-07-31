import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListTodo, 
  CalendarCheck, 
  BarChart3, 
  Settings, 
  User, 
  LogOut, 
  Code2, 
  Flame,
  Sparkles
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Dropdown } from '../components/ui/Dropdown';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Problems', path: '/problems', icon: ListTodo, badge: '24' },
    { name: "Today's Revision", path: '/revision', icon: CalendarCheck, badge: '3', badgeVariant: 'primary' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const userMenuItems = [
    { label: 'View Profile', icon: User, onClick: () => navigate('/profile') },
    { label: 'Settings', icon: Settings, onClick: () => navigate('/settings') },
    { divider: true },
    { label: 'Logout', icon: LogOut, danger: true, onClick: handleLogout },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-white/[0.08] h-screen sticky top-0 flex flex-col hidden md:flex shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-glow">
            <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary" />
            </div>
          </div>
          <span className="text-base font-bold tracking-tight text-white">CodeNudge</span>
        </Link>

        <Badge variant="primary" size="sm" icon={Flame}>
          7d Streak
        </Badge>
      </div>

      {/* Main super Linear-style Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted/60 mb-2">
            Main Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow-sm' 
                      : 'text-muted hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : 'text-muted group-hover:text-white'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant={item.badgeVariant || 'outline'} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* LeetCode Sync Widget */}
        <div className="p-3.5 rounded-xl bg-gradient-to-b from-surface-hover to-background border border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <p className="text-xs font-semibold text-white mb-1">LeetCode Sync</p>
          <p className="text-[11px] text-muted mb-3 leading-relaxed">
            Chrome extension active & sync ready.
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Auto-Sync Connected
          </span>
        </div>
      </div>

      {/* Logout Action & User Profile Footer */}
      <div className="p-3 border-t border-white/[0.06] space-y-1">
        <Dropdown
          align="left"
          items={userMenuItems}
          trigger={
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.06] cursor-pointer transition-colors group">
              <div className="flex items-center gap-2.5">
                <Avatar name="LeetCoder" size="sm" status="online" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-none">LeetCoder</span>
                  <span className="text-[10px] text-muted mt-1 leading-none">Pro Plan</span>
                </div>
              </div>
              <LogOut className="w-4 h-4 text-muted group-hover:text-red-400 transition-colors" />
            </div>
          }
        />
      </div>
    </aside>
  );
};

export default Sidebar;
