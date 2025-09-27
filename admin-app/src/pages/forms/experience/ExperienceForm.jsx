import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

export default function ExperienceForm({ experience, isEditing = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    position: experience?.position || '',
    company: experience?.company || '',
    location: experience?.location || '',
    startDate: experience?.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
    endDate: experience?.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
    current: experience?.current || false,
    description: experience?.description || '',
    technologies: experience?.technologies?.join(', ') || ''
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
          Authorization: `Bearer ${token}`
        },
      };

      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
        endDate: formData.current ? null : formData.endDate
      };

      if (isEditing) {
        await api.put(`/api/experience/${experience._id}`, payload, config);
      } else {
        await api.post('/api/experience', payload, config);
      }

      navigate('/admin/experience');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isEditing ? 'Edit Experience' : 'Add New Experience'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-200 mb-1">
              Job Title
            </label>
            <input
              id="position"
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job title"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-1">
              Company
            </label>
            <input
              id="company"
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-1">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="City, Country"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-200 mb-1">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-200 mb-1">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                required={!formData.current}
                disabled={formData.current}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="current"
              type="checkbox"
              checked={formData.current}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  current: e.target.checked,
                  endDate: e.target.checked ? '' : formData.endDate
                });
              }}
              className="h-4 w-4 rounded border-gray-700 bg-gray-800/50 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="current" className="ml-2 text-sm text-gray-200">
              I currently work here
            </label>
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
              placeholder="Describe your responsibilities and achievements"
            />
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-200 mb-1">
              Technologies Used (comma-separated)
            </label>
            <input
              id="technologies"
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="React, Node.js, AWS"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/experience')}
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
            {loading ? 'Saving...' : 'Save Experience'}
          </button>
        </div>
      </form>
    </div>
  );
}