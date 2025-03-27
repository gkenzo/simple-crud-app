import { API_URL } from '@/constants';
import { NextResponse, NextRequest } from 'next/server';

const returnUrl = (id: string) => `${API_URL}/users/${id}`;

export async function GET(
  _: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  const res = await (await fetch(returnUrl(id), { cache: 'no-cache' })).json();

  return NextResponse.json(res);
}

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const body = await req.json();

  const { id } = await props.params;

  const config: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  const res = await (await fetch(returnUrl(id), config)).json();

  return NextResponse.json(res);
}

export async function DELETE(
  _: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;

  const config: RequestInit = {
    method: 'DELETE',
  };

  const res = await fetch(returnUrl(id), config);

  return NextResponse.json(res);
}
