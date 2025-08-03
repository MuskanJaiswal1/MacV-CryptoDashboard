# MacV Crypto Dashboard 

A sleek and modular **cryptocurrency tracking web app** built with **Next.js**, designed to display real-time market data, individual coin stats, and manage a personalized watchlist.

Deployed link: https://mac-v-crypto-dashboard.vercel.app/

---

## Features

### Home Page - Coin Listings
- Fetches top cryptocurrencies from CoinGecko API.
- Displays:
  - Coin name, symbol, price, market cap, 24h change.
- Fully responsive, optimized for all screen sizes.
- Sorting functionality (e.g., by price, market cap, etc.).
- Search bar to filter coins.
- Modular components like `CoinRow` and `CoinCard`.
- Pagination support

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
- **Axios** – API data fetching
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **API**: [CoinGecko Public API](https://www.coingecko.com/en/api)
- **Deployment**: Vercel

---

## Project Structure

```
macv-crypto-dashboard/
src/
├── app/
│ ├── api/ # API routes (CoinGecko proxy)
│ │ ├── coins, market-chart/[id], coin/[id], etc.
│ ├── page.jsx # Homepage (SSR + ClientPage)
│ ├── watchlist/ # Watchlist page
│ └── coin/[id]/ # Dynamic coin detail page
│
├── components/ # UI and logic components
│ ├── coin/ # CoinChart, CoinRow, CoinStats, WatchButton
│ ├── ui/ # Pagination, SortBox, SearchBar
│ └── skeleton/ # Loading skeletons
│
├── lib/ # Modular API service
│ └── coingecko.js
│
├── store/ # Zustand stores
│ ├── WatchlistStore.js
│ ├── SearchStore.js
│ └── SortStore.js
│
└── styles/ # Tailwind styles
└── README.md
```

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
# 3. Add .env file

```bash
touch .env.local 
# COINGECKO_API_KEY=your_coingecko_key_here
```
### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the App

Visit `http://localhost:3000` in your browser.

---

## Future improvements
User authentication + backend persistence for watchlist
Better error handling (fallback UI + retry mechanism)
Advanced chart view (candlesticks, indicators)