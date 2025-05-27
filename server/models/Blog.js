const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      maxlength: 300,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    readTime: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
)

// Calculate read time based on content length
blogSchema.pre("save", function (next) {
  if (this.content) {
    const wordsPerMinute = 200
    const wordCount = this.content.split(" ").length
    this.readTime = Math.ceil(wordCount / wordsPerMinute)
  }

  // Generate excerpt if not provided
  if (this.content && !this.excerpt) {
    this.excerpt = this.content.substring(0, 150) + "..."
  }

  next()
})

module.exports = mongoose.model("Blog", blogSchema)
