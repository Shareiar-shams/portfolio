import { useState } from 'react';
import api from '../../utils/api';

export default function SkillForm({ skill, onSave }) {
  const [formData, setFormData] = useState(skill || {
    name: '',
    level: 0,
    icon: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = skill?._id 
        ? await api.put(`/api/skills/${skill._id}`, formData)
        : await api.post('/api/skills', formData);
      onSave(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Skill name"
        value={formData.name}
        onChange={e => setFormData({...formData, name: e.target.value})}
      />
      <input
        type="number"
        placeholder="Skill level"
        value={formData.level}
        onChange={e => setFormData({...formData, level: parseInt(e.target.value)})}
      />
      <input
        type="text"
        placeholder="Icon"
        value={formData.icon}
        onChange={e => setFormData({...formData, icon: e.target.value})}
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={e => setFormData({...formData, category: e.target.value})}
      />
      <button type="submit">{skill ? 'Update' : 'Create'}</button>
    </form>
  );
}