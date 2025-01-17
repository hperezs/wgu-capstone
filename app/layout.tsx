"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "material-symbols";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import { Spinner } from "@/lib/components/Spinner";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          <Suspense fallback={<Spinner loading />}>{children}</Suspense>
        </QueryClientProvider>
      </body>
    </html>
  );
}
