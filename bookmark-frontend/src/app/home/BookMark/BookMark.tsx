"use client";

import { lilitaOne, montserrat, rubikGemstones } from "@/app/fonts/fonts";
import { bookmarkData } from "@/data/data";
import React from "react";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";

import Image from "next/image";

const BookMark = () => {
  return (
    <div className={`p-6 bg-[#dcb8c3] min-h-screen`} id="bookmarks">
      <div className="text-center mb-8">
        <h1 className={`text-3xl text-pink-800 ${rubikGemstones.className}`}>Your Bookmarks</h1>
        <p
          className={`text-gray-600 mt-4 max-w-xl mx-auto ${montserrat.className} `}
           style={{ fontWeight: "600" ,fontSize:"14px"}}
        >
          Save, edit, and manage your favorite learning resources in one
          organized space.
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto"
        style={{ maxWidth: "76%" }}
      >
        {bookmarkData.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            {typeof bookmark.image === "string" ? (
              <img
                src={bookmark.image}
                alt={bookmark.title}
                className="w-full h-40 object-cover"
              />
            ) : (
              <Image
                src={bookmark.image}
                alt={bookmark.title}
                className="w-full h-40 object-cover"
                width={400}
                height={160}
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {bookmark.title}
              </h2>
              <p className="text-gray-600 mb-2" style={{fontSize:"14px",fontWeight:"500"}}>
                {bookmark.description}
              </p>
              <a
                href={bookmark.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline mb-2 inline-block"
                style={{textDecoration:"none",fontWeight:"700",fontSize:"12px"}}
              >
                Visit Link
              </a>
              <p className="text-xs text-gray-500">
                Created: {bookmark.createdAt}
              </p>
              <p className="text-xs text-gray-500">
                Updated: {bookmark.updatedAt}
              </p>
              <div className="flex justify-end gap-4 mt-4 text-gray-600">
                <button className="hover:text-yellow-500" aria-label="Favorite">
                  <FaHeart size={18} />
                </button>
                <button className="hover:text-blue-500" aria-label="Edit">
                  <FaEdit size={18} />
                </button>
                <button className="hover:text-red-500" aria-label="Delete">
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMark;
