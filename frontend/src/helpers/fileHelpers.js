export const getFileUrl = (path) => {
  if (!path) return null;
  // If it's already a full URL (e.g., from cloudinary), return as is
  if (path.startsWith('http')) return path;
  // Otherwise, prepend the backend URL
  return `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${path}`;
};

export default getFileUrl;