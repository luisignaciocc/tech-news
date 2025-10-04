# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an automated tech news blog built with Next.js that fetches, processes, classifies, and publishes tech news articles. The system uses:

- **Brave Search API** for article discovery (2,000 monthly requests in free tier)
- **Mozilla Readability** for content parsing
- **OpenAI Embeddings** for content classification and vectorization
- **Telegram Bot** for manual approval workflow
- **Multi-platform publishing** to blog, Twitter, LinkedIn, Instagram, and Facebook

## Development Commands

### Core Development

```bash
pnpm dev              # Start development server on http://localhost:3000
pnpm build            # Build production bundle
pnpm start            # Start production server
```

### Code Quality

```bash
pnpm lint             # Run ESLint with auto-fix
pnpm format           # Format code with Prettier and Prisma
pnpm type-check       # TypeScript type checking
```

### Testing

```bash
pnpm test             # Run Jest tests
pnpm test:watch       # Run Jest in watch mode
pnpm test:coverage    # Generate coverage report (saved to public/coverage)
pnpm coverage:server  # Serve coverage report on http-server

pnpm cypress:open     # Open Cypress interactive mode
pnpm cypress:run      # Run Cypress tests headless
```

### Database (Prisma)

```bash
pnpm prisma:generate        # Generate Prisma client after schema changes
pnpm prisma:migrate         # Create and apply migration (dev)
npx prisma migrate dev --name <migration_name>  # Create named migration
npx prisma generate         # Apply production migrations
```

### Storybook

```bash
pnpm storybook         # Start Storybook on port 6006
pnpm build-storybook   # Build static Storybook
```

### Production Process Management (PM2)

```bash
# Start with memory limits (recommended for low-memory servers)
pm2 start "pnpm start" --name tech-news --max-memory-restart 400M --node-args="--max-old-space-size=384"

pm2 list                                 # List running processes
pm2 logs tech-news                       # View application logs
pm2 restart tech-news                    # Restart application
pm2 stop tech-news                       # Stop application
pm2 delete tech-news                     # Remove from PM2
pm2 monit                                # Monitor resources
pm2 save                                 # Save current process list
pm2 startup                              # Generate startup script
```

### Memory Optimization (Low-RAM Server)

```bash
# Clear Next.js cache
rm -rf .next/cache

# Clear system caches
rm -rf ~/.cache/*
pnpm store prune

# Reinstall production-only dependencies (saves ~300MB)
rm -rf node_modules
pnpm install --prod
npx prisma generate

# Build with memory limits
NODE_OPTIONS="--max-old-space-size=512" pnpm build
```

See `MEMORY_OPTIMIZATION.md` for detailed memory management strategies.

## Architecture

### News Processing Pipeline

The automated news pipeline follows this workflow:

1. **Pull** (`/api/news/pull/brave` or `/api/news/pull/google-news`)

   - Fetches news from sources using Brave Search or Google News RSS
   - Stores raw news in `News` table with `parsed: false`
   - Sources managed via `NewsSource` table with rotation based on `lastUpdateAt`

2. **Parse** (`/api/news/parse`)

   - Uses Mozilla Readability to extract article content
   - Updates `News` with `body`, `byline`, `excerpt`, etc.
   - Sets `parsed: true`

3. **Embed** (`/api/news/embed`)

   - Generates OpenAI embeddings (vector(1536)) for article classification
   - Stores in PostgreSQL using pgvector extension
   - Sets `vectorized: true`

4. **Filter** (`/api/news/filter`)

   - Classifies news using vector similarity
   - Marks irrelevant content for deletion
   - Sets `filtered: true`

5. **Get Image** (`/api/news/get-image`)

   - Uploads images to Cloudinary
   - Updates `coverImage` field

6. **Approval** (Telegram bot workflow)

   - Sends filtered news to Telegram for manual approval
   - Updates `sentToApproval: true`
   - Admin approves/rejects via Telegram callback buttons

7. **Publication** (`/api/publication/*`)
   - Blog: Creates `Post` from approved `News`
   - Social: Posts to Twitter, LinkedIn, Instagram, Facebook
   - Tracks publication status with `postedTo*` fields

### Key Database Models

- **News**: Raw news articles with parsing/vectorization status
- **Post**: Published blog posts (linked to News via `newId`)
- **Languages**: i18n content for posts (es/en)
- **Tag**: Categorization with bilingual names
- **NewsSource**: Managed news sources with activity status
- **Author**: Blog post authors

### App Structure

- **`/[locale]`**: Public blog (Spanish/English via next-intl)

  - `/posts/[slug]`: Individual post pages
  - `/record`: Post listing/pagination

- **`/admin`**: Protected admin area (NextAuth)

  - `/dashboard`: Analytics and stats
  - `/validation`: News approval interface (parallel routes: @notaproved, @deleted)
  - `/posts`: Post management
  - `/sources`: NewsSource CRUD

- **`/api`**: API routes
  - `/news/*`: News processing endpoints
  - `/publication/*`: Publishing endpoints
  - `/webhooks/*`: External integrations (Telegram)

### Internationalization

- Supported locales: `es` (default), `en`
- Uses `next-intl` with routing configuration in `src/i18n/routing.ts`
- Database localization via `Languages` model
- Tags have `nameEs` and `nameEn` fields

### Import Aliases

- `@/*` maps to `src/*` (configured in tsconfig.json)

## Testing Strategy

- **Jest**: Unit/integration tests with React Testing Library
- **Cypress**: E2E tests (baseUrl: http://localhost:3000)
- **Coverage**: Reports saved to `public/coverage` (accessible via /coverage redirect)
- **Singleton pattern**: Database/service mocks in `singleton.ts`

## Git Hooks (Husky)

- **pre-commit**: Runs `pnpm format` (Prettier + Prisma format)
- **pre-push**: Not currently configured

## API Authentication

All `/api/news/*` and `/api/publication/*` endpoints require:

```
x-api-key: <API_KEY from .env>
```

## Environment Variables

Key variables (see README for full list):

- Database: `DATABASE_URL`, `DATABASE_URL_UNPOOLED` (PostgreSQL with pgvector)
- OpenAI: `OPENAI_API_KEY`
- Cloudinary: `CLOUDINARY_*`
- Brave: `BRAVE_SEARCH_API_KEY`
- Telegram: `TELEGRAM_BOT_TOKEN`
- NextAuth: `NEXTAUTH_SECRET`
- API: `API_KEY` (internal API authentication)

## UI Components

- **shadcn/ui**: Component library in `src/components/ui`
- **Radix UI**: Headless primitives
- **Tailwind CSS**: Styling with custom config
- **Recharts**: Data visualization in dashboard

## Production Deployment

This project is deployed using:

- **PM2**: Process manager for Node.js applications

  - Manages application lifecycle and auto-restart on crashes
  - Enables zero-downtime deployments
  - Provides log management and monitoring

- **Nginx**: Reverse proxy server

  - Handles incoming HTTP/HTTPS requests
  - Proxies traffic to the Next.js application
  - Serves static assets and handles SSL termination

- **Let's Encrypt**: SSL/TLS certificate management
  - Provides free SSL certificates
  - Automatic certificate renewal via certbot
  - Ensures HTTPS encryption for all traffic

## Important Notes

- PostgreSQL must have `pgvector` extension enabled
- Brave API limited to 2,000 requests/month (1 req/sec)
- News approval requires Telegram bot setup
- Social media publishing requires OAuth tokens (stored in .env)
- TypeScript strict mode enabled
- ESLint enforces import sorting and unused import removal
- Production server managed by PM2 with Nginx reverse proxy and Let's Encrypt SSL
