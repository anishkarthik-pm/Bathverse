import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BathIQ – Premium Bathroom Renovations",
  description: "Design, build, and track your dream bathroom with BathIQ.",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#C04828",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
