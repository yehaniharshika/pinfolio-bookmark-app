"use client";
import React, { useEffect, useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { lilitaOne, montserrat } from "@/app/fonts/fonts";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const [navBg, setNavBg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setNavBg(window.scrollY >= 90);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/home" }, // change this
    { name: "About", href: "#about" }, // this stays if you're scrolling
    { name: "Book Marks", href: "#bookmarks" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLogout = () => {
    //Remove token from localStorage
    localStorage.removeItem("token");
    console.log("Logged out");

    //Redirect to login or home page
    router.push("/");
  };

  return (
    <header
      className={`${
        navBg ? "bg-pink-800 shadow-md" : "bg-pink-800"
      } transition-none duration-3 fixed top-0 w-full z-[1000]`}
    >
      <nav className="flex items-center justify-between h-[9vh] w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center">
            <GiNotebook className="w-6 h-6 text-white" />
          </div>
          <a
            href="/home"
            className={`text-xl md:text-2xl text-white uppercase font-bold ${lilitaOne.className}`}
          >
            Pinfolio
          </a>
        </div>

        {/* Desktop Nav Links */}
        <ul
          className="hidden md:flex gap-8 items-center text-white font-semibold"
          style={{ fontSize: "13px" }}
        >
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                className={`hover:text-pink-300 ${montserrat.className}`}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <button
              className="hover:text-pink-300"
              aria-label="Fav"
              onClick={() => router.push("/favorite-Bookmark")}
            >
              <FaHeart size={18} />
            </button>
          </li>

          {/* Logout Button for Desktop */}
          <li>
            <button
              onClick={handleLogout}
              className={`bg-white text-pink-800 px-3 py-1 rounded hover:bg-pink-300 hover:text-white transition duration-300 ${montserrat.className}`}
              style={{ cursor: "pointer" }}
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <HiMenuAlt1
          onClick={() => setMenuOpen(true)}
          className="md:hidden w-6 h-6 text-white cursor-pointer"
        />
      </nav>

      {/* Mobile Menu */}
      <aside
        className={`fixed top-0 right-0 h-screen w-64 bg-pink-800 z-50 transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <IoClose
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 text-white cursor-pointer"
        />

        {/* Mobile Links */}
        <ul
          className="flex flex-col gap-6 px-10 py-20 text-white font-semibold"
          style={{ fontSize: "13px" }}
        >
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`hover:text-pink-300 ${montserrat.className}`}
              >
                {link.name}
              </a>
            </li>
          ))}
          {/* Logout Button for Mobile */}
          <li>
            <button
              className="hover:text-pink-300"
              aria-label="Fav"
              onClick={() => router.push("/favorite-Bookmark")}
            >
              <FaHeart size={18} />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className={`bg-white text-pink-800 px-3 py-1 rounded hover:bg-pink-300 hover:text-white transition duration-300 ${montserrat.className}`}
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </header>
  );
};

export default Navbar;
