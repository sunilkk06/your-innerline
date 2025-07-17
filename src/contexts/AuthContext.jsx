import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../utils/authService';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for existing session with Supabase
        const { success, data } = await authService.getSession();
        
        if (success && data.session) {
          setUser(data.session.user);
          
          // Get user profile
          const profileResult = await authService.getUserProfile(data.session.user.id);
          if (profileResult.success) {
            setUserProfile(profileResult.data);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };
    
    // Set up auth state change listener
    const { data: authListener } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        
        // Get user profile
        const profileResult = await authService.getUserProfile(session.user.id);
        if (profileResult.success) {
          setUserProfile(profileResult.data);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserProfile(null);
      }
    });
    
    checkAuth();
    
    // Clean up auth listener on unmount
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const result = await authService.signIn(email, password);
      
      if (result.success) {
        setUser(result.data.user);
        
        // Get user profile
        const profileResult = await authService.getUserProfile(result.data.user.id);
        if (profileResult.success) {
          setUserProfile(profileResult.data);
        }
        
        return { user: result.data.user, error: null };
      } else {
        return { user: null, error: result.error };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: error.message || 'Failed to sign in' };
    }
  };

  // Sign up function
  const signUp = async (email, password, fullName) => {
    try {
      const result = await authService.signUp(email, password, { fullName });
      
      if (result.success) {
        // For email confirmation flows, the user might not be immediately signed in
        if (result.data.user) {
          setUser(result.data.user);
          
          // Create or get user profile
          const profileResult = await authService.getUserProfile(result.data.user.id);
          if (profileResult.success) {
            setUserProfile(profileResult.data);
          }
        }
        
        return { user: result.data.user, error: null };
      } else {
        return { user: null, error: result.error };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: error.message || 'Failed to sign up' };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const result = await authService.signOut();
      
      if (result.success) {
        setUser(null);
        setUserProfile(null);
        
        // Redirect to landing page
        navigate('/');
        
        return { error: null };
      } else {
        return { error: result.error };
      }
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error.message || 'Failed to sign out' };
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    if (!user) return { profile: null, error: 'No user logged in' };
    
    try {
      const result = await authService.updateUserProfile(user.id, updates);
      
      if (result.success) {
        setUserProfile(result.data);
        return { profile: result.data, error: null };
      } else {
        return { profile: null, error: result.error };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { profile: null, error: error.message || 'Failed to update profile' };
    }
  };

  // Context value
  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;