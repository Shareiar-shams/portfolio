import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Code2, GraduationCap, Users } from 'lucide-react';
import api from '../../utils/api';

const StatCard = ({ title, value, icon: Icon, to, className }) => (
  <Link 
    to={to}
    className={`p-6 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-200 ${className}`}
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-lg bg-white/10">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-200">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </Link>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    visitors: 0
  });

  useEffect(() => {
    // Fetch dashboard stats
    Promise.all([
      api.get('/api/projects'),
      api.get('/api/skills'),
      api.get('/api/experience')
    ]).then(([projects, skills, experience]) => {
      setStats({
        projects: projects.data.length,
        skills: skills.data.length,
        experience: experience.data.length,
        visitors: Math.floor(Math.random() * 1000) // Mock data for demonstration
      });
    }).catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
        <p className="text-gray-300">Here's what's happening with your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.projects}
          icon={Briefcase}
          to="/admin/projects"
          className="border border-blue-500/20"
        />
        <StatCard
          title="Skills"
          value={stats.skills}
          icon={Code2}
          to="/admin/skills"
          className="border border-green-500/20"
        />
        <StatCard
          title="Experience"
          value={stats.experience}
          icon={GraduationCap}
          to="/admin/experience"
          className="border border-purple-500/20"
        />
        <StatCard
          title="Portfolio Visitors"
          value={stats.visitors}
          icon={Users}
          to="#"
          className="border border-yellow-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Mock activity items */}
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <p>New project "Portfolio Website" added</p>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <p>Updated skills section</p>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <p>Added new work experience</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/projects/new"
              className="p-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-white text-center transition-colors"
            >
              Add New Project
            </Link>
            <Link
              to="/admin/skills/new"
              className="p-4 bg-green-600/20 hover:bg-green-600/30 rounded-lg text-white text-center transition-colors"
            >
              Add New Skill
            </Link>
            <Link
              to="/admin/experience/new"
              className="p-4 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg text-white text-center transition-colors"
            >
              Add Experience
            </Link>
            <Link
              to="/admin/about"
              className="p-4 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg text-white text-center transition-colors"
            >
              Update About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}