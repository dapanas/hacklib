# Changelog

All notable changes to HackLib will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-10-22

### Added
- Responsive hamburger menu for mobile navigation
- Smooth opening/closing animations for mobile menu

### Changed
- Extracted header into separate client component
- Improved mobile navigation UX with proper touch interactions
- Enhanced accessibility with proper ARIA labels

### Fixed
- Horizontal scrolling issues on mobile devices
- Mobile navigation not working properly on small screens

### Technical
- Implemented proper CSS transitions for mobile menu states
- Added pointer-events management for better interaction handling
- Improved component architecture with client/server component separation

## [1.1.0] - 2025-10-22

### Added
- Colored accent strips for book status indicators
- Utility function for automatic Date object conversion
- Enhanced visual feedback with box shadows on cards
- Improved responsive container constraints across all pages

### Changed
- Redesigned BookCard with minimalist glass-morphism aesthetic
- Replaced floating status badges with colored bottom border indicators
- Updated status display to show "Available" or "Borrowed" text
- Improved layout consistency with proper padding and margins
- Removed ISBN field from book schema and display logic

### Fixed
- React rendering errors caused by Date objects in YAML data
- Inconsistent card heights in grid layouts
- Missing visual separation between UI elements

### Technical
- Enhanced error handling for missing data files
- Improved TypeScript type safety for date handling

## [1.0.0] - 2025-10-21

### Added
- Modern glass-morphism UI with minimalist design
- GitHub OAuth authentication via NextAuth.js
- Book catalog with search and filtering
- Loan request system via GitHub Pull Requests
- YAML-based data storage with JSON schema validation
- Automated CI/CD workflows
- Comprehensive setup documentation

### Features
- 📚 Browse books from community members
- 🔐 Sign in with GitHub
- 🔄 Request loans via PR workflow
- ✅ Automatic YAML validation
- 👥 Multi-user support with personalization
- 🎨 Responsive design for all devices

### Technical
- Next.js 15.5.6 with React 19.2.0
- TypeScript 5.9.3
- Tailwind CSS 3.4.18
- NextAuth.js v5 (beta.29)
