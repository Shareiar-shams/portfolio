import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import api from '../utils/api';
import { Activity, Briefcase, Code2, User } from 'lucide-react';

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, className }) => (
  <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${className}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-400">{label}</p>
        <h3 className="text-2xl font-semibold text-white mt-1">{value}</h3>
      </div>
    </div>
  </div>
);

// Dashboard Overview Component
const DashboardOverview = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills] = await Promise.all([
          api.get('/api/projects'),
          api.get('/api/skills')
        ]);
        setStats({
          projects: projects.data.length,
          skills: skills.data.length,
          experience: 0 // Add experience endpoint later
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="mt-2 text-gray-400">Welcome back to your portfolio dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          icon={Briefcase}
          label="Total Projects"
          value={stats.projects}
          className="bg-blue-600"
        />
        <StatsCard
          icon={Code2}
          label="Skills"
          value={stats.skills}
          className="bg-purple-600"
        />
        <StatsCard
          icon={Activity}
          label="Experience"
          value={stats.experience}
          className="bg-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {/* Add activity feed here */}
            <p className="text-gray-400">No recent activities</p>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-600 bg-opacity-50 hover:bg-opacity-75 rounded-lg text-white text-left transition-colors">
              <Briefcase className="h-6 w-6 mb-2" />
              <span className="block font-medium">Add Project</span>
            </button>
            <button className="p-4 bg-purple-600 bg-opacity-50 hover:bg-opacity-75 rounded-lg text-white text-left transition-colors">
              <Code2 className="h-6 w-6 mb-2" />
              <span className="block font-medium">Add Skill</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<ProjectsManagement />} />
        {/* Add other admin routes here */}
      </Routes>
    </AdminLayout>
  );
}
