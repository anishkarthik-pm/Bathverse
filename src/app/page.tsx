"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export default function RootPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      router.replace("/home");
    } else if (user.role === "customer") {
      router.replace("/app/track");
    } else {
      router.replace("/ops/leads");
    }
  }, [user, router]);

  return null;
}
