import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProjectsManagement from './pages/admin/projects/ProjectsManagement';
import SkillsManagement from './pages/admin/skills/SkillsManagement';
import ExperienceManagement from './pages/admin/experience/ExperienceManagement';
import ProjectFormPage from "./pages/admin/projects/ProjectFormPage"; // new
import SkillFormPage from "./pages/admin/skills/SkillFormPage"; // new
import ExperienceFormPage from "./pages/admin/experience/ExperienceFormPage"; // new
import AboutFormPage from "./pages/admin/about/AboutFormPage"; // update about

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          {/* Nested routes */}
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsManagement />} />
          <Route path="projects/new" element={<ProjectFormPage />} />
          <Route path="projects/edit/:id" element={<ProjectFormPage />} />
          <Route path="skills" element={<SkillsManagement />} />
          <Route path="skills/new" element={<SkillFormPage />} />
          <Route path="skills/edit/:id" element={<SkillFormPage />} />
          <Route path="experience" element={<ExperienceManagement />} />
          <Route path="experience/new" element={<ExperienceFormPage />} />
          <Route path="experience/edit/:id" element={<ExperienceFormPage />} />
          <Route path="about" element={<AboutFormPage />} />
        </Route>

        {/* Redirect root to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
