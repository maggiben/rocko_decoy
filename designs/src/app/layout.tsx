import Header from "@/components/shared/header/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoneProvider from "@/context/loanContext/loanContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rocko.co",
  description: "Rocko - Crypto backed loans",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <LoneProvider>{children}</LoneProvider>
      </body>
    </html>
  );
}
