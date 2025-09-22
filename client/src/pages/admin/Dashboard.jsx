import { useState, useEffect } from 'react';
import ProjectsList from '../../components/ProjectsList';
import SkillForm from '../../components/admin/SkillForm';
import api from '../../utils/api';

export default function Dashboard() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get('/api/skills')
      .then(res => setSkills(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <section>
        <h2>Projects</h2>
        <ProjectsList isAdmin={true} />
      </section>

      <section>
        <h2>Skills</h2>
        <SkillForm onSave={(skill) => setSkills([...skills, skill])} />
        <ul>
          {skills.map(skill => (
            <li key={skill._id}>
              {skill.name} - Level: {skill.level}
              <button onClick={async () => {
                await api.delete(`/api/skills/${skill._id}`);
                setSkills(skills.filter(s => s._id !== skill._id));
              }}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}