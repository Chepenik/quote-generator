import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Common Sense Quote Generator",
  description: "Generate inspiring quotes from historical figures and AI-powered insights. Discover wisdom, save your favorites, and share meaningful quotes.",
  openGraph: {
    title: "The Common Sense Quote Generator",
    description: "Discover wisdom from historical figures and AI-powered insights.",
    images: [
      {
        url: "https://i.nostr.build/eViFTwTeLIf0aUjk.png",
        width: 1200,
        height: 630,
        alt: "The Common Sense Quote Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Common Sense Quote Generator",
    description: "Discover wisdom from historical figures and AI-powered insights.",
    images: ["https://i.nostr.build/eViFTwTeLIf0aUjk.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
