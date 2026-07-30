import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  ArrowRight, 
  Globe, 
  Code2, 
  RefreshCw, 
  Layers, 
  Mail, 
  BarChart3, 
  Shield, 
  Lock, 
  Sparkles, 
  Star,
  ArrowDown,
  Terminal,
  Cpu,
  Laptop
} from 'lucide-react';

const Landing = () => {
  // Motion animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const featureCards = [
    {
      title: 'JWT Authentication',
      description: 'Secure stateful and stateless authentication tokens built on industry standards.',
      icon: Lock,
      badge: 'Security',
      color: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-400',
    },
    {
      title: 'Chrome Extension',
      description: 'Seamless zero-click browser extension that detects LeetCode AC submissions.',
      icon: Laptop,
      badge: 'Browser Sync',
      color: 'from-sky-500/20 to-blue-500/20',
      iconColor: 'text-sky-400',
    },
    {
      title: 'Automatic Sync',
      description: 'Instant background synchronization keeps your problem statistics up to date.',
      icon: RefreshCw,
      badge: 'Real-time',
      color: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      title: '2 Queue Revision Engine',
      description: 'Dual-phase SM-2 spaced repetition queue designed specifically for coding algorithms.',
      icon: Layers,
      badge: 'Core Engine',
      color: 'from-primary/20 to-secondary/20',
      iconColor: 'text-primary',
    },
    {
      title: 'Daily Email Reminders',
      description: 'Smart morning email digests with your top due revisions to keep memory fresh.',
      icon: Mail,
      badge: 'Notifications',
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Visualize decay curves, topic blind spots, and long-term retention performance.',
      icon: BarChart3,
      badge: 'Insights',
      color: 'from-accent/20 to-amber-500/20',
      iconColor: 'text-accent',
    },
    {
      title: 'Secure Backend',
      description: 'Enterprise-grade encrypted API endpoints built for speed, resilience, and reliability.',
      icon: Shield,
      badge: 'Infrastructure',
      color: 'from-indigo-500/20 to-cyan-500/20',
      iconColor: 'text-indigo-400',
    },
  ];

  const testimonials = [
    {
      quote: "CodeNudge changed my interview prep entirely. I went from forgetting DP patterns after a week to recognizing them instantly in FAANG interviews.",
      author: "Alex Chen",
      role: "Senior Software Engineer @ Meta",
      avatar: "AC",
      stars: 5,
    },
    {
      quote: "The Chrome extension auto-sync is magical. I don't have to manage Notion tables anymore. My revision queue is generated automatically.",
      author: "Sarah Jenkins",
      role: "Frontend Engineer @ Vercel",
      avatar: "SJ",
      stars: 5,
    },
    {
      quote: "Spaced repetition for LeetCode is a cheat code. CodeNudge's 2-queue engine ensured I retained graph algorithms for over 3 months.",
      author: "David Kumar",
      role: "Backend Developer @ Stripe",
      avatar: "DK",
      stars: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 2: HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-primary/25 via-secondary/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Vercel-style Announcement Pill */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-white/[0.1] text-xs font-medium text-white shadow-glow-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-muted">Introducing CodeNudge</span>
                <span className="w-1 h-1 rounded-full bg-muted/40" />
                <span className="text-white font-semibold">Spaced Repetition for LeetCode</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeInUp} className="heading-1 mb-6 max-w-4xl tracking-tight">
              Never Forget <br className="hidden sm:block" />
              <span className="text-gradient-brand">What You Solve.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-muted mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
              Automatically capture your accepted LeetCode submissions, organize them into a smart revision queue and receive daily coding revision reminders.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get Started
                </Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-3.5 text-base" leftIcon={<Globe className="w-5 h-5" />}>
                  View GitHub
                </Button>
              </a>
            </motion.div>

            {/* Pure CSS Modern Hero Illustration / Dashboard Preview */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 w-full max-w-4xl rounded-2xl bg-surface/90 border border-white/[0.12] shadow-2xl p-3 sm:p-4 backdrop-blur-xl relative group text-left"
            >
              {/* Window Bar Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] px-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-muted/60 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-primary" /> codenudge-engine --v2.4
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-emerald-400 font-medium">LeetCode Extension Synced</span>
                </div>
              </div>

              {/* Pure CSS Grid Illustration Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 bg-background/80 rounded-xl border border-white/[0.04]">
                {/* Visual Card 1 */}
                <div className="p-4 rounded-xl bg-surface/80 border border-white/[0.08] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Accepted Sync</span>
                    <Badge variant="success" size="sm">2m ago</Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">146. LRU Cache</h4>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden my-3">
                    <div className="bg-gradient-to-r from-primary to-secondary h-full w-[85%]" />
                  </div>
                  <span className="text-[11px] text-muted">Memory Retention: 85%</span>
                </div>

                {/* Visual Card 2 */}
                <div className="p-4 rounded-xl bg-surface/80 border border-white/[0.08] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-full blur-xl" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Due Revision</span>
                    <Badge variant="warning" size="sm">Queue #1</Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">200. Number of Islands</h4>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden my-3">
                    <div className="bg-secondary h-full w-[45%]" />
                  </div>
                  <span className="text-[11px] text-amber-400 font-medium">Review due in 4 hours</span>
                </div>

                {/* Visual Card 3 */}
                <div className="p-4 rounded-xl bg-surface/80 border border-white/[0.08] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full blur-xl" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">SM-2 Algorithm</span>
                    <Badge variant="primary" size="sm">Optimal Decay</Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Interval: Day 7 Review</h4>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden my-3">
                    <div className="bg-accent h-full w-[95%]" />
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">Spaced Repetition Active</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-surface/40 border-y border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge variant="primary" size="md" className="mb-4">
              Automated Flow
            </Badge>
            <h2 className="heading-2 mb-4">How It Works</h2>
            <p className="text-sm sm:text-base text-muted">
              Three simple steps to transform raw problem solving into long-term algorithmic memory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-surface border border-white/[0.08] shadow-surface relative flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-glow-sm group-hover:scale-110 transition-transform">
                <Code2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-2">Step 01</span>
              <h3 className="heading-3 mb-3">Solve on LeetCode</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Continue solving coding problems on LeetCode as you normally do. No manual logging required.
              </p>

              {/* Arrow Down Indicator for Mobile/Desktop */}
              <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 text-muted/40">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="flex md:hidden mt-6 text-muted/40">
                <ArrowDown className="w-6 h-6" />
              </div>
            </motion.div>

            {/* Step 2 Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-surface border border-white/[0.08] shadow-surface relative flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-6 shadow-glow-sm group-hover:scale-110 transition-transform">
                <Cpu className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest mb-2">Step 02</span>
              <h3 className="heading-3 mb-3">Chrome Extension syncs automatically</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Our Chrome Extension captures accepted submissions automatically in the background with zero lag.
              </p>

              <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 text-muted/40">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="flex md:hidden mt-6 text-muted/40">
                <ArrowDown className="w-6 h-6" />
              </div>
            </motion.div>

            {/* Step 3 Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-surface border border-white/[0.08] shadow-surface relative flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 shadow-glow-sm group-hover:scale-110 transition-transform">
                <RefreshCw className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest mb-2">Step 03</span>
              <h3 className="heading-3 mb-3">Receive Daily Revision</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Get smart spaced-repetition prompts via email and your dashboard queue right before memory decay sets in.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURES */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge variant="secondary" size="md" className="mb-4">
              Comprehensive Stack
            </Badge>
            <h2 className="heading-2 mb-4">Everything You Need to Master LeetCode</h2>
            <p className="text-sm sm:text-base text-muted">
              Built with an uncompromising standard of performance, security, and developer ergonomics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card variant="glass" hoverEffect className="h-full flex flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} border border-white/10 flex items-center justify-center ${feat.iconColor}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="outline" size="sm">
                          {feat.badge}
                        </Badge>
                      </div>
                      <h3 className="heading-3 mb-2">{feat.title}</h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      <section className="py-24 bg-surface/30 border-y border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge variant="primary" size="md" className="mb-4">
              Loved by Engineers
            </Badge>
            <h2 className="heading-2 mb-4">Trusted by Top Tech Developers</h2>
            <p className="text-sm sm:text-base text-muted">
              Here is how CodeNudge helps candidates land offers at top-tier tech companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card variant="glass" className="h-full flex flex-col justify-between p-6">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4 text-amber-400">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-muted italic leading-relaxed mb-6">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5 font-bold text-xs text-white flex items-center justify-center">
                      <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                        {t.avatar}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{t.author}</h4>
                      <p className="text-[11px] text-muted">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-surface via-surface-hover to-surface border border-primary/40 p-8 sm:p-16 text-center relative shadow-2xl overflow-hidden">
          {/* Ambient Glow Pill */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <Badge variant="primary" size="md" className="mb-4">
              Get Started Free
            </Badge>
            <h2 className="heading-1 mb-6 text-3xl sm:text-5xl">
              Start Revising Smarter
            </h2>
            <p className="text-sm sm:text-lg text-muted mb-8 leading-relaxed">
              Stop guessing which problems to revise. Join CodeNudge today and build long-term algorithmic recall for your next interview.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-10 py-4 text-base font-semibold" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
