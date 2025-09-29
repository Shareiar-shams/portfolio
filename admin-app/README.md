# Portfolio Admin Dashboard

This is the admin dashboard application for managing the portfolio website content. It provides a secure interface for administrators to manage various sections of the portfolio including projects, skills, experience, and about information.

## Features

- **Secure Authentication**: Admin login with protected routes
- **Projects Management**: Add, edit, and delete portfolio projects
- **Skills Management**: Manage technical skills and competencies
- **Experience Management**: Handle work experience and career history
- **About Management**: Update personal information and resume
- **Media Upload**: Support for images and document uploads
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React.js (v19)
- React Router DOM (v7)
- Axios for API calls
- TailwindCSS for styling
- SweetAlert2 for notifications
- FontAwesome icons
- Lucide React icons

## Project Structure

```
admin-app/
├── src/
│   ├── components/
│   │   ├── PrivateRoute.jsx
│   │   └── admin/
│   │       └── AdminLayout.jsx
│   ├── pages/
│   │   ├── AdminLogin.jsx
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       ├── projects/
│   │       ├── skills/
│   │       ├── experience/
│   │       └── about/
│   └── utils/
│       ├── api.js
│       └── toast.js
└── public/
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the root directory with:
   ```
   REACT_APP_API_URL=your_backend_api_url
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will run on [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Security

- All routes except login are protected
- JWT authentication is implemented
- API requests are authenticated
- Session management is handled securely

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is private and confidential. All rights reserved.
