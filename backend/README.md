# Portfolio Backend API

This is the backend server application for the portfolio website. It provides RESTful API endpoints for managing portfolio content, user authentication, and file uploads.

## Features

- **Authentication System**
  - JWT-based authentication
  - Admin user management
  - Secure password hashing with bcrypt

- **Content Management**
  - Projects CRUD operations
  - Skills management
  - Experience entries
  - About section with resume
  - Visitor statistics

- **File Upload System**
  - Image upload support
  - Resume/PDF upload support
  - Cloud storage integration with Cloudinary
  - File validation and processing

## Tech Stack

- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT for authentication
- Multer for file uploads
- Cloudinary for cloud storage
- CORS for cross-origin resource sharing
- dotenv for environment variables

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── middleware/
│   └── auth.js            # Authentication middleware
├── models/
│   ├── About.js           # About section schema
│   ├── Experience.js      # Experience schema
│   ├── Project.js         # Project schema
│   ├── Skill.js          # Skills schema
│   ├── User.js           # User schema
│   └── Visitor.js        # Visitor tracking schema
├── routes/
│   ├── about.js          # About section routes
│   ├── auth.js           # Authentication routes
│   ├── experience.js     # Experience routes
│   ├── projects.js       # Projects routes
│   ├── skills.js         # Skills routes
│   ├── upload.js         # File upload routes
│   └── visitor.js        # Visitor tracking routes
├── seeders/
│   └── AboutSeeder.js    # Seeder for about section
├── uploads/              # Local file storage
│   ├── about/
│   │   ├── images/
│   │   └── resumes/
│   └── projects/
├── createAdmin.js        # Admin user creation script
└── server.js            # Main application entry
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. **Database Setup**
   ```bash
   # Ensure MongoDB is running
   # Run database migrations/seeders
   npm run seed:about
   ```

4. **Create Admin User**
   ```bash
   node createAdmin.js
   ```

5. **Start the Server**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Experience
- `GET /api/experience` - Get all experience entries
- `POST /api/experience` - Add experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

### About
- `GET /api/about` - Get about information
- `PUT /api/about/:id` - Update about section

### File Upload
- `POST /api/upload/image` - Upload image
- `POST /api/upload/resume` - Upload resume

## Error Handling

The API uses consistent error response format:
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information"
}
```

## Security Measures

- JWT authentication for protected routes
- Password hashing using bcrypt
- File type validation for uploads
- CORS configuration
- Request rate limiting
- Input validation and sanitization

## Development

```bash
# Run in development mode
npm run dev

# Run specific seeder
npm run seed:about
```

## Production Deployment

1. Set all production environment variables
2. Install production dependencies
3. Build and start the application
   ```bash
   npm install --production
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and confidential. All rights reserved.