# 10PM Nuxt Site Boilerplate

**To get started add .env and .env.development vars:**

-   KIRBY_BASE_URL (Base path to the kirby cms, excluding 'panel', 'api', etc)
-   KIRBY_API_USERNAME (API user username)
-   KIRBY_API_PASSWORD (API user password)
-   APP_SSG (true for production, false for development)
-   KIRBY_CLIENT_URL= (OPTIONAL. Base path for testing preview, can be same as base url above)

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
