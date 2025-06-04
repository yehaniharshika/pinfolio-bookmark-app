"use client";

import Home from "@/components/Home/Home";
import React, { useState, useEffect } from "react";
import LoginPage from "./login/page";


export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn ? (
    <Home />
  ) : (
    <LoginPage/>
  );
}
