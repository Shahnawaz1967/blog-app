"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { Eye, Edit } from "lucide-react"

const MarkdownEditor = ({ value, onChange, placeholder }) => {
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-50 px-4 py-2 border-b border-gray-300">
        <span className="text-sm font-medium text-gray-700">Content</span>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${
              !isPreview ? "bg-primary-600 text-white" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${
              isPreview ? "bg-primary-600 text-white" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <div className="min-h-[400px]">
        {isPreview ? (
          <div className="p-4 markdown-content">
            <ReactMarkdown>{value || "Nothing to preview..."}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[400px] p-4 border-none outline-none resize-none font-mono text-sm"
          />
        )}
      </div>
    </div>
  )
}

export default MarkdownEditor
