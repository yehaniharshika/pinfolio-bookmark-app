"use client";
import React, { useState } from "react";
import { montserrat } from "../fonts/fonts";
import Swal from "sweetalert2";
import "@/components/Alert/Alert.css";

const AddBookmarkPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    createdAt: "",
    updatedAt: "",
    bookmarkImg: "",
  });

  // Separate state for file since it's not a string
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Preview
    }
  };

  const handleAdd = async () => {
    if (!file) {
      alert("Please select an image file");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("link", formData.link);
      data.append("createdAt", formData.createdAt);
      data.append("updatedAt", formData.updatedAt);
      data.append("bookmarkImg", file);

      const token = localStorage.getItem("token"); // or get token from your auth context/state

      const response = await fetch("http://localhost:3333/bookmark/create", {
        method: "POST",
        body: data,
        headers: {
          // Important: Don't set Content-Type for FormData (browser handles it)
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add bookmark");
      }

      const result = await response.json();
      console.log("Bookmark added:", result);

      setFormData({
        title: "",
        description: "",
        link: "",
        createdAt: "",
        updatedAt: "",
        bookmarkImg: "",
      });
      setFile(null);
      setPreviewUrl(null);
      console.log("Bookmark created successfully!");
      Swal.fire({
        title: "Success!",
        text: "Bookmark added successfully.",
        icon: "success",
        customClass: {
          popup: "small-swal-popup",
          title: "small-swal-title",
          htmlContainer: "small-swal-text",
        },
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "There was a problem adding the bookmark.", "error");
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      link: "",
      bookmarkImg: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-30 p-6 bg-[#dcb8c3] shadow-md rounded mb-10">
      <h2
        className={`text-xl mb-6 text-center text-pink-700 ${montserrat.className}`}
        style={{ fontWeight: "bold" }}
      >
        Add New Bookmark
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium" style={{ fontSize: "14px" }}>
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter title"
            style={{ fontSize: "13px" }}
          />
        </div>

        <div>
          <label className="block font-medium" style={{ fontSize: "14px" }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter description"
            style={{ fontSize: "13px" }}
          />
        </div>

        <div>
          <label className="block font-medium" style={{ fontSize: "14px" }}>
            Link
          </label>
          <input
            type="url"
            name="link"
            style={{ fontSize: "13px" }}
            value={formData.link}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block font-medium" style={{ fontSize: "14px" }}>
            Upload Bookmark Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            style={{ fontSize: "13px" }}
          />

          {/* Show preview if available */}
          {previewUrl && (
            <div className="mt-4 border rounded p-2 bg-white">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-contain rounded"
              />
            </div>
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            style={{ fontSize: "13px" }}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleAdd}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
            style={{ fontSize: "14px", fontWeight: "600" ,cursor:"pointer"}}
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
            style={{ fontSize: "14px", fontWeight: "600" ,cursor:"pointer"}}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookmarkPage;
