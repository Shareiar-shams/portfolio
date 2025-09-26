import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import api from '../../../utils/api';

export default function ExperienceManagement() {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/experience')
      .then(res => {
        setExperiences(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (experienceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the experience!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if(result.isConfirmed){
        try {
          await api.delete(`/api/experience/${experienceId}`);
          setExperiences(experiences.filter(exp => exp._id !== experienceId));

          Swal.fire({
            title: "Deleted!",
            text: "Project has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
        } catch (err) {
          setError(err.message?.data?.message || 'Failed to delete experience');
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Experience Management</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/admin/experience/new')}
        >
          Add New Experience
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map(experience => (
          <div
            key={experience._id}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">{experience.title}</h3>
                <p className="text-gray-300 mt-1">{experience.company}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(experience.startDate).toLocaleDateString()} - 
                  {experience.endDate 
                    ? new Date(experience.endDate).toLocaleDateString()
                    : 'Present'
                  }
                </p>
                <p className="text-gray-300 mt-4">{experience.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30 transition-colors"
                  onClick={() => {/* Edit experience logic */}}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 transition-colors"
                  onClick={() => handleDelete(experience._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400">Technologies & Skills</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {experience.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-gray-800 text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}