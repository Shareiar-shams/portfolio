# 🌟 Full-Stack Portfolio Platform

A comprehensive portfolio platform consisting of three main applications: a dynamic frontend website, a secure backend API, and an admin dashboard for content management.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.svg)](https://www.mongodb.com/)

## 🏗️ Project Architecture

```
portfolio/
├── frontend/          # Public portfolio website
├── backend/           # RESTful API server
└── admin-app/         # Admin dashboard
```

## 🚀 Applications Overview

### 1. Frontend Application (`/frontend`)
- Public-facing portfolio website
- Dynamic content loading
- Interactive UI with animations
- Responsive design
- Built with React.js and TailwindCSS

### 2. Backend API (`/backend`)
- RESTful API server
- MongoDB database integration
- JWT authentication
- File upload handling
- Built with Node.js/Express.js

### 3. Admin Dashboard (`/admin-app`)
- Secure content management system
- Protected routes
- CRUD operations for all content
- Built with React.js

## 🛠️ Tech Stack

### Common Technologies
- **JavaScript/React**: Frontend and Admin Dashboard
- **TailwindCSS**: Styling
- **Axios**: API communication
- **JWT**: Authentication

### Frontend Specific
- React Router DOM
- Background Particles
- Custom animations
- FontAwesome icons

### Backend Specific
- Node.js & Express.js
- MongoDB & Mongoose
- Multer for file uploads
- Cloudinary integration

### Admin Dashboard Specific
- Protected routing
- Form handling
- File upload interface
- Toast notifications

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn
- Git

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Shareiar-shams/portfolio.git
   cd portfolio
   ```

2. **Environment Configuration**

   Create `.env` files in each directory:

   Backend (`/backend/.env`):
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   Frontend (`/frontend/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   Admin Dashboard (`/admin-app/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Install Dependencies**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install

   # Install admin dashboard dependencies
   cd ../admin-app
   npm install
   ```

4. **Database Setup**
   ```bash
   # From the backend directory
   npm run seed:about
   node createAdmin.js  # Create admin user
   ```

## 🎯 Running the Applications

### Development Mode

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:5000
   ```

2. **Start Frontend Application**
   ```bash
   cd frontend
   npm start
   # Frontend runs on http://localhost:3000
   ```

3. **Start Admin Dashboard**
   ```bash
   cd admin-app
   npm start
   # Admin dashboard runs on http://localhost:3001
   ```

### Production Deployment

1. **Backend Deployment**
   ```bash
   cd backend
   npm install --production
   npm start
   ```

2. **Frontend Build**
   ```bash
   cd frontend
   npm run build
   ```

3. **Admin Dashboard Build**
   ```bash
   cd admin-app
   npm run build
   ```

## 🔄 Data Flow

1. Admin updates content through the admin dashboard
2. Admin dashboard communicates with backend API
3. Backend processes and stores data in MongoDB
4. Frontend fetches and displays updated content
5. Changes are immediately reflected on the portfolio website

## 🔐 Security Features

- JWT-based authentication
- Protected admin routes
- Secure file upload handling
- CORS configuration
- Input validation
- Rate limiting

## 📁 Main Features

### Content Management
- Projects showcase
- Skills section
- Work experience
- About information
- Resume uploads
- Image management

### User Experience
- Responsive design
- Dynamic content loading
- Interactive UI elements
- Optimized performance
- SEO friendly

### Administration
- Secure admin login
- Content CRUD operations
- File management
- Analytics tracking
- User management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## 📜 License

This project is private and confidential. All rights reserved.

## 👥 Author

- **Shareiar Shams**
  - GitHub: [Shareiar-shams](https://github.com/Shareiar-shams)

## 🙏 Acknowledgments

Special thanks to all contributors and users of this portfolio platform.