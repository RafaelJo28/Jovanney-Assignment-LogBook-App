"use client";
import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";

export default function ApiDocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/docs").then((r) => r.json()).then(setSpec);
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist/swagger-ui.css"
      />
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontFamily: "sans-serif" }}>Assignment Log Book — API Docs</h1>
        {spec ? <SwaggerUI spec={spec} /> : <p>Loading...</p>}
      </div>
    </>
  );
}