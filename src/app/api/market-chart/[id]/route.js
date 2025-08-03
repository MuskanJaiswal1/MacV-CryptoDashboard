export async function GET(req, context) {
  try {
    const id = context?.params?.id;

    if (!id) {
      return new Response("Missing coin ID", { status: 400 });
    }

    const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
    const { searchParams } = new URL(req.url);
    const days = searchParams.get("days") || "1";

    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      console.error(`CoinGecko error for /market-chart/${id}:`, res.statusText);
      return new Response(JSON.stringify({}), { status: res.status });
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error in /api/market-chart/[id]:", error);
    return new Response(JSON.stringify({}), { status: 500 });
  }
}