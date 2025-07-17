import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-primary mb-6">
        <Icon name="Search" size={48} />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-muted text-foreground rounded-organic hover:bg-muted/80 transition-therapeutic flex items-center"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Go Back
        </button>
        <Link
          to="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-organic hover:bg-primary/90 transition-therapeutic"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;