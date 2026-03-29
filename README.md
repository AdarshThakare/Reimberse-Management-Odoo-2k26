# ReimburseFlow

A modern web application for managing expense reimbursements and approvals. Built with the T3 Stack for type-safe, full-stack development.

## Overview

ReimburseFlow streamlines the expense reimbursement process by providing:
- **Expense Management**: Create, track, and submit expense reports
- **Approval Workflows**: Define custom approval rules and workflows
- **Team Collaboration**: Manage team members and their permissions
- **Multi-Currency Support**: Handle expenses in multiple currencies
- **Dashboard Analytics**: Track expense metrics and approval status

## Tech Stack

This project is built using the [T3 Stack](https://create.t3.gg/):

- **[Next.js](https://nextjs.org)** — React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first CSS framework
- **[Prisma](https://prisma.io)** — Next-generation ORM
- **[NextAuth.js](https://next-auth.js.org)** — Authentication for Next.js
- **[tRPC](https://trpc.io)** — End-to-end typesafe APIs

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main application dashboard
│   │   ├── expenses/      # Expense management
│   │   ├── approvals/     # Approval workflows
│   │   ├── rules/         # Reimbursement rules
│   │   ├── settings/      # Application settings
│   │   └── team/          # Team management
│   └── api/               # API routes
├── server/                # Backend logic
│   ├── api/               # tRPC routers
│   ├── auth/              # NextAuth configuration
│   └── services/          # Business logic services
├── trpc/                  # tRPC client configuration
└── styles/               # Global styles

prisma/
└── schema.prisma         # Database schema

```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A database (PostgreSQL recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd reimbursement-flow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/reimburseflow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers (if using)
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
```

4. Initialize the database:
```bash
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Management

- **Push schema changes**: `npm run db:push`
- **Open Prisma Studio**: `npm run db:studio`
- **Generate Prisma client**: `npm run db:generate`
- **Run migrations**: `npm run db:migrate`

## Features

### Expense Management
- Create and submit expense reports
- Attach receipts and documentation
- Track expense status (draft, submitted, approved, rejected)
- Edit expenses before approval

### Approval Workflows
- Define custom approval rules
- Multi-level approval chains
- Notification system for pending approvals
- Bulk approval/rejection capabilities

### Team Management
- Invite team members
- Assign roles and permissions
- Department management
- User activity tracking

### Reporting & Analytics
- Expense summary dashboard
- Approval metrics
- Currency conversion tracking
- Export capabilities

## API Routes

The application uses tRPC for type-safe API communication. Key routers:

- **`/api/trpc/expense`** — Expense operations (create, read, update, delete)
- **`/api/trpc/approval`** — Approval workflow management
- **`/api/trpc/user`** — User management and authentication
- **`/api/trpc/company`** — Company and team settings
- **`/api/trpc/currency`** — Currency conversion and management

## Authentication

ReimburseFlow uses NextAuth.js for secure authentication:

- Session-based authentication
- Support for multiple OAuth providers
- Automatic session refresh
- API-based custom authentication

## Building for Production

Create an optimized production build:
```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is on [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

### Docker

Build and run with Docker:

```bash
docker build -t reimburse-flow .
docker run -p 3000:3000 reimburse-flow
```

### Environment Variables

Ensure these environment variables are set in your deployment platform:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- OAuth provider secrets (if applicable)

## Development Workflow

### Code Style

- **Linting**: `npm run lint`
- **Formatting**: `npm run format`
- **Type checking**: `npm run type-check`

### Git Hooks

The project uses Husky for Git hooks:
- Pre-commit linting and formatting
- Commit message validation

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify `DATABASE_URL` in `.env.local`
2. Ensure the database service is running
3. Check network connectivity to the database host
4. Run migrations: `npm run db:push`

### Authentication Issues

- Clear browser cookies and cache
- Verify `NEXTAUTH_URL` matches your application URL
- Check `NEXTAUTH_SECRET` is set
- Review NextAuth logs in the console

### Type Errors

Run type checking to catch issues early:
```bash
npm run type-check
```

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/my-feature`
4. Create a Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For questions or issues, please:
- Check existing issues on the repository
- Create a new GitHub issue
- Review the [T3 Stack documentation](https://create.t3.gg/)

## Resources

- [T3 Stack Documentation](https://create.t3.gg/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [tRPC Documentation](https://trpc.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
