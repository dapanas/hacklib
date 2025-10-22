# HackLib — Modern Book Lending System

A modern, minimalist book lending system where **GitHub is the database**, **YAML is the state**, and **PRs are the workflow**. Features GitHub OAuth authentication, glass-morphism UI, and automated validation. Deployed on **Vercel** with **Next.js 15**.

## Quickstart

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev` → open http://localhost:3000
4. Sign in with GitHub to access personalized features
5. Browse books at `/books` and request loans
6. See [SETUP.md](./SETUP.md) for GitHub OAuth configuration

## Environment Variables

### Required for GitHub OAuth
```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

### Public Variables (Vercel)
```env
NEXT_PUBLIC_GH_ORG=your-org-or-user
NEXT_PUBLIC_GH_REPO=hacklib
NEXT_PUBLIC_DEFAULT_BORROWER=your-github-handle
```

See [SETUP.md](./SETUP.md) for detailed configuration instructions.

## How It Works

### Authentication
- Sign in with your GitHub account
- Your username is automatically used in loan requests
- View your personal loan history at `/my-loans`

### Requesting a Loan

1. Browse books at `/books`
2. Click on a book to view details
3. Click "Request Loan" button (requires GitHub sign-in)
4. This opens GitHub with a pre-filled YAML file using your username
5. Create a Pull Request
6. The book owner will review and approve/reject
7. Once approved, the loan status updates automatically

### How to Add Your Books

1. Create a new file: `data/libraries/your-github-handle.yaml`
2. Follow the schema in `schemas/library.schema.json`
3. Add your books with unique IDs
4. Create a PR to add your library

## Project Structure

```
/hacklib
├── app/                    # Next.js app
│   ├── api/               # API routes (auth, revalidate)
│   ├── book/              # Book detail pages
│   ├── books/             # Books catalog page
│   ├── components/        # React components
│   ├── lib/               # Data access and utilities
│   ├── my-loans/          # User loan history
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── data/
│   ├── libraries/         # Member libraries (YAML)
│   └── loans/            # Loan requests (YAML)
├── schemas/              # JSON schemas for validation
├── scripts/              # Validation scripts
├── .github/              # CI/CD and templates
├── auth.ts               # NextAuth configuration
└── env.example           # Environment variables template
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Validate data
npm run validate

# Build for production
npm run build
```

## Features

- 🔐 **GitHub OAuth**: Sign in with your GitHub account
- 📚 **Book Catalog**: Browse all available books with modern UI
- 🔄 **Loan Management**: Request and track loans via GitHub PRs
- 👤 **Personalization**: View your loan history and auto-populated requests
- ✅ **Validation**: Automatic schema validation via CI
- 👥 **Community**: Each member manages their own library
- 🎨 **Modern Design**: Glass-morphism UI with Tailwind CSS
- 📱 **Responsive**: Works on all devices
