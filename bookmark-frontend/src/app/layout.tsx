// layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Home/Navbar/Navbar";
import Footer from "@/components/Footer/Footer"; // make sure you have this
import { lilitaOne, montserrat, nunito, rubikGemstones } from "./fonts/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${nunito.className} ${lilitaOne.className} ${rubikGemstones.className} ${montserrat.className} antialiased`}
      >
        {!isAuthPage && <Navbar />}
        {children}
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
