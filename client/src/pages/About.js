import { PenTool, Users, Heart, Zap } from "lucide-react"

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About <span className="text-primary-600">BlogSpace</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A modern platform for writers and readers to connect, share ideas, and build a community around great content.
        </p>
      </div>

      {/* Mission Section */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          BlogSpace was created to provide a clean, distraction-free environment for writers to share their thoughts and
          for readers to discover amazing content. We believe that everyone has a story to tell and valuable insights to
          share with the world.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <PenTool className="h-8 w-8 text-primary-600" />
            <h3 className="text-xl font-semibold text-gray-900">Rich Writing Experience</h3>
          </div>
          <p className="text-gray-600">
            Write with our intuitive Markdown editor featuring live preview, syntax highlighting, and a distraction-free
            interface.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-primary-600" />
            <h3 className="text-xl font-semibold text-gray-900">Community Driven</h3>
          </div>
          <p className="text-gray-600">
            Connect with fellow writers and readers through comments, likes, and meaningful discussions around shared
            interests.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-primary-600" />
            <h3 className="text-xl font-semibold text-gray-900">Engagement Tools</h3>
          </div>
          <p className="text-gray-600">
            Track your blog's performance with likes, comments, and reading time estimates. Build an audience that loves
            your content.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="h-8 w-8 text-primary-600" />
            <h3 className="text-xl font-semibold text-gray-900">Fast & Responsive</h3>
          </div>
          <p className="text-gray-600">
            Built with modern technologies for lightning-fast performance across all devices. Your content loads
            instantly, everywhere.
          </p>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Built With Modern Technology</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-blue-600">R</span>
            </div>
            <h4 className="font-semibold text-gray-900">React</h4>
            <p className="text-sm text-gray-600">Frontend Framework</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-green-600">N</span>
            </div>
            <h4 className="font-semibold text-gray-900">Node.js</h4>
            <p className="text-sm text-gray-600">Backend Runtime</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-purple-600">M</span>
            </div>
            <h4 className="font-semibold text-gray-900">MongoDB</h4>
            <p className="text-sm text-gray-600">Database</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-yellow-600">E</span>
            </div>
            <h4 className="font-semibold text-gray-900">Express</h4>
            <p className="text-sm text-gray-600">Web Framework</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Writing?</h2>
        <p className="text-gray-600 mb-6">
          Join our community of writers and share your unique perspective with the world.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/register" className="btn-primary p-4">
            Get Started
          </a>
          <a href="/" className="btn-outline p-4">
            Explore Blogs
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
