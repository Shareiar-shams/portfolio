# 🌐 Modern Portfolio Frontend

A dynamic and interactive portfolio website built with React, featuring real-time data integration with a backend API. This modern portfolio showcases projects, skills, experience, and personal information through a beautiful and responsive interface.

## 🚀 Features

- **Dynamic Content Loading**
  - Real-time data fetching from backend API
  - Automatic content updates
  - Loading states and error handling

- **Interactive UI Components**
  - Animated hero section
  - Background particles effect
  - Interactive mouse follower
  - Responsive navigation

- **Project Showcase**
  - Dynamic project grid
  - Detailed project views
  - Image galleries
  - Technology tags

- **Professional Sections**
  - About me with downloadable resume
  - Skills showcase
  - Work experience timeline
  - Contact information

- **Performance Optimized**
  - Lazy loading images
  - Optimized asset delivery
  - Smooth animations
  - Mobile-first responsive design

## 🛠️ Tech Stack

- **Core**
  - React.js (v19)
  - React Router DOM (v7)
  - Axios for API integration

- **Styling**
  - TailwindCSS
  - Custom fonts (Ruigslay)
  - FontAwesome icons
  - Lucide React icons

- **Development Tools**
  - Create React App
  - ESLint
  - PropTypes for type checking
  - DayJS for date formatting

## 📦 Installation & Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/Shareiar-shams/portfolio.git
   cd portfolio/frontend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the frontend root:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   Access the app at [http://localhost:3000](http://localhost:3000)

## 🔌 API Integration

The frontend communicates with the backend through several API endpoints:

### Projects
```javascript
// In utils/api.js
export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};
```

### Skills
```javascript
// In utils/api.js
export const getSkills = async () => {
  const response = await axios.get(`${API_URL}/skills`);
  return response.data;
};
```

### Experience
```javascript
// In utils/api.js
export const getExperience = async () => {
  const response = await axios.get(`${API_URL}/experience`);
  return response.data;
};
```

### About
```javascript
// In utils/api.js
export const getAbout = async () => {
  const response = await axios.get(`${API_URL}/about`);
  return response.data;
};
```

## � Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── About.jsx           # About section component
│   │   ├── Experience.jsx      # Experience timeline
│   │   ├── Hero.jsx           # Hero section
│   │   ├── Projects.jsx        # Projects grid
│   │   ├── Skills.jsx         # Skills showcase
│   │   ├── Navigation.jsx     # Main navigation
│   │   ├── Footer.jsx         # Footer component
│   │   ├── Contact.jsx        # Contact section
│   │   ├── BackgroundParticles.jsx
│   │   ├── MouseFollower.jsx
│   │   └── ProjectDetails.jsx
│   ├── assets/
│   │   ├── css/
│   │   │   └── fonts.css
│   │   └── fonts/
│   ├── utils/
│   │   ├── api.js             # API integration
│   │   └── fileHelpers.js     # File handling utilities
│   └── App.jsx                # Main application component
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update fonts in `src/assets/css/fonts.css`
- Adjust component styles in their respective files

### Content
All content is loaded dynamically from the backend API. To modify content:
1. Use the admin dashboard application
2. Changes will reflect automatically in the frontend

## 🚀 Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Configure Environment**
   Update the `.env` file with production API URL:
   ```env
   REACT_APP_API_URL=https://your-api-domain.com/api
   ```

3. **Deploy the Build**
   - Upload the `build` folder to your hosting service
   - Configure for single-page application routing

## 🔧 Development

```bash
# Start development server
npm start

# Run tests
npm test

# Create production build
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## 📝 License

This project is private and confidential. All rights reserved.
