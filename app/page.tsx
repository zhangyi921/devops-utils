import { headers } from 'next/headers'

export default async function Home() {
  const headersList = await headers()
  const keysArray = Array.from(headersList.keys()).sort()
  const EnvKeys = Object.keys(process.env).sort()
  return (
    <div>
      
      <h2>Headers that server received:</h2>
      <table>
        <thead>
          <tr><td>Header</td><td>Value</td></tr>
        </thead>
        <tbody>
          {keysArray.map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{headersList.get(key)}</td>
            </tr>
          ))}

        </tbody>
      </table>
      <h2>Server environment variables:</h2>
      <table>
        <thead>
          <tr><td>Env</td><td>Value</td></tr>
        </thead>
        <tbody>
          {EnvKeys.map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{process.env[key]}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}