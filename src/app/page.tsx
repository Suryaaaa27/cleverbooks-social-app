"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Welcome to Surya's Social App 🚀
      </h1>

      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10">
        Connect. Share. Explore. Built with ❤️ using MERN + Next.js
      </p>

      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all text-lg">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded-full transition-all text-lg">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
