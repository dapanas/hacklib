import { getBookById } from "@/lib/data";
import { getAvailability } from "@/lib/availability";
import { buildCreateLoanURL } from "@/lib/github";
import { getCurrentUsername } from "@/lib/auth";
import StatusBadge from "@/components/StatusBadge";

export const revalidate = 60;

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const book = await getBookById(decodeURIComponent(bookId));
  const availability = await getAvailability(book.id);
  const currentUsername = await getCurrentUsername();

  const org = process.env.NEXT_PUBLIC_GH_ORG!;
  const repo = process.env.NEXT_PUBLIC_GH_REPO!;
  const borrower = currentUsername || process.env.NEXT_PUBLIC_DEFAULT_BORROWER || "your-github";
  const requestedAt = new Date().toISOString().slice(0, 10);
  const until = new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString().slice(0, 10); // +21d
  const year = requestedAt.slice(0, 4);
  const createUrl = buildCreateLoanURL({
    org, 
    repo, 
    year,
    owner: book.owner,
    bookId: book.id,
    borrower,
    requestedAt,
    until
  });

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <a 
            href="/books" 
            className="link-primary text-sm font-medium mb-6 inline-flex items-center gap-2 hover:gap-3 transition-all duration-200"
          >
            <span>←</span>
            Back to Books
          </a>
        </div>
        
        {/* Book Header */}
        <div className="glass-card p-8 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6 font-medium">
                by {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                  Owner: @{book.owner}
                </span>
                {book.isbn && (
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-md border">
                    ISBN: {book.isbn}
                  </span>
                )}
              </div>
            </div>
            <div className="lg:flex-shrink-0">
              <StatusBadge 
                status={availability.available ? 'available' : 'borrowed'} 
                borrower={availability.borrower}
                until={availability.until}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Details */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 animate-slide-up">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Book Details</h2>
              
              <div className="space-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-2">Book ID</dt>
                  <dd className="font-mono text-sm bg-gray-100 px-4 py-3 rounded-lg border">
                    {book.id}
                  </dd>
                </div>
                
                {book.tags && book.tags.length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-3">Tags</dt>
                    <dd>
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag: string) => (
                          <span 
                            key={tag}
                            className="tag"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
                
                {book.notes && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-3">Notes</dt>
                    <dd className="bg-gray-50/50 rounded-lg p-4">
                      <p className="text-gray-900 italic">
                        "{book.notes}"
                      </p>
                    </dd>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Request Loan Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24 animate-scale-in">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Request Loan</h3>
              
              {availability.available ? (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Click the button below to create a loan request via GitHub Pull Request.
                  </p>
                  
                  <a 
                    href={createUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center block"
                  >
                    Request Loan
                  </a>
                  
                  <div className="bg-gray-50/50 rounded-lg p-4 space-y-2">
                    <div className="text-xs text-gray-600">
                      <strong>Request details:</strong>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Borrower: @{borrower}</p>
                      <p>• Due date: {until}</p>
                      <p>• Owner @{book.owner} will review</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600">
                    This book is currently not available for loan.
                  </p>
                  
                  <div className="bg-danger-50/50 border border-danger-200 rounded-lg p-4">
                    <p className="text-sm text-danger-700 font-medium mb-2">
                      Currently borrowed by:
                    </p>
                    <p className="text-sm text-danger-600">
                      @{availability.borrower}
                    </p>
                    {availability.until && (
                      <p className="text-xs text-danger-500 mt-1">
                        Due: {availability.until}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
