"use client";

import Link from "next/link";
import { rubikGemstones } from "./fonts/fonts";
import "@/components/Landing/Landing.css";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 overflow-hidden">
      {/* Starry animated background */}
      <div className="stars" />
      <div className="twinkling" />

      {/* Content overlay */}
      <div className="z-10 text-center">
        <h1
          className={`text-5xl font-bold text-pink-700 mb-4 animate-fadeInDown ${rubikGemstones.className}`}
        >
          PINFOLIO
        </h1>
        <p
          className="mb-8 text-md text-center"
          style={{ fontWeight: "600" }}
        >
          Login or sign up to continue
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
            style={{ fontWeight: "600" }}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-white border-2 border-pink-600 text-pink-600 px-6 py-2 rounded hover:bg-pink-100 transition"
            style={{ fontWeight: "600" }}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
