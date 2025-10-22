import StatusBadge from './StatusBadge';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    authors: string[];
    isbn?: string | number;
    tags?: string[];
    notes?: string;
    owner: string;
  };
  availability: {
    available: boolean;
    borrower?: string;
    until?: string;
    status?: string;
  };
  onRequestLoan?: () => void;
}

export default function BookCard({ book, availability, onRequestLoan }: BookCardProps) {
  return (
    <div className="card group animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
          {book.title}
        </h3>
        <StatusBadge 
          status={availability.available ? 'available' : 'borrowed'} 
          borrower={availability.borrower}
          until={availability.until}
        />
      </div>
      
      <p className="text-gray-600 text-sm mb-3 font-medium">
        by {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
          @{book.owner}
        </span>
        {book.isbn && (
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-md border">
            {book.isbn}
          </span>
        )}
      </div>
      
      {book.tags && book.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {book.tags.map((tag: string) => (
            <span 
              key={tag}
              className="tag"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {book.notes && (
        <div className="bg-gray-50/50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-600 italic">
            "{book.notes}"
          </p>
        </div>
      )}
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <a 
          href={`/book/${encodeURIComponent(book.id)}`}
          className="link-primary text-sm font-medium flex items-center gap-1"
        >
          View details
          <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
        </a>
        
        {availability.available && onRequestLoan && (
          <button 
            onClick={onRequestLoan}
            className="btn-primary text-sm"
          >
            Request Loan
          </button>
        )}
      </div>
    </div>
  );
}
