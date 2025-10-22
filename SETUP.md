# HackLib Setup Guide

This guide will help you set up HackLib with GitHub OAuth authentication.

## Prerequisites

- Node.js 18+ installed
- A GitHub account
- A GitHub repository for your book data

## 1. Install Dependencies

```bash
npm install
```

## 2. Create GitHub OAuth App

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: HackLib
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

## 3. Environment Variables

Create a `.env.local` file in the project root:

```env
# GitHub OAuth App Credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# GitHub Repository Configuration
NEXT_PUBLIC_GH_ORG=your-org-or-user
NEXT_PUBLIC_GH_REPO=hacklib
NEXT_PUBLIC_DEFAULT_BORROWER=your-github-handle
```

### Generating NEXTAUTH_SECRET

You can generate a secure secret using:

```bash
openssl rand -base64 32
```

Or use an online generator like [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

## 4. Development

```bash
npm run dev
```

Visit `http://localhost:3000` and you should see the sign-in button in the header.

## 5. Production Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel dashboard
4. Update the GitHub OAuth App callback URL to your production domain
5. Deploy!

## Troubleshooting

### "Invalid redirect URI" Error
- Make sure the callback URL in your GitHub OAuth App matches exactly: `https://yourdomain.com/api/auth/callback/github`

### "NEXTAUTH_SECRET is not set" Error
- Make sure you've set the `NEXTAUTH_SECRET` environment variable

### Authentication not working
- Check that `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are correct
- Verify the callback URL is properly configured

## Features

Once set up, users can:
- Sign in with their GitHub account
- See their GitHub username in loan requests
- View their personal loan history
- Have their GitHub handle auto-populated in PR creation

## Manual Workflow

Even with authentication, the core workflow remains manual:
1. Users browse books on the website
2. Click "Request Loan" to create a GitHub PR
3. Book owners review and approve/reject via GitHub
4. Status updates automatically based on YAML files

The authentication just makes the experience more personalized!
