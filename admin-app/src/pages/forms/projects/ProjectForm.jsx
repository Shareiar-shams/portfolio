import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

export default function ProjectForm({ project, isEditing = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies?.join(', ') || '',
    imageUrl: project?.imageUrl || '',
    liveDemo: project?.liveDemo || '',
    sourceCode: project?.sourceCode || '',
    featured: project?.featured || false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {

      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
      };
      

      if (isEditing) {
        await api.put(`/api/projects/${project._id}`, payload, config);
      } else {
        await api.post('/api/projects', payload, config);
      }

      navigate('/admin/projects');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isEditing ? 'Edit Project' : 'Create New Project'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">
              Project Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
              Description
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter project description"
            />
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-200 mb-1">
              Technologies (comma-separated)
            </label>
            <input
              id="technologies"
              type="text"
              required
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200 mb-1">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="liveDemo" className="block text-sm font-medium text-gray-200 mb-1">
              Live Demo URL
            </label>
            <input
              id="liveDemo"
              type="url"
              value={formData.liveDemo}
              onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label htmlFor="sourceCode" className="block text-sm font-medium text-gray-200 mb-1">
              Source Code URL
            </label>
            <input
              id="sourceCode"
              type="url"
              value={formData.sourceCode}
              onChange={(e) => setFormData({ ...formData, sourceCode: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div className="flex items-center">
            <input
              id="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4 rounded border-gray-700 bg-gray-800/50 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-200">
              Featured Project
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`
              px-4 py-2 text-sm font-medium text-white rounded-lg
              transition-all duration-200 ease-in-out
              ${loading
                ? 'bg-blue-600/50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/25'
              }
            `}
          >
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
}