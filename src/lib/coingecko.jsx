import axios from 'axios';

export async function fetchCoins({ page = 1, perPage = 50 } = {}) {
  try {
    const res = await axios.get(`/api/coins`, {
      params: { page, perPage },
    });
    return res.data;
  } catch (err) {
    console.error('Failed to fetch coins:', err);
    return [];
  }
}

export async function fetchCoinsByIds(ids = []) {
  try {
    const res = await axios.post('/api/coins-by-ids', { ids });
    return res.data;
  } catch (err) {
    console.error('Failed to fetch by IDs:', err);
    return [];
  }
}

export async function fetchMarketChart(id, days = 7) {
  try {
    const response = await fetch(`/api/market-chart/${id}?days=${days}`);
    const data = await response.json();

    return data.prices.map(([timestamp, price]) => {
      const dateObj = new Date(timestamp);
      return {
        date: days === '1'
          ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : dateObj.toLocaleDateString(),
        price,
      };
    });
  } catch (error) {
    console.error(`Failed to fetch market chart for ${id}:`, error);
    return [];
  }
}


export async function fetchCoinDetails(id) {
  try {
    const res = await axios.get(`/api/coin/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch details for ${id}:`, err);
    return null;
  }
}