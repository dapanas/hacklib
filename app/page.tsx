export const revalidate = 60;

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              HackLib
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            A low-ops lending system where{' '}
            <span className="font-semibold text-primary-700">GitHub is the database</span>,{' '}
            <span className="font-semibold text-primary-700">YAML is the state</span>, and{' '}
            <span className="font-semibold text-primary-700">PRs are the workflow</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <a 
              href="/books" 
              className="btn-primary text-lg px-8 py-4"
            >
              Browse All Books
            </a>
            <a 
              href="/my-loans" 
              className="btn-secondary text-lg px-8 py-4"
            >
              View My Loans
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, transparent, and community-driven book sharing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card-hover p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-8 bg-primary-600 rounded-sm relative">
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-400 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse Books</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover books available from our community members. Each book shows availability, owner, and details.
              </p>
            </div>
            
            <div className="glass-card-hover p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-success-100 to-success-200 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-success-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-success-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Loans</h3>
              <p className="text-gray-600 leading-relaxed">
                Request books through GitHub Pull Requests. Owners review and approve requests transparently.
              </p>
            </div>
            
            <div className="glass-card-hover p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-warning-100 to-warning-200 rounded-lg flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-4 bg-warning-600 rounded-sm"></div>
                    <div className="w-2 h-4 bg-warning-600 rounded-sm"></div>
                    <div className="w-2 h-4 bg-warning-600 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your books with fellow HackLab members. Everything is tracked and validated automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to start sharing?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the community and start borrowing and lending books today. 
              It's free, transparent, and built for developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/books" 
                className="btn-primary text-lg px-8 py-4"
              >
                Start Browsing
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
