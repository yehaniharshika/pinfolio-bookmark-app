"use client";

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";

const SOCIAL_LINKS = [
  {
    icon: <FaFacebookF size={18} />,
    href: "",
  },
  {
    icon: <FaInstagram size={18} />,
    href: "",
  },
  {
    icon: <FaTiktok size={18} />,
    href: "",
  },
  {
    icon: <FaYoutube size={18} />,
    href: "",
  },
  {
    icon: <FaLinkedinIn size={18} />,
    href: "",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#323232]  text-white py-6" id="contact">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Branding */}
        <div>
          <h2 className="text-md font-semibold mb-2">
            📚 PINFOLIO - Bookmark Manager
          </h2>
          <p className=" text-gray-400" style={{ fontSize: "12px" }}>
            Organize your web life, one bookmark at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className=" text-gray-300 space-y-1" style={{ fontSize: "13PX" }}>
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/bookmarks" className="hover:underline">
                My Bookmarks
              </a>
            </li>
            <li>
              <a href="/add" className="hover:underline">
                Add Bookmark
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-md font-semibold mb-2">Connect</h3>
          <p className=" text-gray-300 mb-2" style={{ fontSize: "13px" }}>
            Email : support@pinfolio.com
          </p>
          <div className="flex space-x-4 mt-4">
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg rounded-full p-2 bg-gray-800 hover:bg-gray-700"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="text-center text-gray-500 mt-6 border-t border-gray-800 pt-4"
        style={{ fontSize: "11px" }}
      >
        &copy; {new Date().getFullYear()} Bookmark Manager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
