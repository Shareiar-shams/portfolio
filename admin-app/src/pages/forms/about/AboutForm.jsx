import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../utils/toast';
import { getFileUrl } from '../../../helpers/fileHelpers';
import api from '../../../utils/api';
import ProfileImageInput from '../../../components/about/ProfileImageInput';
import SocialLinksSection from '../../../components/about/SocialLinksSection';
import RichTextEditor from '../../../components/about/RichTextEditor';

// Initial state helper
const initialFormState = (about) => ({
  name: about?.name || '',
  title: about?.title || '',
  description: about?.description || '',
  profileImage: about?.profileImage || '',
  contactEmail: about?.contactEmail || '',
  socialLinks: {
    github: about?.socialLinks?.github || '',
    linkedin: about?.socialLinks?.linkedin || '',
    twitter: about?.socialLinks?.twitter || ''
  },
  resumeLink: about?.resumeLink || ''
});

export default function AboutForm({ about, isEditing = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialFormState(about));
  const [selectedFiles, setSelectedFiles] = useState({
    profileImage: null,
    resume: null
  });
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'socialLinks') {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (key !== 'profileImage' && key !== 'resumeLink') {
          formDataToSend.append(key, value);
        }
      });

      // Append files
      if (selectedFiles.profileImage) {
        formDataToSend.append('profileImage', selectedFiles.profileImage);
      } else if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      if (selectedFiles.resume) {
        formDataToSend.append('resume', selectedFiles.resume);
      } else if (formData.resumeLink) {
        formDataToSend.append('resumeLink', formData.resumeLink);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      await (isEditing 
        ? api.put('/api/about', formDataToSend, config)
        : api.post('/api/about', formDataToSend, config));

      showToast('success', 
        isEditing ? 'About Updated' : 'About Created', 
        `About information ${isEditing ? 'updated' : 'added'} successfully`
      );
      
      navigate('/admin/about');
    } catch (err) {
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.msg || err.message || 'Failed to save about information');
      showToast('error', 'Error', err.response?.data?.msg || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isEditing ? 'Edit About Information' : 'Create About Information'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">
              Professional Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
              Description
            </label>
            {/* Rich Text Editor */}
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
            />
          </div>


          {/* Show either preview of new image or existing image */}
          {/* Profile Image */}
          <ProfileImageInput
            currentImage={formData.profileImage}
            onChange={(file) => setSelectedFiles({ ...selectedFiles, profileImage: file })}
          />

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-200 mb-1">
              Contact Email
            </label>
            <input
              id="contactEmail"
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Social Links */}
          <SocialLinksSection
            socialLinks={formData.socialLinks}
            onChange={(newLinks) => setFormData({ ...formData, socialLinks: newLinks })}
          />

          <div>
            <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-200 mb-1">
              Resume
            </label>
            {/* Show existing resume if available */}
            {formData.resumeLink && !selectedFileName && (
              <div className="mb-4">
                <a
                  href={getFileUrl(formData.resumeLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2"
                >
                  Current Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
            
            {/* Show newly selected file name if any */}
            {selectedFileName && (
              <div className="mb-4">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  New file selected: {selectedFileName}
                </p>
              </div>
            )}
            
            <input
              id="resumeLink"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedFileName(file.name);
                }
              }}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/about')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg shadow-sm 
                      hover:bg-gray-300 hover:shadow-md active:bg-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`
              px-4 py-2 text-sm font-medium text-white rounded-lg
              transition-all duration-200 ease-in-out
              ${
                loading
                  ? 'bg-blue-600/50 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/25'
              }
            `}
          >
            {loading ? 'Saving...' : 'Save About Information'}
          </button>
        </div>

      </form>
    </div>
  );
}