import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SUNFLOWER",
  description: "SUNFLOWER - фідбек",
};

const forest = localFont({
  src: [
    {
      path: "../../public/fonts/ForestGlade.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ForestGlade.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ForestGlade.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-forest",
});

const retrievce = localFont({
  src: [
    {
      path: "../../public/fonts/RetrievseNC.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/RetrievseNC.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/RetrievseNC.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-retrievce",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body
        className={`${inter.variable} ${forest.variable} ${retrievce.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
