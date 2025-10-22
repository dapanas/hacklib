import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="glass-card p-12 max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-8 h-10 bg-gray-400 rounded-sm relative">
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/" 
            className="btn-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
