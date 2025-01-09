import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const headersList = await headers()
  const keysArray = Array.from(headersList.keys()).sort()
  return NextResponse.json({ message: "Server received GET request!", reqHeaders: keysArray.map(header => ({ name: header, value: headersList.get(header) })) });
}

export async function POST() {
  const headersList = await headers()
  const keysArray = Array.from(headersList.keys()).sort()
  return NextResponse.json({ message: "Server received POST request!", reqHeaders: keysArray.map(header => ({ name: header, value: headersList.get(header) })) });
}