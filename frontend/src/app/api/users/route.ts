import { API_URL } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const url = `${API_URL}/users`;

  const res = await (await fetch(url, { cache: 'no-cache' })).json();

  return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
  const url = `${API_URL}/users`;

  const { email, name } = await req.json();

  const config: RequestInit = {
    method: 'POST',
    body: JSON.stringify({
      email,
      name,
    }),
    headers: { 'Content-Type': 'application/json' },
  };

  const res = await (await fetch(url, config)).json();

  return NextResponse.json(res);
}
