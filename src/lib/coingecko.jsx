import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

const coingeckoAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    x_cg_demo_api_key: API_KEY,
  },
});

export async function fetchCoins({ page = 1, perPage = 50 } = {}) {
  try {
    const response = await coingeckoAPI.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch coins:', error);
    return [];
  }
}

export async function fetchCoinsByIds(ids = []) {
  if (ids.length === 0) return [];
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: ids.join(','),
        x_cg_demo_api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch coins by IDs:', error);
    return [];
  }
}

export async function fetchMarketChart(id, days = 7) {
  try {
    const interval = days === '1' ? 'hourly' : 'daily';
    const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days,
        interval,
        x_cg_demo_api_key: API_KEY,
      },
    });

     return response.data.prices.map(([timestamp, price]) => {
      const dateObj = new Date(timestamp);
      return {
        date: days === '1'
          ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // hourly for 24h
          : dateObj.toLocaleDateString(), // daily for 7d, 30d etc.
        price,
      };
    });
  } catch (error) {
    console.error(`Failed to fetch market chart for ${id}:`, error);
    return [];
  }
}

// fetchcoinById
export async function fetchCoinDetails(id) {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
        x_cg_demo_api_key: API_KEY,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Failed to fetch details for ${id}:`, error)
    return null
  }
}