import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = await (req as any).json();
    const result: object  =  await new Promise((resolve) => {
        exec(body.command, (error, stdout, stderr) => {
            resolve({ error, stdout, stderr });
        })
    })
    return NextResponse.json({ ...result });
}