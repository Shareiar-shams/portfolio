import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectForm from '../../forms/projects/ProjectForm';
import api from '../../../utils/api';

export default function ProjectFormPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/api/projects/${id}`)
        .then(res => {
          setProject(res.data);
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
    <ProjectForm
      project={project}
      isEditing={!!id}
    />
  );
}