## Request Type
- [ ] New loan request
- [ ] Loan status update (approve/ongoing/return/reject)
- [ ] New library/book addition
- [ ] Other

## Context
- **Book ID**: `{book_id}`
- **Borrower**: `@{borrower_handle}`
- **Owner**: `@{owner_handle}`
- **Requested Date**: `{requested_date}`
- **Due Date**: `{due_date}`

## Checklist
- [ ] The file is under the correct `data/loans/<year>/<owner>/` directory
- [ ] Only one active loan exists for this `book_id`
- [ ] All dates are valid and in `YYYY-MM-DD` format
- [ ] The book exists in the owner's library
- [ ] The loan follows the correct naming convention: `YYYYMMDD-HHMM--book-id--borrower.yaml`

## Additional Notes
<!-- Add any additional context or notes here -->

## Testing
- [ ] Validation script passes: `npm run validate`
- [ ] No duplicate active loans for the same book
- [ ] All required fields are present and valid
