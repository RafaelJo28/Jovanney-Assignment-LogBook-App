import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assignment Log Book",
  description: "REST API for managing assignments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#fff", color: "#000" }}>
        {children}
      </body>
    </html>
  );
}