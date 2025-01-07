import type { NextApiRequest, NextApiResponse } from 'next'
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { connect } from 'net'
// export function GET(req: NextApiRequest, res: NextApiResponse) {
//     return NextResponse.json({ message: "Server received GET request!" });
// }

export type ConnectionTestPayload = {
    protocol: "http";
    target: string;
    method: "GET" | "POST";
    headers?: { [key: string]: string };
    body?: Object;
}
    | {
        protocol: "tcp";
        target: string;
        port: number;
    }

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body: ConnectionTestPayload = await (req as any).json();
        switch (body.protocol) {
            case "http":
                const response = await fetch(
                    body.target,
                    {
                        method: body.method,
                        headers: body.headers,
                        body: body.body ? JSON.stringify(body.body) : undefined
                    }
                );
                const text = await response.text();
                return NextResponse.json({
                    message: `Server received response from ${body.target}`,
                    response: text,
                    responseHeaders: Array.from(response.headers.keys()).sort().map(header => ({ name: header, value: response.headers.get(header) }))
                });
            case "tcp":
                await new Promise((resolve, reject) => {
                    const client = connect({ host: body.target, port: body.port }, () => {
                        client.end();
                        resolve(1);
                    });
                    client.on("error", (error) => {
                        reject(error);
                    });
                });
                return NextResponse.json({ message: "TCP port open" });
            default:
                return NextResponse.json({ message: "Unrecognized protocol in body" });
        }
    } catch (error) {
        return NextResponse.json({ message:  (error as any).message || "Connection failed", error: JSON.stringify(error) });
    }
}