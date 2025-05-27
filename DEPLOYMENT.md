# Deployment Guide

## Prerequisites
- Vercel account
- MongoDB Atlas account (or local MongoDB)
- Environment variables set up

## Backend Deployment (Vercel)

1. **Deploy the server folder to Vercel:**
   \`\`\`bash
   cd server
   vercel --prod
   \`\`\`

2. **Set environment variables in Vercel dashboard:**
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT signing
   - `PORT`: 5000 (or any port you prefer)

3. **Update CORS settings** in server.js if needed for your frontend domain.

## Frontend Deployment (Vercel)

1. **Deploy the client folder to Vercel:**
   \`\`\`bash
   cd client
   vercel --prod
   \`\`\`

2. **Update API URL** in the client to point to your deployed backend.

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to your environment variables as `MONGODB_URI`

### Option 2: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/mern-blog` as your `MONGODB_URI`

## Environment Variables Setup

Make sure these are set in your Vercel project:

- **MONGODB_URI**: `mongodb+srv://username:password@cluster.mongodb.net/mern-blog`
- **JWT_SECRET**: `your-super-secure-random-string-here`
- **PORT**: `5000`

## Testing the Deployment

1. Visit your deployed frontend URL
2. Try registering a new account
3. Create a blog post
4. Test all functionality (login, create, edit, delete, like, comment)

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Update CORS settings in server.js
2. **Database Connection**: Check MongoDB URI and network access
3. **Environment Variables**: Ensure all variables are set correctly
4. **API Endpoints**: Verify the API base URL in the frontend

### Debug Steps:

1. Check Vercel function logs
2. Test API endpoints directly
3. Verify database connection
4. Check browser console for errors
