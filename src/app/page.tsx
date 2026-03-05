export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Assignment Log Book API</h1>
      <p>A REST API built with Next.js for managing assignments.</p>
      <h2>Endpoints</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>Method</th><th>Endpoint</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>GET</td><td>/api/assignments</td><td>List all assignments</td></tr>
          <tr><td>POST</td><td>/api/assignments</td><td>Create new assignment</td></tr>
          <tr><td>GET</td><td>/api/assignments/:id</td><td>Get one assignment</td></tr>
          <tr><td>PUT</td><td>/api/assignments/:id</td><td>Update assignment</td></tr>
          <tr><td>DELETE</td><td>/api/assignments/:id</td><td>Delete assignment</td></tr>
        </tbody>
      </table>
      <h2>API Docs</h2>
      <p>Visit <a href="/docs">/docs</a> for the Swagger UI.</p>
    </main>
  );
}