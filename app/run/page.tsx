'use client';
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [command, setCommand] = useState('');
    const [commandResult, setCommandResult] = useState<Array<any>>([]);
    const sendCommand = async () => {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        });
        const data = await response.json();
        setCommandResult([data, ...commandResult.slice(0, 3)]);
        setCommand('');
    }
    return (
        <div>
            <h2>Run command on server</h2>
            <form onSubmit={e => { e.preventDefault(); sendCommand(); }}>
                <label htmlFor="command">Command:</label>
                <input type="text" id="command" onChange={e => setCommand(e.target.value)} value={command} />
            </form>
            <table>
                <thead>
                    <tr><td>stdout</td><td>stderr</td><td>error</td></tr>
                </thead>
                <tbody>
                    {commandResult.map((result, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'even' : 'odd'}>
                            <td style={{ whiteSpace: "pre-line", border: "1px solid #dddddd" }}>{result.stdout}</td>
                            <td style={{ border: "1px solid #dddddd" }}>{result.stderr}</td>
                            <td style={{ border: "1px solid #dddddd" }}>{JSON.stringify(result.error)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <Link href="/">Home</Link>
            <style jsx>{`
          tr:nth-child(odd) {
            background-color:rgb(202, 202, 202);
          }
          td {
            white-space: pre-line;
            border: 1px solid #dddddd;
          }
        `}</style>
        </div>
    );
}
