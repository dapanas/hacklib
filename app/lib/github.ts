export function buildCreateLoanURL(opts: {
  org: string; 
  repo: string; 
  branch?: string;
  year: string; 
  owner: string;
  bookId: string; 
  borrower: string;
  requestedAt: string; 
  until: string;
}) {
  const branch = opts.branch ?? 'main';
  const loanId = `${opts.year}-${opts.requestedAt.replace(/-/g, '')}-${opts.bookId}--${opts.borrower}`;
  const filename = `${opts.requestedAt.replace(/-/g, '')}-0000--${opts.bookId}--${opts.borrower}.yaml`;

  const value = [
    `loan_id: ${loanId}`,
    `book_id: ${opts.bookId}`,
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

  const base = `https://github.com/${opts.org}/${opts.repo}/new/${branch}/data/loans/${opts.year}/${opts.owner}`;
  const params = new URLSearchParams({ filename, value });

  return `${base}?${params.toString()}`;
}
