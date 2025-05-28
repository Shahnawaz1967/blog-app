const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const blogRoutes = require("./routes/blogs")
const userRoutes = require("./routes/users")

const app = express()

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? ["https://blog-app-rosy-mu.vercel.app"] : ["http://localhost:3000"],
    credentials: true,
  }),
)
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/users", userRoutes)

// Health check endpoint
app.get("/api", (req, res) => {
  res.json({ message: "MERN Blog API is running!" })
})

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI )
   
    console.log("MongoDB Connected")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

// Connect to database
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Export for Vercel
module.exports = app
