'use client';
import { useState } from "react";
import { ConnectionTestPayload } from "../api/connection-test/route";

const HttptestDefault: ConnectionTestPayload = {
    protocol: "http",
    target: "http://localhost:3000/api",
    method: "POST",
    body: {},
    headers: {}
}

const TcpTestDefault: ConnectionTestPayload = {
    protocol: "tcp",
    target: "localhost",
    port: 5432
}

export default function Home() {
    const [httpTest, setHttpTest] = useState<string>(JSON.stringify(HttptestDefault, null, 2));
    const [tcpTest, setTcpTest] = useState<string>(JSON.stringify(TcpTestDefault, null, 2));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [testResult, setTestResult] = useState<any>({});
    const testHttp = async () => {
        const response = await fetch("/api/connection-test", {
            method: "POST",
            body: httpTest
        });
        const json = await response.json();
        setTestResult(json);
     };
    const testTcp = async () => {
        const response = await fetch("/api/connection-test", {
            method: "POST",
            body: tcpTest
        });
        const json = await response.json();
        setTestResult(json);
     };
    return (
        <div>
            <h2>Test server&rsquo;s network connection</h2>
            <div style={{ display: "flex" }}>
                <div style={{ width: 500, margin: 10, display: "flex", flexDirection: "column" }}>
                    <h3>HTTP</h3>
                    <textarea value={httpTest} onChange={e => setHttpTest(e.target.value)} rows={10}></textarea>
                    <button onClick={testHttp} > Test 🚀</button>
                </div>
                <div style={{ width: 500, margin: 10, display: "flex", flexDirection: "column" }}>
                    <h3>TCP</h3>
                    <textarea value={tcpTest} onChange={e => setTcpTest(e.target.value)} rows={10}></textarea>
                    <button onClick={testTcp} > Test 🚀</button>
                </div>
            </div>
            <div style={{ maxWidth:1020, margin: 10, display: "flex", flexDirection: "column" }}>

                <h2>Test result</h2>
                <textarea cols={100} rows={30} value={JSON.stringify(testResult, null, 2)} readOnly></textarea>
            </div>
        </div>
    );
}
