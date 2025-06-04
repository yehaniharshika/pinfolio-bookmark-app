"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const { email: storedEmail, password: storedPassword } =
        JSON.parse(storedUser);

      if (email === storedEmail && password === storedPassword) {
        // Successful login - navigate to home page
        alert("Login successful!");
        router.push("/"); // or router.push("/home") depending on your route structure
      } else {
        alert("Invalid login credentials");
      }
    } else {
      alert("No user found. Please sign up first.");
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
