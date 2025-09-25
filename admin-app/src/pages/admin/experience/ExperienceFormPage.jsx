import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExperienceForm from '../../forms/experience/ExperienceForm';
import api from '../../../utils/api';

export default function ExperienceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/api/experience/${id}`)
        .then(res => {
          setExperience(res.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <ExperienceForm
      experience={experience}
      isEditing={!!id}
    />
  );
}