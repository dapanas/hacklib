import { getAllLoans } from "./data";
import { ItemType } from "./itemTypes";

const ACTIVE = new Set(["requested", "approved", "ongoing"]);

export async function getAvailability(itemId: string, itemType?: ItemType) {
  const loans = await getAllLoans();
  const active = loans
    .filter((l: any) => {
      // Check if loan matches the item
      const matchesItem = l.item_id === itemId;
      
      // If itemType is provided, also check item_type
      if (itemType) {
        return matchesItem && l.item_type === itemType && ACTIVE.has(l.status);
      }
      
      // For backward compatibility, check both old and new schema
      return (matchesItem || l.book_id === itemId) && ACTIVE.has(l.status);
    })
    .sort((a: any, b: any) => String(a.requested_at).localeCompare(String(b.requested_at)))
    .at(-1);
    
  if (!active) return { available: true as const };
  return { 
    available: false as const, 
    borrower: active.borrower, 
    until: active.until,
    status: active.status
  };
}

// Backward compatibility function
export async function getBookAvailability(bookId: string) {
  return getAvailability(bookId, 'book');
}
