"use client";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface Bookmark {
  id: string;
  title: string;
  description: string;
  link: string;
  bookmarkImg?: string;
  createdAt: string;
  updatedAt: string;
}

const FavoriteBookmarkPage = () => {
  const [favorites, setFavorites] = useState<Bookmark[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem("favoriteBookmarks");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const imgUrl = (path: string) => {
    return `/uploads/${path}`; // adjust as per your path structure
  };

  return (
    <div className="pt-24 px-4">
      <h1 className="text-2xl font-bold text-pink-800 mb-6">Favorite Bookmarks</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorite bookmarks found.</p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto"
          style={{ maxWidth: "76%" }}
        >
          {favorites.map((bm) => (
            <div
              key={bm.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {bm.bookmarkImg ? (
                <img
                  src={imgUrl(bm.bookmarkImg)}
                  alt={bm.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {bm.title}
                </h2>
                <p className="text-gray-600 mb-2 font-semibold">
                  {bm.description}
                </p>
                <a
                  href={bm.link}
                  target="_blank"
                  className="text-blue-600 text-sm font-semibold"
                  rel="noopener noreferrer"
                >
                  Visit Link
                </a>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  Created: {new Date(bm.createdAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-2 font-medium">
                  Updated: {new Date(bm.updatedAt).toLocaleString()}
                </p>
                <div className="flex justify-end mt-3 text-pink-600">
                  <FaHeart size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteBookmarkPage;
