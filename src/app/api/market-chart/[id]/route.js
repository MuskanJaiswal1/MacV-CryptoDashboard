export async function GET(req, context) {
  const { id } = await context.params; 
  const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

  const { searchParams } = new URL(req.url);
  const days = searchParams.get("days") || "1";

  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Error fetching market chart", { status: 500 });
  }
}
