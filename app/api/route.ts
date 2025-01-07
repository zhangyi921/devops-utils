import type { NextApiRequest, NextApiResponse } from 'next'
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
 
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const headersList = await headers()
  const keysArray = Array.from(headersList.keys()).sort()
  return NextResponse.json({ message: "Server received GET request!", headers: keysArray.map(header => ({ name: header, value: headersList.get(header) })) });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const headersList = await headers()
  const keysArray = Array.from(headersList.keys()).sort()
  return NextResponse.json({ message: "Server received POST request!", headers: keysArray.map(header => ({ name: header, value: headersList.get(header) })) });
}