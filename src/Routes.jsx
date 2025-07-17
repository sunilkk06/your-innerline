import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
// Add your imports here
import LandingPage from "./pages/landing-page";
import AuthenticationLoginRegister from "./pages/authentication-login-register";
import Dashboard from "./pages/dashboard";
import DailyJournalingInterface from "./pages/daily-journaling-interface";
import AccountSettingsPrivacy from "./pages/account-settings-privacy";
import MoodHistoryAnalytics from "./pages/mood-history-analytics";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/daily-journaling-interface" element={<DailyJournalingInterface />} />
        <Route path="/account-settings-privacy" element={<AccountSettingsPrivacy />} />
        <Route path="/mood-history-analytics" element={<MoodHistoryAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;