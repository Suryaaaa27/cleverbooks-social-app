"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AppLayout from "@/components/ui/app-layout";

export default function ProfilePage() {
  const { id } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<{ content: string; _id: string }[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // ✅ Get token on client only
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  // ✅ Fetch profile, posts, and current user info
  useEffect(() => {
    if (!id || !token) return;

    const fetchData = async () => {
      try {
        const resUser = await axios.get(`http://localhost:4000/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resUser.data);

        const resMe = await axios.get("http://localhost:4000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUserId(resMe.data.sub);

        const isFollowing = resUser.data.followers.includes(resMe.data.sub);
        setIsFollowing(isFollowing);

        const resPosts = await axios.get(`http://localhost:4000/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userPosts = resPosts.data.filter((p: any) => p.user === id || p.userId === id);
        setPosts(userPosts);
      } catch (err) {
        console.error("Error loading profile", err);
      }
    };

    fetchData();
  }, [id, token]);

  const handleFollowToggle = async () => {
    try {
      const url = isFollowing
        ? `http://localhost:4000/users/${id}/unfollow`
        : `http://localhost:4000/users/${id}/follow`;

      await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Follow/Unfollow error:", err);
    }
  };

  const isOwnProfile = currentUserId === id;

  return (
    <AppLayout>
      <main className="max-w-2xl mx-auto p-6">
        {!user ? (
          <p className="text-center mt-6">Loading profile...</p>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-1">👤 {user.username}</h1>
            <p className="text-muted-foreground text-sm mb-4">{user.email}</p>

            {!isOwnProfile && (
              <Button
                onClick={handleFollowToggle}
                className={isFollowing ? "bg-red-500 hover:bg-red-600" : ""}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}

            <h2 className="text-lg font-medium mt-8 mb-2">Posts</h2>
            {posts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <Card key={post._id}>
                    <CardHeader>
                      <CardTitle className="text-base">Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{post.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </AppLayout>
  );
}
