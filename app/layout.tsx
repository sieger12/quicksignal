import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "QuickSignal — Crypto Research in Seconds",
  description:
    "Market, sector, and token-level signals summarized by AI. All the signals. None of the noise.",
  metadataBase: new URL("https://quicksignal.io"),
  openGraph: {
    title: "QuickSignal — Crypto Research in Seconds",
    description: "Market, sector, and token-level signals summarized by AI.",
    siteName: "QuickSignal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
