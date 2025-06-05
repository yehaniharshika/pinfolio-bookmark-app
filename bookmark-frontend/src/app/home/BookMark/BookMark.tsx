"use client";

import React, { useEffect, useState } from "react";
import { lilitaOne, montserrat, rubikGemstones } from "@/app/fonts/fonts";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";
import Modal from "react-modal";

type Bookmark = {
  id: number;
  title: string;
  description: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  bookmarkImg: string;
};

export default function BookMark() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Bookmark | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Try to find Next.js root element, fallback to body
    const appElement =
      document.getElementById("__next") ||
      document.getElementById("root") ||
      document.body;
    Modal.setAppElement(appElement);
  }, []);

  const imgUrl = (img: string) =>
    img.startsWith("http") ? img : `http://localhost:3333/uploads/${img}`;

  /*Fetch all bookmarks*/
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3333/bookmark/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch bookmarks");
        const json = await res.json();
        const list = json.data;
        if (Array.isArray(list)) setBookmarks(list);
        else throw new Error("Response data is not an array");
      } catch (e: any) {
        setError(e.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toDatetimeLocal = (dt: string) => {
    const date = new Date(dt);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
  };

  /*Modal handlers*/
  const openEditModal = (bm: Bookmark) => {
    setFormData({
      ...bm,
      createdAt: toDatetimeLocal(bm.createdAt),
      updatedAt: toDatetimeLocal(bm.updatedAt),
    });
    setPreviewUrl(imgUrl(bm.bookmarkImg));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(null);
    setPreviewUrl(null);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData) return;
    // TEMP preview, actual upload logic should be in submit
    setPreviewUrl(URL.createObjectURL(file));
    setFormData({ ...formData, bookmarkImg: file.name });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) return;

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("createdAt", formData.createdAt);
      formDataToSend.append("updatedAt", formData.updatedAt);

      if (selectedFile) {
        formDataToSend.append("bookmarkImg", selectedFile);
      }

      const response = await fetch(
        `http://localhost:3333/bookmark/update/${formData.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Updated successfully ✅", data);

        // Update the bookmark in the local state
        setBookmarks((prevBookmarks) =>
          prevBookmarks.map((bookmark) =>
            bookmark.id === formData.id
              ? {
                  ...bookmark,
                  ...formData,
                  bookmarkImg: data.data?.bookmarkImg || bookmark.bookmarkImg,
                  updatedAt: data.data?.updatedAt || new Date().toISOString(),
                }
              : bookmark
          )
        );

        closeModal();
      } else {
        console.error("Update failed ❌", data.message);
        setError(data.message || "Failed to update bookmark");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Network error occurred");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#dcb8c3]">
        <p className={`text-pink-800 ${montserrat.className}`}>
          Loading Bookmarks…
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#dcb8c3]">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );

  return (
    <div className="p-6 bg-[#dcb8c3] min-h-screen" id="bookmarks">
      <header className="text-center mb-8">
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
      </header>

      {bookmarks.length === 0 && (
        <p className="text-center text-gray-700">
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
              <p className="text-gray-600 mb-2" style={{ fontSize: 14 }}>
                {bm.description}
              </p>
              <a
                href={bm.link}
                target="_blank"
                className="text-blue-600 underline text-sm"
              >
                Visit Link
              </a>
              <p className="text-xs text-gray-500 mt-1">
                Created: {new Date(bm.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Updated: {new Date(bm.updatedAt).toLocaleString()}
              </p>
              <div className="flex justify-end gap-3 mt-3 text-gray-600">
                <button className="hover:text-yellow-500" aria-label="Fav">
                  <FaHeart size={18} />
                </button>
                <button
                  className="hover:text-blue-500"
                  aria-label="Edit"
                  onClick={() => openEditModal(bm)}
                >
                  <FaEdit size={18} />
                </button>
                <button className="hover:text-red-500" aria-label="Del">
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Bookmark"
        className="bg-white p-6 rounded-lg w-full max-w-lg mx-auto shadow-xl outline-none mt-24 max-h-[60vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-transparent bg-opacity-30 flex justify-center items-start z-50"
      >
        {formData && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                className="w-full border px-3 py-2 rounded"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Link</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={onChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Replace Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="w-full border px-3 py-2 rounded"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-3 w-full h-40 object-contain border rounded"
                />
              )}
            </div>
            <div>
              <label className="block font-medium" style={{ fontSize: "14px" }}>
                Created At
              </label>
              <input
                type="datetime-local"
                name="createdAt"
                value={formData.createdAt}
                onChange={onChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                style={{ fontSize: "13px" }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium"
                style={{ fontSize: "14px" }}
              >
                Updated At
              </label>
              <input
                type="datetime-local"
                name="updatedAt"
                value={formData.updatedAt}
                onChange={onChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-pink-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
