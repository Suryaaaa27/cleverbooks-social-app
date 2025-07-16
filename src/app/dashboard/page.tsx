"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import AppLayout from "@/components/ui/app-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
      return;
    }

    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Auth Error:", err);
        localStorage.removeItem("accessToken");
        setError("Unauthorized");
        router.push("/login");
      });
  }, [router]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.username} 👋</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">User ID: {user.userId}</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
