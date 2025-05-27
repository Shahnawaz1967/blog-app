
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, Heart, Clock, MessageCircle, Eye } from "lucide-react"

const BlogCard = ({ blog, index = 0 }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <motion.div
      className="card card-hover p-6 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Author Info */}
      <motion.div
        className="flex items-center space-x-3 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 + index * 0.1 }}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-sm font-bold">{blog.author.username.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{blog.author.username}</p>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blog Content */}
      <Link to={`/blog/${blog.slug}`} className="block group">
        <motion.h2
          className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {blog.title}
        </motion.h2>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
      </Link>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {blog.tags.slice(0, 3).map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full font-medium hover:bg-primary-200 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.span>
          ))}
          {blog.tags.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">+{blog.tags.length - 3} more</span>
          )}
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        className="flex items-center justify-between pt-4 border-t border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + index * 0.1 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">{blog.likes.length}</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{blog.comments.length}</span>
          </motion.div>
        </div>

        <Link to={`/blog/${blog.slug}`}>
          <motion.div
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors group"
            whileHover={{ x: 4 }}
          >
            <span className="text-sm font-medium">Read more</span>
            <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default BlogCard
