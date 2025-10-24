import { getAllBooks, getAllBoardGames, getAllVideoGames, getAllElectronics } from "@/lib/data";
import { Search, FileText, Users } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const books = await getAllBooks();
  const boardGames = await getAllBoardGames();
  const videoGames = await getAllVideoGames();
  const electronics = await getAllElectronics();
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
              Browse Categories
            </a>
            <a 
              href="/my-loans" 
              className="btn-secondary text-lg px-8 py-4"
            >
              View Loans
            </a>
          </div>
        </div>
      </div>

      {/* Category Showcase Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover items available from our community members
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a 
              href="/books" 
              className="glass-card-hover p-6 text-center group"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Books</h3>
              <p className="text-gray-600 text-sm mb-3">
                {books.length} available
              </p>
              <div className="text-primary-600 font-medium group-hover:text-primary-700">
                Browse Books →
              </div>
            </a>
            
            <a 
              href="/boardgames" 
              className="glass-card-hover p-6 text-center group"
            >
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Board Games</h3>
              <p className="text-gray-600 text-sm mb-3">
                {boardGames.length} available
              </p>
              <div className="text-primary-600 font-medium group-hover:text-primary-700">
                Browse Board Games →
              </div>
            </a>
            
            <a 
              href="/videogames" 
              className="glass-card-hover p-6 text-center group"
            >
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Games</h3>
              <p className="text-gray-600 text-sm mb-3">
                {videoGames.length} available
              </p>
              <div className="text-primary-600 font-medium group-hover:text-primary-700">
                Browse Video Games →
              </div>
            </a>
            
            <a 
              href="/electronics" 
              className="glass-card-hover p-6 text-center group"
            >
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Electronics</h3>
              <p className="text-gray-600 text-sm mb-3">
                {electronics.length} available
              </p>
              <div className="text-primary-600 font-medium group-hover:text-primary-700">
                Browse Electronics →
              </div>
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
              Simple, transparent, and community-driven item sharing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card-hover p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse Items</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover items available from our community members. Each item shows availability, owner, and details.
              </p>
            </div>
            
            <div className="glass-card-hover p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Loans</h3>
              <p className="text-gray-600 leading-relaxed">
                Request items through GitHub Pull Requests. Owners review and approve requests transparently.
              </p>
            </div>
            
            <div className="glass-card-hover p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your items with fellow HackLab members. Everything is tracked and validated automatically.
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
              Join the community and start borrowing and lending items today. 
              It's free, transparent, and built for developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/books" 
                className="btn-primary text-lg px-8 py-4"
              >
                Browse Categories
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
