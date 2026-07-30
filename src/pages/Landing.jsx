import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { ArrowRight, Code2, BrainCircuit, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-1 mb-6">
              Never Forget <br className="hidden md:block" /> What You Solve.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
              CodeNudge is your smart revision assistant for LeetCode. We track your problem-solving patterns and intelligently schedule revisions so you retain more and stress less.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/signup">
                <Button className="px-8 py-4 text-lg rounded-full flex items-center gap-2">
                  Get Started for Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background-light/50 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Why CodeNudge?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We replace manual spreadsheets with an automated, spaced-repetition workflow designed specifically for coding interviews.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="glass-card flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
                <Code2 className="w-7 h-7" />
              </div>
              <h3 className="heading-3 mb-3">Chrome Extension</h3>
              <p className="text-gray-400">
                Sync your solved LeetCode problems instantly with a single click while you code.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="glass-card flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 text-secondary">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="heading-3 mb-3">Smart Revision Queue</h3>
              <p className="text-gray-400">
                Our algorithm schedules problems based on difficulty and your past performance.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="glass-card flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 text-accent">
                <LineChart className="w-7 h-7" />
              </div>
              <h3 className="heading-3 mb-3">Detailed Analytics</h3>
              <p className="text-gray-400">
                Visualize your progress, identify weak topics, and track your revision consistency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
