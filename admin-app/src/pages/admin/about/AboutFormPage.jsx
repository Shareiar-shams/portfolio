import { useState, useEffect } from 'react';
import AboutForm from '../../../pages/forms/about/AboutForm';
import api from '../../../utils/api';

export default function AboutFormPage() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/about')
      .then(res => {
        setAbout(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setLoading(false);
        } else {
          setError(err.message);
          setLoading(false);
        }
      });
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <AboutForm
      about={about}
      isEditing={!!about}
    />
  );
}