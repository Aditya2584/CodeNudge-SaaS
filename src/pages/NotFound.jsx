import React from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { Button } from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8">
        <Code2 className="w-10 h-10" />
      </div>
      <h1 className="text-8xl font-bold tracking-tight text-white mb-4">404</h1>
      <h2 className="heading-2 mb-6">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="px-8 py-3">Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
