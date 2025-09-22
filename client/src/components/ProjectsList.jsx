// client/src/components/ProjectsList.jsx
import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ProjectsList({ isAdmin }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {projects.length === 0 ? <p>No projects yet</p> :
        <ul>
          {projects.map(p => (
            <li key={p._id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {p.link && <a href={p.link} target="_blank" rel="noreferrer">View</a>}
              {isAdmin && (
                <div>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                  <button onClick={() => window.location.href = `/admin/projects/edit/${p._id}`}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      }
      {isAdmin && (
        <button onClick={() => window.location.href = '/admin/projects/new'}>
          Add New Project
        </button>
      )}
    </div>
  );
}
