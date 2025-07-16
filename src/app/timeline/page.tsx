"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreatePostForm from "@/components/CreatePostForm";
import AppLayout from "@/components/ui/app-layout";
import Link from "next/link";

export default function TimelinePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const fetchTimeline = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts/timeline", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching timeline:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      await axios.post(`http://localhost:4000/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTimeline(); // refresh
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleComment = async (postId: string) => {
    const text = commentInputs[postId];
    if (!text) return;

    try {
      await axios.post(
        `http://localhost:4000/posts/${postId}/comment`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      fetchTimeline(); // refresh
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  return (
    <AppLayout>
      <main className="max-w-3xl mx-auto p-4 sm:p-6">
        <h1 className="text-3xl font-semibold mb-6">📰 Timeline Feed</h1>

        <CreatePostForm />

        {loading ? (
          <p className="text-center mt-8 text-muted-foreground">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center mt-8 text-muted-foreground">
            No posts found. Start following users or create your first post!
          </p>
        ) : (
          <div className="space-y-6 mt-6">
            {posts.map((post) => (
              <Card key={post._id}>
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    {post.userID?.username || "Unknown User"} {/* ✅ FIXED */}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>{post.content}</p>

                  {/* ❤️ Like */}
                  <Button
                    variant="outline"
                    onClick={() => handleLike(post._id)}
                  >
                    ❤️ {post.likes?.length || 0} Likes
                  </Button>

                  {/* 💬 Comment input */}
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Write a comment..."
                      value={commentInputs[post._id] || ""}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post._id]: e.target.value,
                        }))
                      }
                    />
                    <Button onClick={() => handleComment(post._id)}>💬</Button>
                  </div>
                  <Link href={`/profile/${post.userId?._id}`} className="text-blue-600 hover:underline">
                       {post.userId?.username || "Unknown User"}
                    </Link>

                  {/* 📋 Comment List */}
                  {post.comments?.length > 0 && (
                    <div className="mt-3 space-y-1 border-t pt-2">
                      {post.comments.map((c: any, i: number) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          <strong>{c.userId.slice(0, 6)}</strong>: {c.text}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </AppLayout>
  );
}
