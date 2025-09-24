import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import SkillsManagement from './pages/admin/SkillsManagement';
import ExperienceManagement from './pages/admin/ExperienceManagement';

// Components
import PrivateRoute from './components/PrivateRoute';
import { Navigate } from 'react-router-dom';

// Check if user is authenticated
const isAuthenticated = () => !!localStorage.getItem('token');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root to admin login if not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="projects" element={<ProjectsManagement />} />
                <Route path="skills" element={<SkillsManagement />} />
                <Route path="experience" element={<ExperienceManagement />} />
              </Routes>
            </PrivateRoute>
          }
        />

        {/* Catch all route - redirect to admin login */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
