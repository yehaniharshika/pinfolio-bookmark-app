"use client";
import React, { useState } from "react";
import { montserrat } from "../fonts/fonts";

const AddBookmarkPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleChange = () => {
    
    
  };

  const handleAdd = () => {
    console.log("Bookmark added:", formData);
    setFormData({
      title: "",
      description: "",
      link: "",
      image: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      link: "",
      image: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-30 p-6 bg-[#dcb8c3] shadow-md rounded mb-10">
      <h2 className={`text-xl font-semibold mb-6 text-center text-pink-700 ${montserrat.className}`} style={{fontWeight:"bold"}}>Add New Bookmark</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium" style={{fontSize:"14px"}}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter title"
            style={{fontSize:"13px"}}
          />
        </div>

        <div>
          <label className="block font-medium" style={{fontSize:"14px"}}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter description"
            style={{fontSize:"13px"}}
          />
        </div>

        <div>
          <label className="block font-medium" style={{fontSize:"14px"}}>Link</label>
          <input
            type="url"
            name="link"
            style={{fontSize:"13px"}}
            value={formData.link}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block font-medium" style={{fontSize:"14px"}}>Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="https://image-link.com"
            style={{fontSize:"13px"}}
          />
        </div>

        <div>
          <label className="block font-medium" style={{fontSize:"14px"}}>Created At</label>
          <input
            type="datetime-local"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            style={{fontSize:"13px"}}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{fontSize:"14px"}}>Updated At</label>
          <input
            type="datetime-local"
            name="updatedAt"
            value={formData.updatedAt}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            style={{fontSize:"13px"}}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleAdd}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
            style={{fontSize:"14px",fontWeight:"600"}}
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
            style={{fontSize:"14px",fontWeight:"600"}}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookmarkPage;
