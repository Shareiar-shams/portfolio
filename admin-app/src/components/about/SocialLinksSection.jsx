export default function SocialLinksSection({ socialLinks, onChange }) {
  const handleSocialLinkChange = (platform, value) => {
    onChange({ ...socialLinks, [platform]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Social Links</h3>
      
      {Object.entries({
        github: 'GitHub',
        linkedin: 'LinkedIn',
        twitter: 'Twitter'
      }).map(([key, label]) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-gray-200 mb-1">
            {label}
          </label>
          <input
            id={key}
            type="url"
            value={socialLinks[key]}
            onChange={(e) => handleSocialLinkChange(key, e.target.value)}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`https://${key}.com/username`}
          />
        </div>
      ))}
    </div>
  );
}