import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AuthForm = ({ mode, onModeChange }) => {
  const navigate = useNavigate();
  const { signIn, signUp, authError, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    rememberMe: false
  });
  const [localErrors, setLocalErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (localErrors[name]) {
      setLocalErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (authError) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Registration specific validation
    if (mode === 'register') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    clearError();

    try {
      let result;
      
      if (mode === 'login') {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password, {
          fullName: formData.fullName
        });
      }

      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      // Error handling is managed by AuthContext
      console.log('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setLocalErrors({ email: 'Please enter your email address first' });
      return;
    }

    try {
      const { resetPassword } = useAuth();
      const result = await resetPassword(formData.email);
      
      if (result.success) {
        alert('Password reset email sent! Check your inbox for instructions.');
      }
    } catch (error) {
      console.log('Password reset error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Display auth error from context */}
      {authError && (
        <div className="bg-error/10 border border-error/20 rounded-organic p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={18} className="text-error" />
            <p className="text-sm text-error">{authError}</p>
          </div>
        </div>
      )}

      {/* Full Name Field (Registration only) */}
      {mode === 'register' && (
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          error={localErrors.fullName}
          required
          className="w-full"
        />
      )}

      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={localErrors.email}
        required
        className="w-full"
      />

      {/* Password Field */}
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder={mode === 'register' ? 'Create a password (min 6 characters)' : 'Enter your password'}
        value={formData.password}
        onChange={handleInputChange}
        error={localErrors.password}
        required
        className="w-full"
      />

      {/* Confirm Password Field (Registration only) */}
      {mode === 'register' && (
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={localErrors.confirmPassword}
          required
          className="w-full"
        />
      )}

      {/* Remember Me (Login only) */}
      {mode === 'login' && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-muted-foreground">
            Remember me for 30 days
          </label>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        iconName={mode === 'login' ? 'LogIn' : 'UserPlus'}
        iconPosition="left"
        className="py-3"
      >
        {mode === 'login' ? 'Sign In to Your Space' : 'Create Your Account'}
      </Button>

      {/* Forgot Password (Login only) */}
      {mode === 'login' && (
        <div className="text-center">
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-therapeutic"
            onClick={handleForgotPassword}
          >
            Forgot your password?
          </button>
        </div>
      )}

      {/* Mode Toggle */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={onModeChange}
            className="ml-1 text-primary hover:text-primary/80 font-medium transition-therapeutic"
          >
            {mode === 'login' ? 'Create one here' : 'Sign in instead'}
          </button>
        </p>
      </div>

      {/* Development Mode Preview */}
      {mode === 'login' && (
        <div className="bg-primary/5 border border-primary/10 rounded-organic p-4 mt-6">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Preview Mode</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Test credentials for development:
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <div><strong>Email:</strong> admin@innerline.com</div>
            <div><strong>Password:</strong> wellness123</div>
          </div>
        </div>
      )}
    </form>
  );
};

export default AuthForm;