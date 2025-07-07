# CRM Pro - Web-Based Customer Relationship Management System

## Overview

CRM Pro is a full-stack web application built for managing customer relationships, machines, and reminders. The application provides a comprehensive dashboard for tracking clients, their associated machines, contacts, and important reminders with an intuitive user interface.

## System Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript for type safety
- **API Design**: RESTful API with JSON responses
- **Middleware**: Custom logging and error handling
- **Development**: Hot module replacement with Vite integration

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe database schema with Zod integration
- **Migrations**: Database migrations handled by Drizzle Kit
- **Connection**: Neon Database serverless connection

## Key Components

### Database Schema
The system uses four main entities:
- **Clients**: Core customer information with industry and status tracking
- **Contacts**: Multiple contacts per client with position and communication details
- **Machines**: Equipment tracking with warranty, AMC, and insurance status
- **Reminders**: Task and follow-up management with overdue tracking

### API Endpoints
- **Client Management**: CRUD operations for clients with detailed views
- **Contact Management**: Associated contacts per client
- **Machine Management**: Equipment tracking and maintenance schedules
- **Reminder System**: Overdue and upcoming reminder management

### UI Components
- **Dashboard**: Overview with stats cards and reminder sections
- **Client List**: Searchable and filterable client directory
- **Modal System**: Add/edit forms for all entities
- **Responsive Design**: Mobile-friendly interface with sidebar navigation

## Data Flow

1. **Client Interaction**: User interacts with React components
2. **API Communication**: TanStack Query handles API requests with caching
3. **Server Processing**: Express.js processes requests and validates data
4. **Database Operations**: Drizzle ORM executes type-safe database queries
5. **Response Handling**: JSON responses with proper error handling
6. **UI Updates**: React components update based on server state

## External Dependencies

### Frontend Dependencies
- **UI Library**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **Form Validation**: React Hook Form with Zod resolvers

### Backend Dependencies
- **Database**: Neon Database for serverless PostgreSQL
- **Session Management**: PostgreSQL session store
- **Development Tools**: tsx for TypeScript execution

### Build Tools
- **Bundling**: Vite for frontend, esbuild for backend
- **Development**: Replit-specific plugins for integration
- **Styling**: PostCSS with Tailwind CSS processing

## Deployment Strategy

The application is designed for Replit deployment with:
- **Development Mode**: Vite dev server with HMR
- **Production Build**: Static frontend with Express.js API server
- **Database**: External PostgreSQL via environment variables
- **Session Storage**: PostgreSQL-backed sessions for scalability

The build process creates:
- Frontend assets in `dist/public`
- Backend bundle in `dist/index.js`
- Database migrations in `migrations/`

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 07, 2025. Initial setup