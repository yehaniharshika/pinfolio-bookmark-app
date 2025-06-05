// app/page.tsx
"use client"; // allows using hooks or client-side code

import Link from "next/link"; // for navigation between pages
import { rubikGemstones } from "./fonts/fonts";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-100">
      <h1 className={`text-5xl font-bold text-pink-700 mb-4 ${rubikGemstones.className}`}>
        PINFOLIO
      </h1>
      <p className="mb-8 text-md text-center" style={{fontWeight:"600"}}>Login or sign up to continue</p>
      
      <div className="flex gap-4">
        {/* Link to login page */}
        <Link
          href="/login"
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
          style={{fontWeight:"600"}}
        >
          Login
        </Link>

        {/* Link to signup page */}
        <Link
          href="/signup"
          className="bg-white border-2 border-pink-600 text-pink-600 px-6 py-2 rounded hover:bg-pink-100 transition"
          style={{fontWeight:"600"}}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
