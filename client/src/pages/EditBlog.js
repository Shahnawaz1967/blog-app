"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import toast from "react-hot-toast"
import MarkdownEditor from "../components/MarkdownEditor"
import { Save } from "lucide-react"

const EditBlog = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    status: "published",
    tags: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blogs/${id}`)
      const blog = response.data

      // Check if user can edit this blog
      if (blog.author._id !== user.id && user.role !== "admin") {
        toast.error("You are not authorized to edit this blog")
        navigate("/dashboard")
        return
      }

      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || "",
        status: blog.status,
        tags: blog.tags.join(", "),
      })
    } catch (error) {
      toast.error("Blog not found")
      navigate("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const blogData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }

      const response = await axios.put(`/api/blogs/${id}`, blogData)
      toast.success("Blog updated successfully!")
      navigate(`/blog/${response.data.slug}`)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog Post</h1>
        <p className="text-gray-600">Update your blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="input-field">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="input-field"
              placeholder="Brief description of your blog post (optional)"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter tags separated by commas (e.g., technology, programming, web)"
            />
          </div>
        </div>

        <div className="card p-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">Content *</label>
          <MarkdownEditor
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Write your blog content in Markdown..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate("/dashboard")} className="btn-secondary">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || !formData.title || !formData.content}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Updating..." : "Update Blog"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBlog
