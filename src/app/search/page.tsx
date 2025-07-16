"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // 🔐 Get logged-in user ID
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUserId(res.data.userId); // adjust if needed
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchMe();
  }, [token]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(`http://localhost:4000/users/search?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check if each user is already followed
      const enriched = res.data.map((user: any) => ({
        ...user,
        isFollowing: user.followers?.includes(currentUserId),
      }));

      setResults(enriched);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const toggleFollow = async (targetId: string, isFollowing: boolean) => {
    const endpoint = isFollowing ? "unfollow" : "follow";

    try {
      await axios.post(`http://localhost:4000/users/${targetId}/${endpoint}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update local follow state
      setResults((prev) =>
        prev.map((u) =>
          u._id === targetId ? { ...u, isFollowing: !isFollowing } : u
        )
      );
    } catch (err) {
      console.error("Follow/unfollow failed", err);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">🔍 Search Users</h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search by username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="space-y-3">
        {results.map((user) => (
          <div key={user._id} className="p-3 border rounded bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div>
                <Link href={`/profile/${user._id}`} className="font-medium hover:underline">
                  {user.username}
                </Link>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              {currentUserId !== user._id && (
                <Button
                  variant={user.isFollowing ? "destructive" : "default"}
                  onClick={() => toggleFollow(user._id, user.isFollowing)}
                >
                  {user.isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
