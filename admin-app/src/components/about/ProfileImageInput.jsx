import { useState, useEffect } from 'react';
import { getFileUrl } from '../../helpers/fileHelpers';

export default function ProfileImageInput({ currentImage, onChange }) {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(newPreviewUrl);
      onChange(file);
    }
  };

  return (
    <div>
      <label htmlFor="profileImage" className="block text-sm font-medium text-gray-200 mb-1">
        Profile Image
      </label>

      {(previewImage || currentImage) && (
        <div className="mb-4">
          <img
            src={previewImage || getFileUrl(currentImage)}
            alt="Profile Preview"
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-700"
          />
          <p className="text-sm text-gray-400 mt-2">
            {previewImage ? 'New image selected' : 'Current profile image'}
          </p>
        </div>
      )}

      <input
        id="profileImage"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
      />
    </div>
  );
}