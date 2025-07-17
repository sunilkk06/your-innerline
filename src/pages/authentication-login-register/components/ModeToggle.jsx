import React from 'react';

const ModeToggle = ({ mode, onModeChange }) => {
  return (
    <div className="flex bg-muted rounded-organic p-1 mb-6">
      <button
        type="button"
        onClick={() => onModeChange('login')}
        className={`flex-1 py-2 px-4 text-sm font-medium rounded-organic transition-therapeutic ${
          mode === 'login' ?'bg-background text-foreground shadow-therapeutic-sm' :'text-muted-foreground hover:text-foreground'
        }`}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onModeChange('register')}
        className={`flex-1 py-2 px-4 text-sm font-medium rounded-organic transition-therapeutic ${
          mode === 'register' ?'bg-background text-foreground shadow-therapeutic-sm' :'text-muted-foreground hover:text-foreground'
        }`}
      >
        Create Account
      </button>
    </div>
  );
};

export default ModeToggle;