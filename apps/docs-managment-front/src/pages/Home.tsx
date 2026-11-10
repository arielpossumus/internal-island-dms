// src/pages/Home.tsx

import React from 'react'

export function Home(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Isla DMS
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          A white-label digital document management platform
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
