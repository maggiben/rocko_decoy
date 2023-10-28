import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoneProvider from "@/context/loanContext/loanContext";
import AlertProvider from "@/context/alertContext/alertContext";

import Providers from "./Providers";
import { Toaster } from 'react-hot-toast';
import Footer from "../../../ui-lib/Footer/Footer";
import Header from "@/components/chips/Header/Header";

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
        <Providers>
        <Header />
          <Toaster position="bottom-right" reverseOrder={true} />

        <LoneProvider>
          <AlertProvider>{children}</AlertProvider>
        </LoneProvider>
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
