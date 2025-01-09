import { NextRequest, NextResponse } from 'next/server';
import { connect } from 'net'
// export function GET(req: NextApiRequest, res: NextApiResponse) {
//     return NextResponse.json({ message: "Server received GET request!" });
// }

export type ConnectionTestPayload = {
    protocol: "http";
    target: string;
    method: "GET" | "POST";
    headers?: { [key: string]: string };
    body?: object;
}
    | {
        protocol: "tcp";
        target: string;
        port: number;
    }

export async function POST(req: NextRequest) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                const data = await response.text();
                let json_data;
                try {
                    json_data = JSON.parse(data);
                } catch {}
                return NextResponse.json({
                    message: `Server received response from ${body.target}`,
                    response: json_data || data,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NextResponse.json({ message:  (error as any).message || "Connection failed", error: JSON.stringify(error) });
    }
}