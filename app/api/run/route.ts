import { exec } from 'child_process';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const body = await (req as any).json();
    const result: Object  =  await new Promise((resolve, reject) => {
        exec(body.command, (error, stdout, stderr) => {
            resolve({ error, stdout, stderr });
        })
    })
    return NextResponse.json({ ...result });
}