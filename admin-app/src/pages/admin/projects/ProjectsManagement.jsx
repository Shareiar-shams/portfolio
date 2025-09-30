import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
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
    Swal.fire({
      title: "Are you sure you want to delete "+projectTitle+"?",
      text: "This action will permanently delete the project!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/projects/${projectId}`);
          setProjects(projects.filter(project => project._id !== projectId));
          setError(null); // Clear any existing errors

          Swal.fire({
            title: "Deleted!",
            text: "Project has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to delete project');
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error"
          });
        }
      }
    });
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Projects Management</h1>
          <p className="text-gray-400 text-sm">Manage your portfolio projects</p>
        </div>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          onClick={() => navigate('/admin/projects/new')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
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
            className="group bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:bg-white/[0.15] transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative w-full h-48 overflow-hidden bg-gray-900">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-project.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              
              {/* Action Buttons Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => navigate(`/admin/projects/edit/${project._id}`)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  onClick={() => handleDelete(project._id, project.title)}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white mb-2 truncate">{project.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-2 mb-4">{project.description}</p>
              
              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-800/80 text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  )) || (
                    <span className="text-gray-400 text-sm italic">No technologies specified</span>
                  )}
                </div>
              </div>

              {/* Links if available */}
              {(project.liveDemo || project.sourceCode) && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-700">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.sourceCode && (
                    <a
                      href={project.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      SourceCode →
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}