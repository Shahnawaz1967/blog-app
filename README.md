# MERN Blog Platform

This is a full-stack blog application built using the MERN stack (MongoDB, Express.js, React, Node.js). Users can register, log in, create blog posts, and manage them by editing or deleting. They can also like and comment on posts. The app uses JWT for secure authentication and Tailwind CSS for a clean, responsive design. The frontend is deployed on Netlify, and the backend is hosted on Render, providing a smooth and user-friendly blogging experience..

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (user, admin)
- Secure password hashing with bcrypt
- Protected routes and API endpoints

### ✍️ Blog Management
- Rich markdown editor with live preview
- Auto-generated slugs for SEO-friendly URLs
- Draft and published post states
- Tag system for categorization
- Reading time estimation

### 👥 User Interaction
- Like/unlike blog posts
- Comment system
- User profiles and avatars
- Personal dashboard with statistics

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Clean, modern interface
- Mobile-first approach
- Dark mode support (optional)

### 👑 Admin Features
- Admin can edit/delete any blog post
- Enhanced privileges for content moderation
- User management capabilities

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Markdown** - Markdown rendering
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **slugify** - URL slug generation

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd mern-blog-platform
\`\`\`

### 2. Install dependencies
\`\`\`bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
\`\`\`

### 3. Environment Setup
Create a `.env` file in the server directory:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
\`\`\`

### 4. Start the application
\`\`\`bash
# From the root directory
npm run dev
\`\`\`

This will start both the server (port 5000) and client (port 3000) concurrently.

## Project Structure

\`\`\`
mern-blog-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Entry point
│   └── package.json
├── package.json            # Root package.json
└── README.md
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Blogs
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:slug` - Get single blog by slug
- `POST /api/blogs` - Create new blog (auth required)
- `PUT /api/blogs/:id` - Update blog (auth required)
- `DELETE /api/blogs/:id` - Delete blog (auth required)
- `POST /api/blogs/:id/like` - Like/unlike blog (auth required)
- `POST /api/blogs/:id/comments` - Add comment (auth required)
- `GET /api/blogs/user/my-blogs` - Get user's blogs (auth required)

### Users
- `GET /api/users/stats` - Get user statistics (auth required)

## Features in Detail

### Markdown Editor
- Live preview functionality
- Syntax highlighting
- Full markdown support including:
  - Headers, lists, links
  - Code blocks and inline code
  - Blockquotes
  - Tables and more

### Role-Based Access
- **Users** can:
  - Create, edit, and delete their own blogs
  - Like and comment on posts
  - View their dashboard with statistics
  
- **Admins** can:
  - All user permissions
  - Edit and delete any blog post
  - Access admin dashboard (optional)

### Responsive Design
- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly interface
- Fast loading and smooth animations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.
