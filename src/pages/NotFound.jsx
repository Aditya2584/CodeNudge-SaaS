import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-glow">
          <Code2 className="w-8 h-8" />
        </div>

        <span className="text-7xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-2">
          404
        </span>

        <h1 className="heading-2 mb-3">Page Not Found</h1>

        <p className="text-sm text-muted max-w-sm mb-8 leading-relaxed">
          The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        <Link to="/">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
