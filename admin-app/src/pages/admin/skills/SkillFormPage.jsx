import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SkillForm from '../../forms/skills/SkillForm';
import api from '../../../utils/api';

export default function SkillFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/api/skills/${id}`)
        .then(res => {
          setSkill(res.data);
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
    <SkillForm
      skill={skill}
      isEditing={!!id}
    />
  );
}