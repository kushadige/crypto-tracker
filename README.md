# Crypto Live Tracker Documentation

## Overview

Crypto Live Tracker is a Next.js application designed to provide real-time tracking and analytics of cryptocurrency data. It leverages various technologies including React, TypeScript, Tailwind CSS, and Axios for fetching data from external APIs.

## Built With

[![Next.js][Next.js]][Next.js-url]
[![Tailwind][Tailwind]][Tailwind-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![npm][npm]][Npm-url]

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A package manager such as npm, yarn, pnpm, or bun.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running one of the following commands based on your package manager:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result. The page auto-updates as you edit the files.

## Project Structure

```
├── app
│   ├── (routes)
│   │   ├── (home)
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── providers.tsx
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components
│   ├── crypto-table
│   │   ├── cells
│   │   │   ├── change-cell.tsx
│   │   │   ├── crypto-cell.tsx
│   │   │   ├── price-cell.tsx
│   │   │   └── sparkline-cell.tsx
│   │   ├── columns
│   │   │   └── table-columns.tsx
│   │   ├── crypto-table.tsx
│   │   └── index.ts
│   └── ui
│       ├── badge.tsx
│       ├── button.tsx
│       ├── command.tsx
│       ├── container.tsx
│       ├── data-table
│       │   ├── data-table-faceted-filter.tsx
│       │   ├── data-table-pagination.tsx
│       │   ├── data-table.tsx
│       │   └── index.ts
│       ├── dialog.tsx
│       ├── popover.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── sparkline.tsx
│       └── table.tsx
├── config
│   └── index.ts
├── hooks
│   ├── useCryptoData.ts
│   ├── useKlinesData.ts
│   └── useTable.ts
├── lib
│   └── tw.ts
├── services
│   └── api.service.ts
└── utils
    ├── formatter.ts
    └── types.ts
```

- `src/`: Source code of the application.
  - `app/`: Next.js pages and API routes.
  - `components/`: Reusable React components.
  - `config/`: Configuration files, including environment variables.
  - `hooks/`: Custom React hooks, e.g., `useCryptoData.ts` for fetching cryptocurrency data.
  - `lib/`: Library code and utilities.
  - `services/`: Services for external API calls, e.g., `api.service.ts` for fetching data from Binance.
  - `utils/`: Utility functions and types, including `types.ts` for type definitions.
  - `types/`: TypeScript type definitions.
- `next.config.mjs`: Next.js configuration file.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.

## Configuration

Environment variables are defined in `.env.local` and referenced in `src/config/index.ts`. These include:

- `NEXT_PUBLIC_BASE_API_URL`: Base URL for the API.
- `NEXT_PUBLIC_BASE_WS_URL`: Base URL for WebSockets.

## Scripts

Defined in `package.json`, these scripts are used for development and production:

- `dev`: Start the development server.
- `build`: Build the application for production.
- `start`: Start the production server.
- `lint`: Lint the codebase using ESLint.

## Deployment

The application is deployed to Vercel using the GitHub repository. Refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more information.

## Contributing

1. Install `ESLint` and `Prettier` extensions in VS Code

2. Create a new branch

```
git checkout -b new-feature
```

3. Make changes to the code, test your changes and commit your changes

```
git commit -m "new-feature"
```

4. Push your changes to the remote branch

```
git push -u origin new-feature
```

5. Create a pull request on GitHub.

## Dependencies

- [next.js](https://www.npmjs.com/package/next)
- [typescript](https://www.npmjs.com/package/typescript)
- [shadcn-ui](https://www.npmjs.com/package/shadcn-ui)
- [tailwindcss](https://www.npmjs.com/package/tailwindcss)
- [axios](https://www.npmjs.com/package/axios)
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)
- [@tanstack/react-table](https://www.npmjs.com/package/@tanstack/react-table)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [jest](https://www.npmjs.com/package/jest)
- [testing-library](https://www.npmjs.com/package/@testing-library/react)
- [ts-jest](https://www.npmjs.com/package/ts-jest)
- [ts-node](https://www.npmjs.com/package/ts-node)

## Contact

- Oğuzhan Kuşlar - [@kushadige](https://github.com/kushadige) - oguzhankuslar@gmail.com

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next.js-url]: https://nextjs.org/docs
[Npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[Npm-url]: https://www.npmjs.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Tailwind]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
