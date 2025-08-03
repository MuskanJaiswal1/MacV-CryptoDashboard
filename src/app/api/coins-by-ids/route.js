import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

export async function POST(req) {
  const { ids } = await req.json();

  if (!ids || ids.length === 0) return NextResponse.json([]);

  const url = `${BASE_URL}?vs_currency=usd&ids=${ids.join(',')}&x_cg_demo_api_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}