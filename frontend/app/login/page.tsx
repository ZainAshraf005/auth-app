"use client";
import { LoginForm } from "@/components/auth/login-form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");

  useEffect(() => {
    if (msg === "unauthenticated") {
      toast.error("You are not loggedIn", {
        description: "you are not authorized to go to that page",
      });
    }
  }, [msg]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
