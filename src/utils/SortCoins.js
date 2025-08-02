export default function sortCoins(coins, sortBy) {
  return coins.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.current_price - b.current_price;
      case "price-desc":
        return b.current_price - a.current_price;
      case "marketcap-asc":
        return a.market_cap - b.market_cap;
      case "marketcap-desc":
        return b.market_cap - a.market_cap;
      case "change-asc":
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      case "change-desc":
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      default:
        return 0;
    }
  });
}
