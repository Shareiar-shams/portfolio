import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import api from '../../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add all icons to the library
library.add(fab, fas);

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
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the skill!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/skills/${skillId}`);
          setSkills(skills.filter(skill => skill._id !== skillId));

          Swal.fire({
            title: "Deleted!",
            text: "Skill has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error"
          });
        }
      }
    });
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold text-white">Skills Management</h1>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/admin/skills/new')}
        >
          Add New Skill
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {skills.map(skill => (
          <div
            key={skill._id}
            className="bg-white/25 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
              <div className="flex items-center gap-3">
                {skill.icon && (
                  <div className="text-2xl text-white">
                    <FontAwesomeIcon icon={skill.icon.includes('fa-') ? skill.icon : ['fab', skill.icon]} />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto justify-end">
                <button
                  className="flex-1 sm:flex-none px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30 transition-colors"
                  onClick={() => navigate(`/admin/skills/edit/${skill._id}`)}
                >
                  Edit
                </button>
                <button
                  className="flex-1 sm:flex-none px-3 py-1.5 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 transition-colors"
                  onClick={() => handleDelete(skill._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4 sm:mt-6">
              <div className="flex items-center">
                <div className="flex-1 h-2.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-400">{skill.level}%</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400">Category</h4>
              <span className="mt-2 inline-block px-3 py-1.5 text-sm bg-gray-800/50 text-gray-300 rounded-lg backdrop-blur-sm">
                {skill.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}