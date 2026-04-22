# Together Dashboard

React + Vite + TypeScript admin dashboard for the Together outdoor activity platform.

## Tech Stack

- **Framework**: React 18 + Vite 5 + TypeScript
- **Styling**: Tailwind CSS v3 + shadcn/ui components
- **Routing**: React Router v6
- **State**: Zustand (persisted auth)
- **Data Fetching**: TanStack Query (React Query v5)
- **HTTP**: Axios with JWT interceptor (auto-refresh on 401)
- **i18n**: react-i18next (EN / RU / UZ)
- **Icons**: Lucide React
- **Charts**: Recharts

## Setup

```bash
# Install dependencies
pnpm install

# Copy env
cp .env.example .env
# Set VITE_API_URL to your backend URL

# Start dev server
pnpm dev
```

## Routes

| Path | Page | Auth Required |
|------|------|---------------|
| `/login` | Login | No |
| `/events` | Events Management | Yes |
| `/users` | Users Management | Yes |
| `/reviews` | Reviews Moderation | Yes |
| `/analytics` | Analytics Overview | Yes |

## Design Tokens

- Background: `#111118` (HSL: 240 8% 7%)
- Card: `#1C1C24` (HSL: 240 8% 12%)
- Accent/Brand: `#C17B3F` (warm orange)
- Text: `#F0EFE9`
- Border radius: 18px cards
- Font: Plus Jakarta Sans
