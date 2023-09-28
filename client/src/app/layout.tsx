"use client";
import Header from "@/components/chips/Header/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoneProvider from "@/context/loanContext/loanContext";
import ZeroDevWrapper from "./ZerodevWrapper";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { NETWORK } from "../constants/env";

const inter = Inter({ subsets: ["latin"] });
const ProviderNetwork = NETWORK === 'mainnet' ? 'ethereum' : NETWORK;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ZeroDevWrapper>
          <ThirdwebProvider activeChain={ProviderNetwork}>
            <Header />
            <LoneProvider>{children}</LoneProvider>
          </ThirdwebProvider>
        </ZeroDevWrapper>
      </body>
    </html>
  );
}
