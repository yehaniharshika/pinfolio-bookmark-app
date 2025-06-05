"use client";

import React from "react";
import { montserrat, nunito, rubikGemstones } from "@/app/fonts/fonts";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const navigateAddBookmark = () => {
    router.push("/addBookmark");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/images/bgVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className={`text-white ${rubikGemstones.className} text-3xl sm:text-4xl md:text-5xl font-bold leading-tight`}>
          Your Smart Bookmark Manager
        </h1>

        <p className={`mt-4 ${montserrat.className} text-gray-200 font-medium max-w-xl`} style={{ fontSize: "14px" }}>
          Save what matters. Organize your links. Access everything in one place anytime , anywhere.
        </p>

        <div className="mt-6">
          <button
            className={`bg-white ${montserrat.className} font-bold text-pink-800 px-6 py-2 rounded-md hover:bg-indigo-100 transition border-2 cursor-pointer`}
            style={{ fontSize: "14px" }}
            onClick={navigateAddBookmark}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
