
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import toast from "react-hot-toast"
import ReactMarkdown from "react-markdown"
import { Calendar, Heart, MessageCircle, Edit, Trash2, Clock } from "lucide-react"

const BlogDetail = () => {
  const { slug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [comment, setComment] = useState("")
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  useEffect(() => {
    if (blog && user) {
      setLiked(blog.likes.includes(user.id))
      setLikesCount(blog.likes.length)
    }
  }, [blog, user])

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blogs/${slug}`)
      setBlog(response.data)
    } catch (error) {
      toast.error("Blog not found")
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like posts")
      return
    }

    try {
      const response = await axios.post(`/api/blogs/${blog._id}/like`)
      setLiked(response.data.liked)
      setLikesCount(response.data.likes)
    } catch (error) {
      toast.error("Failed to update like")
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/api/blogs/${blog._id}`)
        toast.success("Blog deleted successfully")
        navigate("/dashboard")
      } catch (error) {
        toast.error("Failed to delete blog")
      }
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error("Please login to comment")
      return
    }

    setSubmittingComment(true)
    try {
      const response = await axios.post(`/api/blogs/${blog._id}/comments`, {
        content: comment,
      })
      setBlog({
        ...blog,
        comments: [...blog.comments, response.data],
      })
      setComment("")
      toast.success("Comment added successfully")
    } catch (error) {
      toast.error("Failed to add comment")
    } finally {
      setSubmittingComment(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const canEditOrDelete = user && (user.id === blog?.author._id || user.role === "admin")

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Blog not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{blog.author.username.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{blog.author.username}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {canEditOrDelete && (
            <div className="flex items-center space-x-2">
              <Link
                to={`/edit/${blog._id}`}
                className="flex items-center space-x-1 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span key={index} className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Like and Comment Stats */}
        <div className="flex items-center space-x-6 py-4 border-y border-gray-200">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              liked ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
            <span>
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </span>
          </button>
          <div className="flex items-center space-x-2 text-gray-600">
            <MessageCircle className="h-5 w-5" />
            <span>
              {blog.comments.length} {blog.comments.length === 1 ? "comment" : "comments"}
            </span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="card p-8 mb-8">
        <div className="markdown-content">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Comments ({blog.comments.length})</h3>

        {/* Add Comment Form */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">{user.username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                  className="input-field mb-3"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingComment || !comment.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed m-4 p-4 bg-blue-500 hover:bg-blue-800 rounded-lg"
                >
                  {submittingComment ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Login
              </Link>{" "}
              to join the conversation
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {blog.comments.map((comment) => (
            <div key={comment._id} className="flex space-x-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">{comment.user.username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{comment.user.username}</span>
                  <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}

          {blog.comments.length === 0 && (
            <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
