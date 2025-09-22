// client/src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';
import ProjectForm from '../components/ProjectForm';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem('token');

  const fetchProjects = () => {
    api.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async id => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.delete(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProjects();
    } catch (e) { console.error(e); alert('Delete failed'); }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ProjectForm onCreated={fetchProjects} token={token} />
      <ul>
        {projects.map(p => (
          <li key={p._id}>
            <strong>{p.title}</strong>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
