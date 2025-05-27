const express = require("express")
const { body, validationResult } = require("express-validator")
const slugify = require("slugify")
const Blog = require("../models/Blog")
const { auth, adminAuth } = require("../middleware/auth")

const router = express.Router()

// Get all published blogs
router.get("/", async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const blogs = await Blog.find({ status: "published" })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Blog.countDocuments({ status: "published" })

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get single blog by slug
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate("author", "username avatar bio")
      .populate("comments.user", "username avatar")

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }

    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Create blog
router.post(
  "/",
  auth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { title, content, status, tags, excerpt } = req.body

      // Generate unique slug
      let slug = slugify(title, { lower: true, strict: true })
      const existingBlog = await Blog.findOne({ slug })
      if (existingBlog) {
        slug = `${slug}-${Date.now()}`
      }

      const blog = new Blog({
        title,
        slug,
        content,
        excerpt,
        author: req.user._id,
        status: status || "published",
        tags: tags || [],
      })

      await blog.save()
      await blog.populate("author", "username avatar")

      res.status(201).json(blog)
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message })
    }
  },
)

// Update blog
// Update blog
router.put("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }

    // ✅ Check if the user owns the blog or is admin
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" })
    }

    const { title, content, status, tags, excerpt } = req.body

    // 🔁 Update slug if title is changed
    if (title && title !== blog.title) {
      blog.slug = slugify(title, { lower: true, strict: true })
    }

    // ✅ Update blog fields
    blog.title = title || blog.title
    blog.content = content || blog.content
    blog.excerpt = excerpt || blog.excerpt
    blog.status = status || blog.status
    blog.tags = tags || blog.tags

    await blog.save()
    await blog.populate("author", "username avatar")

    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Delete blog
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }

    // Check if user owns the blog or is admin
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" })
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: "Blog deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Like/Unlike blog
router.post("/:id/like", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }

    const userLiked = blog.likes.includes(req.user._id)

    if (userLiked) {
      blog.likes = blog.likes.filter((id) => id.toString() !== req.user._id.toString())
    } else {
      blog.likes.push(req.user._id)
    }

    await blog.save()
    res.json({ likes: blog.likes.length, liked: !userLiked })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Add comment
router.post(
  "/:id/comments",
  auth,
  [body("content").notEmpty().withMessage("Comment content is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const blog = await Blog.findById(req.params.id)

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" })
      }

      const comment = {
        user: req.user._id,
        content: req.body.content,
      }

      blog.comments.push(comment)
      await blog.save()
      await blog.populate("comments.user", "username avatar")

      res.status(201).json(blog.comments[blog.comments.length - 1])
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message })
    }
  },
)

// Get user's blogs
router.get("/user/my-blogs", auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })

    res.json(blogs)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
