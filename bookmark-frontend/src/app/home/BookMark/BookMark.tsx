/* src/app/home/BookMark/BookMark.tsx */
"use client";

import React, { useEffect, useState } from "react";
import { lilitaOne, montserrat, rubikGemstones } from "@/app/fonts/fonts";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";

type Bookmark = {
  id: number;
  title: string;
  description: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  bookmarkImg: string;         // filename OR full URL
};

export default function BookMark() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

 
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3333/bookmark/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch bookmarks");

        const json = await res.json();
        // backend shape: { message: "...", data: [...] }
        const list: unknown = json.data;

        if (Array.isArray(list)) {
          setBookmarks(list as Bookmark[]);
        } else {
          throw new Error(
            "Unexpected response format – expected an array in `data`"
          );
        }
      } catch (err: any) {
        console.error("Bookmark fetch error:", err);
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  
  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `http://localhost:3333/uploads/${img}`;


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#dcb8c3]">
        <p className={`text-pink-800 font-semibold ${montserrat.className}`} style={{fontSize:"15px"}}>Loading your Bookmarks…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#dcb8c3]">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#dcb8c3] min-h-screen" id="bookmarks">
      {/* heading ------------------------------------------------------- */}
      <div className="text-center mb-8">
        <h1 className={`text-3xl text-pink-800 ${rubikGemstones.className}`}>
          Your Bookmarks
        </h1>
        <p
          className={`text-gray-600 mt-4 max-w-xl mx-auto ${montserrat.className}`}
          style={{ fontWeight: 600, fontSize: 14 }}
        >
          Save, edit, and manage your favorite learning resources in one
          organized space.
        </p>
      </div>

      {/* no-bookmarks fallback ---------------------------------------- */}
      {bookmarks.length === 0 && (
        <p className="text-center text-gray-700 font-medium">
          You haven’t added any bookmarks yet.
        </p>
      )}


      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto"
        style={{ maxWidth: "76%" }}
      >
        {bookmarks.map((bm) => (
          <div
            key={bm.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            
            {bm.bookmarkImg ? (
              <img
                src={getImageUrl(bm.bookmarkImg)}
                alt={bm.title}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/*bookmark card body*/}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {bm.title}
              </h2>
              <p
                className="text-gray-600 mb-2"
                style={{ fontSize: 14, fontWeight: 500 }}
              >
                {bm.description}
              </p>

              <a
                href={bm.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline mb-2 inline-block"
                style={{ textDecoration: "none", fontWeight: 700, fontSize: 12 }}
              >
                Visit Link
              </a>

              <p className="text-xs text-gray-500">
                Created: {new Date(bm.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated: {new Date(bm.updatedAt).toLocaleString()}
              </p>

              {/* action buttons ------------------------------------- */}
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
}
