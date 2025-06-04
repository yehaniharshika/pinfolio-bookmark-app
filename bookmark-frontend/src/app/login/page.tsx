"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3333/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        alert("Login successful!");
        router.replace("/"); 
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-pink-600">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Log In
          </button>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-pink-600 font-bold underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
