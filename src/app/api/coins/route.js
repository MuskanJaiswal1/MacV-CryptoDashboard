import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const per_page = searchParams.get('perPage') || '50';

  const url = `${BASE_URL}?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false&x_cg_demo_api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}