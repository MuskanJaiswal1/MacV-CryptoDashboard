# MacV Crypto Dashboard 

A sleek and modular **cryptocurrency tracking web app** built with **Next.js**, designed to display real-time market data, individual coin stats, and manage a personalized watchlist.

---

## Features

### Home Page - Coin Listings
- Fetches top cryptocurrencies from CoinGecko API.
- Displays:
  - Coin name, symbol, price, market cap, 24h change.
- Fully responsive, optimized for all screen sizes.
- Sorting functionality (e.g., by price, market cap, etc.).
- Search bar to filter coins by name or symbol.
- Modular components like `CoinRow` and `CoinCard`.

### Coin Details Page
- Dynamic route: `/coin/:id`
- Shows:
  - Real-time price, 24h/7d change, volume, rank, etc.
  - Market trend chart (last 7 days).
- Chart built using `recharts` for clear visual insights.
- Navigation to/from home via card click.

### Watchlist Page
- Add or remove coins from a personal watchlist using `localStorage`.
- Accessible from the navbar.
- Coins persist across sessions.
- Displays all key coin stats in a grid.

### State Management
- Used **Zustand** for global state (sort/filter/search preferences).
- Local state for components where appropriate.
- Clear separation of concerns in logic and UI.

### Performance & Best Practices
- Followed Next.js App Router structure.
- Used server and client components appropriately.
- Minimal JavaScript bundle size — no unnecessary `"use client"` usage.
- Components optimized for reusability and minimal rerenders.

### UI/UX
- Built with **Tailwind CSS**.
- Consistent styling with dark theme across all pages.
- Responsiveness maintained across.

---

## Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **API**: [CoinGecko Public API](https://www.coingecko.com/en/api)
- **Deployment**: Vercel

---

## Getting Started

### 1️. Clone the Repository

```bash
git clone https://github.com/MuskanJaiswal1/macv-crypto-dashboard.git
cd macv-crypto-dashboard
```

### 2️. Install Dependencies

```bash
npm install
```

### 3️. Start the Development Server

```bash
npm run dev
```

### 4️. Open the App

Visit `http://localhost:3000` in your browser.

---

## Project Structure

```
macv-crypto-dashboard/
├── app/
│   ├── page.jsx                # Homepage (coin listings)
│   ├── coin/
│   │   └── [id]/page.jsx       # Coin detail page
│   └── watchlist/page.jsx      # Watchlist page
├── components/
│   ├── CoinCard.jsx            # Reusable coin tile
│   ├── CoinRow.jsx             # Reusable coin row
│   ├── WatchButton.jsx         # Add/remove from watchlist
│   ├── CoinStats.jsx           # Stats display component
│   ├── CoinChart.jsx           # 7-day line chart
│   └── layout/
│       └── Navbar.jsx          # Top navigation
├── lib/
│   └── coingecko.js            # API logic (axios wrapper)
├── store/
│   ├── SearchStore.js          # Zustand store for search
│   └── SortStore.js            # Zustand store for sorting
├── public/                     # Static assets
├── styles/                     # Global styles (Tailwind)
└── README.md
```

---
