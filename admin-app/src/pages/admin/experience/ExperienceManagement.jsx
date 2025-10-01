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
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{experience.position}</h3>
                  {experience.current && (
                    <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-gray-300">
                  <h1 className="text-lg font-semibold">{experience.company}</h1>
                  {experience.location && (
                    <>
                      <span className="hidden sm:inline text-gray-500">•</span>
                      <span className="text-gray-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {experience.location}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(experience.startDate).toLocaleDateString('en-US', { 
                    month: 'short',
                    year: 'numeric'
                  })} - {
                    experience.endDate 
                      ? new Date(experience.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })
                      : 'Present'
                  }
                </p>
                <p className="text-gray-300 mt-4 leading-relaxed">{experience.description}</p>
              </div>
              <div className="flex flex-row sm:flex-col gap-2 self-start">
                <button
                  className="px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center whitespace-nowrap"
                  onClick={() => navigate(`/admin/experience/edit/${experience._id}`)}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  className="px-3 py-1.5 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors flex items-center whitespace-nowrap"
                  onClick={() => handleDelete(experience._id)}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
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