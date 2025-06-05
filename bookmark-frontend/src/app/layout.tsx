"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/home/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { lilitaOne, montserrat, nunito, rubikGemstones } from "./fonts/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide Navbar and Footer on '/', '/login', and '/signup'
  const isHiddenPage =
    pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${nunito.className} ${lilitaOne.className} ${rubikGemstones.className} ${montserrat.className} antialiased`}
      >
        {!isHiddenPage && <Navbar />}
        {children}
        {!isHiddenPage && <Footer />}
      </body>
    </html>
  );
}
