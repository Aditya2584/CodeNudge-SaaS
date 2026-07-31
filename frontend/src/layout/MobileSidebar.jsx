import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  LayoutDashboard, 
  ListTodo, 
  CalendarCheck, 
  BarChart3, 
  Settings, 
  LogOut, 
  Code2 
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Problems', path: '/problems', icon: ListTodo, badge: '24' },
    { name: "Today's Revision", path: '/revision', icon: CalendarCheck, badge: '3', badgeVariant: 'primary' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    onClose();
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Content */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-4/5 max-w-xs bg-surface border-r border-white/[0.08] h-full flex flex-col z-10 shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
              <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-glow">
                  <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <span className="text-base font-bold tracking-tight text-white">CodeNudge</span>
              </Link>
              <button
                onClick={onClose}
                className="text-muted hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted/60 mb-2">
                Navigation Menu
              </p>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-muted hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted'}`} />
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
            </div>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-white/[0.06] space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-hover border border-white/[0.06]">
                <Avatar name="LeetCoder" size="md" status="online" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">LeetCoder</span>
                  <span className="text-xs text-muted">user@example.com</span>
                </div>
              </div>
              <Button
                variant="danger"
                className="w-full justify-center text-sm py-2.5"
                leftIcon={<LogOut className="w-4 h-4" />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
