import { getAllBooks } from "@/lib/data";
import { getAvailability } from "@/lib/availability";
import BookCard from "@/components/BookCard";

export const revalidate = 60;

export default async function BooksPage() {
  let books = [];
  let error = null;
  
  try {
    books = await getAllBooks();
  } catch (err) {
    console.error('Error loading books:', err);
    error = err instanceof Error ? err.message : 'Failed to load books';
  }
  
  // Get availability for each book
  const booksWithAvailability = await Promise.all(
    books.map(async (book) => ({
      ...book,
      availability: await getAvailability(book.id)
    }))
  );

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
          Book Catalog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up">
          Discover books available from our community members. 
          Each book is carefully curated and ready to share.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 bg-success-400 rounded-full animate-pulse-soft"></span>
          <span>{booksWithAvailability.length} books available</span>
        </div>
      </div>
      
      {error ? (
        <div className="text-center py-20">
          <div className="glass-card p-12 max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-danger-100 to-danger-200 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-danger-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Unable to load books</h3>
            <p className="text-gray-600 mb-6">
              {error}. Please check your data files or try again later.
            </p>
            <a 
              href="/" 
              className="btn-primary"
            >
              Go Home
            </a>
          </div>
        </div>
      ) : booksWithAvailability.length === 0 ? (
        <div className="text-center py-20">
          <div className="glass-card p-12 max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 animate-bounce flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-8 h-10 bg-gray-400 rounded-sm relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No books found</h3>
            <p className="text-gray-600 mb-6">
              Be the first to add books to the collection! 
              Share your favorite reads with the community.
            </p>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Add Your First Book
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {booksWithAvailability.map((book: any, index: number) => (
            <div 
              key={book.id}
              className="animate-fade-in h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BookCard 
                book={book} 
                availability={book.availability}
              />
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
