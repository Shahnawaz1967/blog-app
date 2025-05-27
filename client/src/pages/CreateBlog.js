"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import MarkdownEditor from "../components/MarkdownEditor";
import { Save } from "lucide-react";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    status: "published",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      const response = await axios.post("/api/blogs", blogData);
      toast.success("Blog created successfully!");
      navigate(`/blog/${response.data.slug}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Blog Post
        </h1>
        <p className="text-gray-600">Share your thoughts with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Content *
          </label>
          <MarkdownEditor
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Write your blog content in Markdown..."
          />
        </div>

        <div className="flex justify-end space-x-2 items-center p-4 bg-gray-100 text-gray-700 rounded-md border-t border-gray-300">
  <button
    type="button"
    onClick={() => navigate("/")}
    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading || !formData.title.trim() || !formData.content.trim()}
    className={`px-4 py-2 rounded-md flex items-center space-x-2 transition 
      ${loading || !formData.title.trim() || !formData.content.trim()
        ? "bg-blue-600 text-white opacity-50 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"}
    `}
  >
    <Save className="h-4 w-4" />
    <span>{loading ? "Creating..." : "Create Blog"}</span>
  </button>
</div>

      </form>
    </div>
  );
};

export default CreateBlog;
