import { getAllLoans } from "@/lib/data";
import { getAllBooks, getAllBoardGames, getAllVideoGames, getAllElectronics } from "@/lib/data";
import { getCurrentUsername } from "@/lib/auth";
import { getItemTypeConfig, getItemTypeFromId, getItemTypeBadge, ItemType } from "@/lib/itemTypes";
import Nickname from "@/components/Nickname";

export const revalidate = 60;

export default async function MyLoansPage() {
  const loans = await getAllLoans();
  const books = await getAllBooks();
  const boardGames = await getAllBoardGames();
  const videoGames = await getAllVideoGames();
  const electronics = await getAllElectronics();
  const currentUsername = await getCurrentUsername();
  
  // Create maps of item_id to item details for all types
  const bookMap = new Map(books.map(book => [book.id, { ...book, type: 'book' as ItemType }]));
  const boardGameMap = new Map(boardGames.map(bg => [bg.id, { ...bg, type: 'boardgame' as ItemType }]));
  const videoGameMap = new Map(videoGames.map(vg => [vg.id, { ...vg, type: 'videogame' as ItemType }]));
  const electronicsMap = new Map(electronics.map(el => [el.id, { ...el, type: 'electronics' as ItemType }]));
  
  // Combine all item maps
  const allItemsMap = new Map([...bookMap, ...boardGameMap, ...videoGameMap, ...electronicsMap]);
  
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
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Loans</h1>
          <p className="text-gray-600">
            Track your loans and requests across all item types
          </p>
        </div>
      
      {userLoans.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No loans found</h3>
          <p className="text-gray-500">You haven't requested or borrowed any items yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {userLoans.map((loan) => {
            // Determine item type and get item details
            const itemType = loan.item_type || getItemTypeFromId(loan.item_id || loan.book_id);
            const item = allItemsMap.get(loan.item_id || loan.book_id);
            const status = getLoanStatus(loan);
            const typeConfig = getItemTypeConfig(itemType);
            
            return (
              <div key={loan.loan_id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeConfig.bgColor} ${typeConfig.textColor} ${typeConfig.borderColor} border`}>
                        {getItemTypeBadge(itemType)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item ? item.title : `${typeConfig.label} ID: ${loan.item_id || loan.book_id}`}
                    </h3>
                    {item && (
                      <p className="text-gray-600 text-sm mt-1">
                        {itemType === 'book' && item.authors && (
                          <>by {Array.isArray(item.authors) ? item.authors.join(", ") : item.authors}</>
                        )}
                        {itemType === 'boardgame' && item.min_players && item.max_players && (
                          <>{item.min_players}-{item.max_players} players</>
                        )}
                        {itemType === 'videogame' && item.platform && (
                          <>Platform: {Array.isArray(item.platform) ? item.platform.join(", ") : item.platform}</>
                        )}
                        {itemType === 'electronics' && item.component_type && (
                          <>Type: {item.component_type.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</>
                        )}
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
                    <dt className="text-gray-500">Item Owner</dt>
                    <dd className="text-gray-900">
                      <Nickname username={loan.owner} />
                    </dd>
                  </div>
                  
                  <div>
                    <dt className="text-gray-500">Borrower</dt>
                    <dd className="text-gray-900">
                      <Nickname username={loan.borrower} />
                    </dd>
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
    </div>
  );
}
