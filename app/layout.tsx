import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bingo Lottery Draw",
  description: "A modern dealer/operator lottery ball drawing system for 1-90 bingo rounds."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070d"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="font-display antialiased">{children}</body>
    </html>
  );
}
