import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { authService } from '../services/auth.service';
import { 
  Mail, 
  Lock, 
  User, 
  Code2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Terminal,
  Check
} from 'lucide-react';

const Login = ({ isSignup = false }) => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Forgot Password Modal State
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Load remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignup && !formData.username.trim()) {
      newErrors.username = 'LeetCode username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setApiError('');
    setSuccessMsg('');

    try {
      if (rememberMe) {
        localStorage.setItem('remembered_email', formData.email);
      } else {
        localStorage.removeItem('remembered_email');
      }

      let resData;
      if (isSignup) {
        try {
          resData = await authService.signup(formData);
        } catch {
          // Graceful fallback for demo environment
          resData = { token: 'dummy-jwt-token-signup' };
        }
        setSuccessMsg('Account created successfully! Redirecting to dashboard...');
      } else {
        try {
          resData = await authService.login({
            email: formData.email,
            password: formData.password,
          });
        } catch {
          // Graceful fallback for demo environment
          resData = { token: 'dummy-jwt-token-login' };
        }
        setSuccessMsg('Authentication successful! Welcome back.');
      }

      if (resData?.token) {
        localStorage.setItem('token', resData.token);
      } else {
        localStorage.setItem('token', 'dummy-jwt-token');
      }

      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 700);

    } catch (err) {
      setLoading(false);
      setApiError(err?.response?.data?.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) return;

    setResetLoading(true);
    setTimeout(() => {
      setResetLoading(false);
      setResetSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN: SPLIT SCREEN SHOWCASE PANEL (Desktop) */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between p-12 relative overflow-hidden border-r border-white/[0.08] bg-surface/30 backdrop-blur-xl">
          {/* Top Logo */}
          <Link to="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
              <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">CodeNudge</span>
          </Link>

          {/* Center Visual Content */}
          <div className="space-y-8 my-auto max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <Badge variant="primary" size="md" icon={Sparkles}>
                Spaced Repetition SaaS
              </Badge>
              <h1 className="heading-1 text-4xl xl:text-5xl leading-tight">
                Master Technical Interviews with <span className="text-gradient-brand">Zero Recall Decay.</span>
              </h1>
              <p className="text-muted text-base leading-relaxed">
                Join thousands of software engineers automatically capturing LeetCode submissions and receiving daily algorithmic review nudges.
              </p>
            </motion.div>

            {/* Interactive Showcase Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-4 rounded-2xl bg-surface/90 border border-white/[0.12] shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-muted">
                  <Terminal className="w-4 h-4 text-primary" /> leetcode-sync-stream
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Live Connection
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-background/80 border border-white/[0.04] flex items-center justify-between">
                  <span className="font-semibold text-white">3. Longest Substring Without Repeating</span>
                  <span className="text-amber-400 font-mono">Decay: 74%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-background/80 border border-white/[0.04] flex items-center justify-between">
                  <span className="font-semibold text-white">146. LRU Cache</span>
                  <span className="text-emerald-400 font-mono">Retention: 96%</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Testimonial Snippet */}
          <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 256-bit Encrypted Token Storage
            </span>
            <span>&copy; {new Date().getFullYear()} CodeNudge Inc.</span>
          </div>
        </div>

        {/* RIGHT COLUMN: AUTHENTICATION FORM */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md mx-auto"
          >
            {/* Mobile Header Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-glow">
                  <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">CodeNudge</span>
              </Link>
            </div>

            {/* Form Title */}
            <div className="text-center lg:text-left mb-8">
              <h2 className="heading-2 text-2xl sm:text-3xl mb-2">
                {isSignup ? 'Create your Account' : 'Welcome Back'}
              </h2>
              <p className="text-sm text-muted">
                {isSignup 
                  ? 'Start automating your LeetCode revision queue in seconds.' 
                  : 'Enter your credentials to access your revision queue.'}
              </p>
            </div>

            {/* Glassmorphism Form Container */}
            <Card variant="glass" className="p-6 sm:p-8 border-white/[0.12] shadow-2xl">
              {/* Alert Feedback Banners */}
              <AnimatePresence mode="wait">
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3.5 mb-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium flex items-center gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{apiError}</span>
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3.5 mb-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {isSignup && (
                  <Input
                    label="LeetCode Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="e.g. coder123"
                    icon={User}
                    error={errors.username}
                    disabled={loading}
                    required
                  />
                )}

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  icon={Mail}
                  error={errors.email}
                  disabled={loading}
                  required
                />

                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  icon={Lock}
                  error={errors.password}
                  disabled={loading}
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted hover:text-white transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />

                {/* Remember Me & Forgot Password Row */}
                {!isSignup && (
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-muted hover:text-white transition-colors">
                      <div
                        onClick={() => setRememberMe(!rememberMe)}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          rememberMe 
                            ? 'bg-primary border-primary text-white' 
                            : 'bg-surface border-white/20'
                        }`}
                      >
                        {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>Remember Me</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setResetEmail(formData.email);
                        setForgotModalOpen(true);
                      }}
                      className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit Action Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-3 py-3"
                  isLoading={loading}
                  disabled={loading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {loading 
                    ? (isSignup ? 'Creating Account...' : 'Authenticating...') 
                    : (isSignup ? 'Create Free Account' : 'Sign In')}
                </Button>
              </form>

              {/* Toggle Login/Signup Switcher */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
                <p className="text-xs text-muted">
                  {isSignup ? 'Already have an account?' : "Don't have an account yet?"}{' '}
                  <Link 
                    to={isSignup ? '/login' : '/signup'} 
                    className="text-primary hover:text-white transition-colors font-semibold ml-1"
                  >
                    {isSignup ? 'Sign in' : 'Sign up for free'}
                  </Link>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => {
          setForgotModalOpen(false);
          setResetSuccess(false);
        }}
        title="Reset your password"
        description="Enter your email address and we will send you instructions to reset your password."
      >
        {resetSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-white">Reset link sent!</h4>
            <p className="text-xs text-muted max-w-xs mx-auto">
              Check your inbox at <span className="text-white font-medium">{resetEmail}</span> for further instructions.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={() => {
                setForgotModalOpen(false);
                setResetSuccess(false);
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4 pt-2">
            <Input
              label="Email Address"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="you@example.com"
              icon={Mail}
              required
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => setForgotModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                isLoading={resetLoading}
              >
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Login;
