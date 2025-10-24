export function buildCreateLoanURL(opts: {
  org: string; 
  repo: string; 
  branch: string;
  year: string; 
  owner: string;
  bookId: string; 
  borrower: string;
  requestedAt: string; 
  until: string;
  itemType?: string;
}) {
  const loanId = `${opts.year}-${opts.requestedAt.replace(/-/g, '')}-${opts.bookId}--${opts.borrower}`;
  const filename = `${opts.requestedAt.replace(/-/g, '')}-0000--${opts.bookId}--${opts.borrower}.yaml`;

  const itemType = opts.itemType || 'book';
  
  const value = [
    `loan_id: ${loanId}`,
    `item_id: ${opts.bookId}`,
    `item_type: ${itemType}`,
    `owner: ${opts.owner}`,
    `borrower: ${opts.borrower}`,
    `status: requested`,
    `requested_at: ${opts.requestedAt}`,
    `approved_at: null`,
    `started_at: null`,
    `until: ${opts.until}`,
    `returned_at: null`,
    `notes: ""`,
    ``
  ].join('\\n');

  const base = `https://github.com/${opts.org}/${opts.repo}/new/${opts.branch}/data/loans/${opts.year}/${opts.owner}`;
  const params = new URLSearchParams({ filename, value });

  return `${base}?${params.toString()}`;
}
