import { getAllLoans } from "@/lib/data";
import { getAllBooks } from "@/lib/data";
import { getCurrentUsername } from "@/lib/auth";

export const revalidate = 60;

export default async function MyLoansPage() {
  const loans = await getAllLoans();
  const books = await getAllBooks();
  const currentUsername = await getCurrentUsername();
  
  // Create a map of book_id to book details
  const bookMap = new Map(books.map(book => [book.id, book]));
  
  // Filter loans for the current user
  const currentUser = currentUsername || process.env.NEXT_PUBLIC_DEFAULT_BORROWER || "your-github";
  const userLoans = loans.filter(loan => 
    loan.borrower === currentUser || loan.owner === currentUser
  );

  const getLoanStatus = (loan: any) => {
    switch (loan.status) {
      case 'requested':
        return { text: 'Pending approval', className: 'status-pending' };
      case 'approved':
        return { text: 'Approved - ready to pick up', className: 'status-available' };
      case 'ongoing':
        return { text: 'Currently borrowed', className: 'status-borrowed' };
      case 'returned':
        return { text: 'Returned', className: 'bg-gray-100 text-gray-800' };
      case 'rejected':
        return { text: 'Rejected', className: 'status-borrowed' };
      case 'lost':
        return { text: 'Lost', className: 'bg-red-200 text-red-900' };
      default:
        return { text: 'Unknown', className: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Loans</h1>
        <p className="text-gray-600">
          Track your book loans and requests
        </p>
      </div>
      
      {userLoans.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📖</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No loans found</h3>
          <p className="text-gray-500">You haven't requested or borrowed any books yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {userLoans.map((loan) => {
            const book = bookMap.get(loan.book_id);
            const status = getLoanStatus(loan);
            
            return (
              <div key={loan.loan_id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {book ? book.title : `Book ID: ${loan.book_id}`}
                    </h3>
                    {book && (
                      <p className="text-gray-600 text-sm mt-1">
                        by {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}
                      </p>
                    )}
                  </div>
                  <span className={`status-badge ${status.className}`}>
                    {status.text}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Role</dt>
                    <dd className="text-gray-900">
                      {loan.borrower === currentUser ? 'Borrower' : 'Owner'}
                    </dd>
                  </div>
                  
                  <div>
                    <dt className="text-gray-500">Book Owner</dt>
                    <dd className="text-gray-900">@{loan.owner}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-gray-500">Borrower</dt>
                    <dd className="text-gray-900">@{loan.borrower}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-gray-500">Due Date</dt>
                    <dd className="text-gray-900">{loan.until}</dd>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Requested: {loan.requested_at}</span>
                    {loan.approved_at && (
                      <span>Approved: {loan.approved_at}</span>
                    )}
                    {loan.returned_at && (
                      <span>Returned: {loan.returned_at}</span>
                    )}
                  </div>
                  
                  {loan.notes && (
                    <p className="mt-2 text-sm text-gray-600 italic">
                      "{loan.notes}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
