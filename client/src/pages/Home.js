"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import axios from "axios"
import BlogCard from "../components/BlogCard"
import LoadingSpinner from "../components/LoadingSpinner"
import AnimatedPage from "../components/AnimatedPage"
import { Search, ChevronLeft, ChevronRight, TrendingUp, Sparkles, Users, BookOpen } from "lucide-react"

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [stats, setStats] = useState({ totalBlogs: 0, totalUsers: 0, totalLikes: 0 })

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    fetchBlogs()
    fetchStats()
  }, [currentPage])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/blogs?page=${currentPage}&limit=6`)
      setBlogs(response.data.blogs)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // This would be a real API call in production
      setStats({
        totalBlogs: blogs.length || 12,
        totalUsers: 150,
        totalLikes: 1200,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <LoadingSpinner text="Loading amazing stories..." />
  }

  return (
    <AnimatedPage className="min-h-screen gradient-bg">
      <div className="pt-20 pb-12">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative overflow-hidden py-20"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-blue-600/10"></div>
          <div className="relative max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Welcome to{" "}
                <span className="gradient-text relative">
                  BlogSpace
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Sparkles className="h-8 w-8 text-yellow-500" />
                  </motion.div>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover amazing stories, insights, and ideas from our community of passionate writers. Share your
                thoughts and connect with like-minded people.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              className="relative max-w-lg mx-auto mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search amazing stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm"
                />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="/register"
                className="btn-primary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Writing Today
              </motion.a>
              <motion.a
                href="/about"
                className="btn-outline btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          ref={statsRef}
          className="py-16 bg-white/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, label: "Stories Published", value: stats.totalBlogs, color: "text-blue-600" },
                { icon: Users, label: "Active Writers", value: stats.totalUsers, color: "text-green-600" },
                { icon: TrendingUp, label: "Total Likes", value: stats.totalLikes, color: "text-red-600" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
                  <motion.h3
                    className="text-3xl font-bold text-gray-900 mb-2"
                    initial={{ scale: 0 }}
                    animate={statsInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                  >
                    {stat.value}+
                  </motion.h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Stories</h2>
              <p className="text-xl text-gray-600">Discover fresh perspectives and inspiring content</p>
            </motion.div>

            <AnimatePresence mode="wait">
              {filteredBlogs.length === 0 ? (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Search className="h-12 w-12 text-gray-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {searchTerm ? "No stories found" : "No stories available yet"}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {searchTerm
                      ? "Try adjusting your search terms or explore other topics."
                      : "Be the first to share your story with the community!"}
                  </p>
                </motion.div>
              ) : (
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" layout>
                  {filteredBlogs.map((blog, index) => (
                    <BlogCard key={blog._id} blog={blog} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {!searchTerm && totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="font-medium">Previous</span>
                </motion.button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-12 h-12 rounded-xl font-medium transition-all ${
                        currentPage === page
                          ? "bg-primary-600 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </AnimatedPage>
  )
}

export default Home
