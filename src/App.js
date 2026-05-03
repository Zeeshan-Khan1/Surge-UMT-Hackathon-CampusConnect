import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TalentFinderDashboard from './pages/TalentFinderDashboard';
import TalentSeekerDashboard from './pages/TalentSeekerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './DashboardStyles.css';

function AppRoutes() {
  const { currentUser, userRole } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to={`/${userRole === 'finder' ? 'finder' : 'seeker'}/dashboard`} /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={currentUser ? <Navigate to={`/${userRole === 'finder' ? 'finder' : 'seeker'}/dashboard`} /> : <Signup />} 
      />
      <Route
        path="/finder/dashboard"
        element={
          <ProtectedRoute requiredRole="finder">
            <TalentFinderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/dashboard"
        element={
          <ProtectedRoute requiredRole="seeker">
            <TalentSeekerDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

