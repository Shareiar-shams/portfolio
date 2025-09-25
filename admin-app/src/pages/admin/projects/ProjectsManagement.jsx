import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

export default function ProjectsManagement() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/projects');
        setProjects(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId, projectTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      return;
    }

    try {
      await api.delete(`/api/projects/${projectId}`);
      setProjects(projects.filter(project => project._id !== projectId));
      setError(null); // Clear any existing errors
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project');
      console.error('Error deleting project:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-white flex items-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading projects...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Projects Management</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/admin/projects/new')}
        >
          Add New Project
        </button>
      </div>

      <div className="grid gap-6">
        {projects.length === 0 ? (
          <div className="text-center py-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
            <p className="text-gray-300">No projects found.</p>
            <button
              onClick={() => navigate('/admin/projects/new')}
              className="mt-4 px-4 py-2 text-sm bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
            >
              Create your first project
            </button>
          </div>
        ) : projects.map(project => (
          <div
            key={project._id}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-gray-300 mt-2">{project.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30 transition-colors"
                  onClick={() => navigate(`/admin/projects/edit/${project._id}`)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 transition-colors"
                  onClick={() => handleDelete(project._id, project.title)}
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400">Technologies</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-gray-800 text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                )) || (
                  <span className="text-gray-400 text-sm italic">No technologies specified</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}