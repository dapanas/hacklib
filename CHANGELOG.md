# Changelog

All notable changes to HackLib will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2025-10-23

### Added
- Hidden terminal mode

## [1.4.0] - 2025-10-22

### Added
- Configurable PR target branch via NEXT_PUBLIC_GH_PR_BRANCH environment variable
- Default branch configuration in env.example

### Changed
- PR creation now uses configurable branch instead of hardcoded 'main'

## [1.3.1] - 2025-10-22

### Fixed
- Validation script failing due to AJV draft 2020-12 schema loading error
- Date format issues in YAML files causing schema validation failures
- Missing ajv-formats dependency for proper format validation

### Technical
- Added ajv-formats package for enhanced schema validation
- Modified validation script to handle schema loading properly
- Fixed date field formatting in example data files

## [1.3.0] - 2025-10-22

### Added
- Clickable book titles in BookCard component for improved navigation
- Reusable Nickname component for consistent GitHub profile linking
- GitHub profile links for all username displays across the application

### Changed
- Enhanced user experience with clickable book titles

### Technical
- Created modular Nickname component for reusability
- Updated BookCard, StatusBadge, UserMenu, and loan pages
- Implemented proper target="_blank" and rel="noopener noreferrer" attributes

## [1.2.1] - 2025-10-22

### Changed
- Improved copy consistency by changing "lending system" to "book lending system"
- Updated footer to "HackLab Oriente community project"
- Cleaned up footer design by removing redundant text

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
