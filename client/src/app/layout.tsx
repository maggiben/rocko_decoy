import Header from "@/components/chips/Header/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoneProvider from "@/context/loanContext/loanContext";
import Providers from "./Providers";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rocko",
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
        <Providers>
          <Header />
          <Toaster position="bottom-right" reverseOrder={true} />
          <LoneProvider>{children}</LoneProvider>
        </Providers>
      </body>
    </html>
  );
}

