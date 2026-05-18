import type { Metadata, Viewport } from "next";
import { Geist, Orbitron, Space_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { ServiceWorkerRegistrar } from "@/components/layout/ServiceWorkerRegistrar";
import { ProgressHydrator } from "@/components/layout/ProgressHydrator";
import { SplashScreen } from "@/components/layout/SplashScreen";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: "500",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MOOV",
  description: "Your personal 20-minute workout cycle",
  openGraph: {
    title: "MOOV",
    description: "Your personal 20-minute workout cycle",
    url: "https://moov-1.vercel.app/",
    siteName: "MOOV",
    images: [{ url: "https://moov-1.vercel.app/opengraph-image.jpg" }],
    type: "website",
  },
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MOOV",
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
    <html lang="en" className={`${geist.variable} ${orbitron.variable} ${spaceMono.variable} h-full`}>
      <body className="h-full bg-navy text-offwhite antialiased font-sans overflow-x-hidden">
        <ServiceWorkerRegistrar />
        <ProgressHydrator />
        <SplashScreen />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
