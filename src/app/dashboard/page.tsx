"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page immediately
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Redirecting...</h1>
        <p className="text-slate-600">Please wait while we redirect you to the home page.</p>
      </div>
    </div>
  );
}
