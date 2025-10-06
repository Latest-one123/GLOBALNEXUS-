# Global News Network - International News Platform

## Overview

Global News Network is a bilingual (English/Arabic) international news platform built with React, Express, and PostgreSQL. The application provides real-time news updates across multiple categories including world news, politics, technology, sports, and business. The platform features a responsive design inspired by leading international news outlets (BBC, CNN, Reuters, Al Jazeera) with support for RTL languages, breaking news alerts, and a comprehensive content management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing
- **TanStack Query** (React Query) for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library with Radix UI primitives for accessible, composable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Custom design system** based on professional news platforms with defined color palette (dark blue primary, red accents for breaking news)
- Support for light/dark themes with CSS variables
- RTL (Right-to-Left) support for Arabic language

**State Management**
- React Query for server state and caching
- Local component state with React hooks
- Form state managed by React Hook Form with Zod validation

### Backend Architecture

**Server Framework**
- **Express.js** REST API server
- Middleware for JSON parsing, URL encoding, and request logging
- Session-based request tracking with performance monitoring
- Error handling middleware for consistent error responses

**API Design**
- RESTful endpoints for article CRUD operations
- Query parameter-based filtering (category, language, breaking news status)
- Pagination support with limit/offset parameters
- User authentication endpoints (prepared but not fully implemented)

**Development Setup**
- Hot module replacement in development via Vite middleware
- Production build serves static assets from Express
- TypeScript compilation with path aliases for clean imports

### Data Storage Solutions

**Database**
- **PostgreSQL** via Neon serverless driver for scalable cloud database
- **Drizzle ORM** for type-safe database queries and schema management
- Connection pooling through Neon's HTTP-based driver

**Schema Design**
- **Users table**: Authentication with bcrypt password hashing
- **Articles table**: Comprehensive news article storage with fields for:
  - Content (title, summary, full content)
  - Metadata (category, language, author, read time)
  - Engagement metrics (view counts)
  - Status flags (breaking news indicator)
  - Timestamps (published date, last updated)

**Data Validation**
- Zod schemas derived from Drizzle table definitions for runtime validation
- Separate insert and update schemas with appropriate field requirements
- Type inference from schemas for end-to-end type safety

### Authentication & Authorization

**Current Implementation**
- User table structure with username/password authentication
- Bcrypt for password hashing (dependency installed)
- Session infrastructure prepared but not fully connected
- Storage layer includes user lookup methods

**Design Considerations**
- Session-based authentication approach (connect-pg-simple for session store)
- Admin access implied for article management endpoints
- Future implementation would require session middleware and protected routes

### External Dependencies

**Core Services**
- **Neon Database**: Serverless PostgreSQL database hosting
- **Replit Platform**: Development environment integration with runtime error handling and cartographer plugins

**UI Libraries**
- Multiple Radix UI primitives for accessible components (dialogs, dropdowns, tooltips, etc.)
- Lucide React for consistent iconography
- date-fns for date formatting and manipulation

**Development Tools**
- ESBuild for production server bundling
- Drizzle Kit for database migrations
- PostCSS with Autoprefixer for CSS processing

**Asset Management**
- Static image assets stored in attached_assets directory
- Generated placeholder images for news categories and hero sections
- Google Fonts integration (DM Sans, Fira Code, Geist Mono, Architects Daughter)