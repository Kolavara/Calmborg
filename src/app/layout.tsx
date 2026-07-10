import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Calm Borg — Precision Tooling Solutions for Modern Manufacturing",
    template: "%s | Calm Borg",
  },
  description:
    "Calm Borg is a leading supplier of cutting tools, tool holding systems, inserts, and machining accessories for CNC machining centers, VMCs, HMCs, and turning centers. 30+ years of industry expertise.",
  keywords: [
    "CNC cutting tools",
    "carbide inserts",
    "tool holders",
    "end mills",
    "turning tools",
    "CNC machining",
    "VMC",
    "HMC",
    "manufacturing",
    "precision tooling",
    "Bengaluru",
  ],
  openGraph: {
    title: "Calm Borg — Precision Tooling Solutions",
    description:
      "Premium cutting tools, tool holding systems, and CNC accessories. 30+ years of industry expertise serving automotive, aerospace, and precision engineering.",
    type: "website",
    locale: "en_IN",
    siteName: "Calm Borg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="relative z-10 min-h-full flex flex-col"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
