"use client";

import Home from "@/components/Home/Home";
import React, { useState, useEffect } from "react";
import LoginPage from "./login/page";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return isLoggedIn ? <Home /> : <LoginPage />;
}
