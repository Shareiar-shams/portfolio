// client/src/components/ProjectForm.jsx
import { useState } from 'react';
import api from '../utils/api';

export default function ProjectForm({ onCreated, token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/api/projects', { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle(''); setDescription('');
      onCreated && onCreated();
    } catch (err) {
      alert('Failed to create');
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Add Project</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Create</button>
    </form>
  );
}
