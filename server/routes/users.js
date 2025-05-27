const express = require("express")
const User = require("../models/User")
const Blog = require("../models/Blog")
const { auth } = require("../middleware/auth")

const router = express.Router()

// Get user stats
router.get("/stats", auth, async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments({ author: req.user._id })
    const publishedBlogs = await Blog.countDocuments({
      author: req.user._id,
      status: "published",
    })
    const draftBlogs = await Blog.countDocuments({
      author: req.user._id,
      status: "draft",
    })

    // Get total likes across all user's blogs
    const blogs = await Blog.find({ author: req.user._id })
    const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes.length, 0)

    res.json({
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalLikes,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
