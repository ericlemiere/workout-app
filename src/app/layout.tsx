import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { ServiceWorkerRegistrar } from "@/components/layout/ServiceWorkerRegistrar";
import { ProgressHydrator } from "@/components/layout/ProgressHydrator";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lunar Gravity",
  description: "Your personal 20-minute workout cycle",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lunar Gravity",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050816",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="h-full bg-navy text-offwhite antialiased font-sans overflow-x-hidden">
        <ServiceWorkerRegistrar />
        <ProgressHydrator />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
