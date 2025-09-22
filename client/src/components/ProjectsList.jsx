// client/src/components/ProjectsList.jsx
import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {projects.length === 0 ? <p>No projects yet</p> :
        <ul>
          {projects.map(p => (
            <li key={p._id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {p.link && <a href={p.link} target="_blank" rel="noreferrer">View</a>}
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
