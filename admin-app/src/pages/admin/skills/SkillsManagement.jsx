import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

export default function SkillsManagement() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/skills')
      .then(res => {
        setSkills(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (skillId) => {
    try {
      await api.delete(`/api/skills/${skillId}`);
      setSkills(skills.filter(skill => skill._id !== skillId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Skills Management</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/admin/skills/new')}
        >
          Add New Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(skill => (
          <div
            key={skill._id}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-400">{skill.level}%</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30 transition-colors"
                  onClick={() => {/* Edit skill logic */}}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 transition-colors"
                  onClick={() => handleDelete(skill._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400">Category</h4>
              <span className="mt-1 inline-block px-2 py-1 text-sm bg-gray-800 text-gray-300 rounded">
                {skill.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}