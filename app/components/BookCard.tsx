import { User, Tag } from 'lucide-react';
import StatusBadge from './StatusBadge';
import Nickname from './Nickname';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    authors: string[];
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
  // Determine accent color based on availability
  const accentColor = availability.available 
    ? 'bg-success-500' 
    : 'bg-danger-500';
  
  // Determine status text
  const statusText = availability.available ? 'Available' : 'Borrowed';

  return (
    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-full flex flex-col group hover:scale-[1.02] shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in overflow-hidden">
      {/* Status Accent Strip - extends to card edge */}
      <div className={`absolute -left-px -top-px -bottom-px w-1 ${accentColor} rounded-l-2xl`}></div>
      {/* Main Content */}
      <div className="flex-1">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200 mb-3 leading-tight">
          <a 
            href={`/book/${encodeURIComponent(book.id)}`}
            className="hover:text-primary-700 transition-colors duration-200"
          >
            {book.title}
          </a>
        </h3>
        
        {/* Book Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <User className="w-4 h-4 text-blue-500" />
            <span className="line-clamp-1">
              {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}
            </span>
          </div>
          
          {book.tags && book.tags.length > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <Tag className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600 line-clamp-1">
                {book.tags.slice(0, 2).join(', ')}
                {book.tags.length > 2 && ` +${book.tags.length - 2} more`}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-auto">
        {/* Owner */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
          <Nickname username={book.owner} className="text-sm" />
        </div>
        
        {/* Bottom Row: Status and View Details */}
        <div className="flex items-center justify-between">
          {/* Status Text */}
          <span className={`text-sm font-medium ${availability.available ? 'text-success-600' : 'text-danger-600'}`}>
            {statusText}
          </span>
          
          {/* View Details Link */}
          <a 
            href={`/book/${encodeURIComponent(book.id)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            View details
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
