import { getAllLoans } from "./data";

const ACTIVE = new Set(["requested", "approved", "ongoing"]);

export async function getAvailability(bookId: string) {
  const loans = await getAllLoans();
  const active = loans
    .filter((l: any) => l.book_id === bookId && ACTIVE.has(l.status))
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
