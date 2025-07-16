'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react'; // requires lucide-react

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 shadow-md z-40 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
      >
        <div className="p-6 text-xl font-semibold">🧠 SocialApp</div>
        <nav className="flex flex-col gap-4 px-6">
          <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          <Link href="/timeline" className="text-blue-600 hover:underline">Timeline</Link>
          <Link href="/post" className="text-blue-600 hover:underline">New Post</Link>
          <Link href="/search" className="text-blue-500 hover:underline">🔍 Search Users</Link>
          <button
  onClick={() => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }}
  className="text-red-500 hover:underline text-left"
>
  Logout
</button>

        </nav>
        <p className="mt-auto text-center text-xs text-zinc-400 absolute bottom-4 w-full">© 2025 Surya • All rights reserved.</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto ml-0 md:ml-64 relative">
        {/* Sidebar Toggle Button (Mobile) */}
        <button
          className="md:hidden p-4 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
