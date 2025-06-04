"use client";

import React from "react";
import {
  TbBookmarkPlus,
  TbFolders,
  TbWorldCheck,
} from "react-icons/tb";
import {
  lilitaOne,
  montserrat,
  nunito,
  rubikGemstones,
} from "@/app/fonts/fonts";

const About: React.FC = () => {
  return (
    <div id="about" className="min-h-[86vh] bg-[#d0a1af] py-12 px-6 sm:px-10 md:px-20">
      {/* Header & Description */}
      <div className="text-center mb-12">
        <h1
          className={`text-3xl sm:text-2xl md:text-3xl font-bold text-[#9D174D] ${rubikGemstones.className}`}
        >
          About Our Bookmark App
        </h1>
        <p
          className={`mt-4 text-gray-600 max-w-3xl mx-auto ${montserrat.className}`}
          style={{ fontWeight: 600, fontSize: "14px" }}
        >
          Our app helps you effortlessly save and organize your favorite websites, articles,
          videos, and other online resources. With a sleek, user-friendly interface and powerful
          organization tools, you can quickly categorize, tag, and access your saved content
          anytime, anywhere — making your digital life more efficient and stress-free.
        </p>
      </div>

      {/* Feature Cards */}
      <div
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto"
        style={{ maxWidth: "76%" }}
      >
        {/* Card 1 */}
        <div className="bg-pink-200 p-6 rounded-xl shadow-md border-2 border-[#a0425f] text-center transform transition duration-300 hover:scale-105 hover:bg-pink-300 hover:shadow-xl hover:border-pink-700">
          <TbBookmarkPlus className="text-5xl text-pink-600 mx-auto mb-3" />
          <h2 className={`text-xl font-bold text-rose-900 mb-2 ${montserrat.className}`}>
            Easy Bookmarking
          </h2>
          <p
            className={`text-gray-700 ${montserrat.className}`}
            style={{ fontWeight: 500, fontSize: "14px" }}
          >
            Quickly save links with one click and organize them into categories and folders.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-pink-200 p-6 rounded-xl shadow-md border-2 border-[#a0425f] text-center transform transition duration-300 hover:scale-105 hover:bg-pink-300 hover:shadow-xl hover:border-pink-700">
          <TbFolders className="text-5xl text-pink-600 mx-auto mb-3" />
          <h2 className={`text-xl font-bold text-rose-900 mb-2 ${montserrat.className}`}>
            Organized Collections
          </h2>
          <p
            className={`text-gray-700 ${montserrat.className}`}
            style={{ fontWeight: 500, fontSize: "14px" }}
          >
            Sort your favorite websites with folders, tags, and labels for easy access anytime.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-pink-200 p-6 rounded-xl shadow-md border-2 border-[#a0425f] text-center transform transition duration-300 hover:scale-105 hover:bg-pink-300 hover:shadow-xl hover:border-pink-700">
          <TbWorldCheck className="text-5xl text-pink-600 mx-auto mb-3" />
          <h2 className={`text-xl font-bold text-rose-900 mb-2 ${montserrat.className}`}>
            Access Anywhere
          </h2>
          <p
            className={`text-gray-700 ${montserrat.className}`}
            style={{ fontWeight: 500, fontSize: "14px" }}
          >
            Access bookmarks from any device with secure cloud syncing across your browsers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
