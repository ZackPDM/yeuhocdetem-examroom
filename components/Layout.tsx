"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Toast from "./Toast";

export default function Layout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-navy text-white font-dm-sans dark">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Toast />
    </div>
  );
}
