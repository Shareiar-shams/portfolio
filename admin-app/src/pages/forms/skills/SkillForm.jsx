import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

export default function SkillForm({ skill, isEditing = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    level: skill?.level || 0,
    category: skill?.category || '',
    icon: skill?.icon || ''
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
        },
      };
      
      if (isEditing) {
        await api.put(`/api/skills/${skill._id}`, formData, config);
      } else {
        await api.post('/api/skills', formData, config);
      }

      navigate('/admin/skills');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isEditing ? 'Edit Skill' : 'Add New Skill'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
              Skill Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter skill name"
            />
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-200 mb-1">
              Proficiency Level (0-100)
            </label>
            <input
              id="level"
              type="number"
              required
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-200 mb-1">
              Category
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-200 mb-1">
              Icon URL
            </label>
            <input
              id="icon"
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter icon URL or class name"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/skills')}
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
            {loading ? 'Saving...' : 'Save Skill'}
          </button>
        </div>
      </form>
    </div>
  );
}