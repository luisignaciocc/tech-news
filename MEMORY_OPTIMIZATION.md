# Memory Optimization Guide

This server has limited RAM (~957MB). Follow these guidelines to keep memory usage low.

## ⚠️ IMPORTANT: Building on Low-Memory Servers

**This server does NOT have enough RAM to run `pnpm build`** even with 4GB swap.

### Recommended Solution: Build Elsewhere

1. **Option A: Build on your local machine**
   ```bash
   # On your local machine
   git pull
   pnpm install
   pnpm build

   # Deploy .next folder to server
   rsync -avz .next/ user@server:/path/to/tech-news/.next/
   ```

2. **Option B: Use GitHub Actions / CI/CD**
   - Build in GitHub Actions with more memory
   - Deploy the built `.next` folder to your server
   - See `.github/workflows` for setup

3. **Option C: Build on a larger temporary server**
   - Spin up a larger VPS temporarily
   - Build the project
   - Copy `.next` folder to your small server

## Applied Optimizations

✅ Increased swap to 4GB (from 2GB)
✅ Cleared .next/cache (saved ~600MB)
✅ Cleared ~/.cache (saved ~783MB)
✅ Pruned pnpm store

## Current Disk Usage

- Total project: ~2.8GB
- node_modules: ~1.2GB (all dependencies - needed for build)
- .next: ~1GB (build output)

## Maintenance Commands

### 1. Clear Next.js cache (run monthly)
```bash
rm -rf .next/cache
```

### 2. Clear system caches (run weekly)
```bash
rm -rf ~/.cache/*
pnpm store prune
```

### 3. If you need to reinstall dependencies
```bash
rm -rf node_modules
pnpm install --prod
npx prisma generate
```

## PM2 Memory Configuration

When starting the app with PM2, limit memory usage:

```bash
pm2 start "pnpm start" \
  --name tech-news \
  --max-memory-restart 400M \
  --node-args="--max-old-space-size=384"
```

This will:
- Restart the app if it exceeds 400MB
- Limit Node.js heap to 384MB

## Optional: Remove Unnecessary Features

If still experiencing memory issues, consider removing:

### Option 1: Remove Storybook (saves ~150MB)
```bash
pnpm remove @storybook/nextjs @storybook/react @storybook/addon-* @chromatic-com/storybook storybook
rm -rf .storybook
```

### Option 2: Remove Cypress (saves ~100MB)
```bash
pnpm remove cypress
rm -rf cypress cypress.config.ts
```

### Option 3: Remove Testing (saves ~80MB)
**⚠️ Only if you don't run tests in production**
```bash
pnpm remove jest @testing-library/* jest-* ts-jest
rm -rf jest.config.ts singleton.ts
```

## Monitor Memory Usage

```bash
# Check current memory
free -h

# Monitor PM2 processes
pm2 monit

# Check process memory
pm2 list
```

## Build Optimization

To reduce build memory usage, build with limited resources:

```bash
NODE_OPTIONS="--max-old-space-size=512" pnpm build
```

## Increase Swap (if needed)

If still having issues, increase swap space:

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Make it permanent:
```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
