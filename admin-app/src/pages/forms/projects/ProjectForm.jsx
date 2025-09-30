import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../utils/toast';
import { getFileUrl } from '../../../helpers/fileHelpers';
import api from '../../../utils/api';

export default function ProjectForm({ project, isEditing = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies?.join(', ') || '',
    image: project?.image || '',
    liveDemo: project?.liveDemo || '',
    sourceCode: project?.sourceCode || '',
    featured: project?.featured || false
  });

  const [previewImage, setPreviewImage] = useState(null);
  
  // Cleanup preview URL when component unmounts or when preview changes
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      // Append all form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('liveDemo', formData.liveDemo);
      formDataToSend.append('sourceCode', formData.sourceCode);
      formDataToSend.append('featured', formData.featured);
      
      // Handle technologies array
      const technologiesArray = formData.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(Boolean);
      formDataToSend.append('technologies', JSON.stringify(technologiesArray));

      // Handle image upload
      const imageInput = document.getElementById('image');
      if (imageInput.files[0]) {
        formDataToSend.append('image', imageInput.files[0]);
      } else if (formData.image && !previewImage) {
        // If we have an existing image URL and no new image selected
        formDataToSend.append('image', formData.image);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };


      if (isEditing) {
        await api.put(`/api/projects/${project._id}`, formDataToSend, config);
        showToast('success', 'Project Updated', 'Project updated successfully');
      } else {
        await api.post('/api/projects', formDataToSend, config);
        showToast('success', 'Project Created', 'Project created successfully');
      }

      navigate('/admin/projects');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save project');
      showToast('error', 'Error', err.response?.data?.msg || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isEditing ? 'Edit Project' : 'Create New Project'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
            <label htmlFor="image" className="block text-sm font-medium text-gray-200 mb-1">
              Porject Featured Image 
            </label>

            {/* Show either preview of new image or existing image */}
            {(previewImage || formData.image) && (
              <div className="mb-4">
                <img
                  src={previewImage || getFileUrl(formData.image)}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-700"
                />
                {formData.image && !previewImage && (
                  <p className="text-sm text-gray-400 mt-2">Current project image</p>
                )}
                {previewImage && (
                  <p className="text-sm text-gray-400 mt-2">New image selected</p>
                )}
              </div>
            )}

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreviewImage(URL.createObjectURL(file));
                  // Clean up previous preview URL
                  if (previewImage) {
                    URL.revokeObjectURL(previewImage);
                  }
                }
              }}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
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