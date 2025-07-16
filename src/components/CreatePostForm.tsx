"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

export default function CreatePostForm() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handlePost = async () => {
    if (!content.trim()) return;
    setStatus("loading");

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        "http://localhost:4000/posts",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus("success");
      setContent("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <Card className="w-full max-w-xl shadow-xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>Create a Post 📝</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="min-h-[120px]"
        />

        <Button onClick={handlePost} disabled={status === "loading"}>
          {status === "loading" ? "Posting..." : "Post"}
        </Button>

        {status === "success" && (
          <p className="text-sm text-green-600">Post created successfully!</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">Something went wrong!</p>
        )}
      </CardContent>
    </Card>
  );
}
