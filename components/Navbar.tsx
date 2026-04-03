"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Đăng xuất thành công");
      router.push("/");
    } catch (error) {
      toast.error("Đăng xuất thất bại");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-navy border-b border-gold/20 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-syne text-gold">
          ExamRoom
        </Link>

        <div className="flex gap-6 items-center">
          <Link
            href="/"
            className="hover:text-gold transition-colors"
          >
            Trang chủ
          </Link>
          <Link
            href="/history"
            className="hover:text-gold transition-colors"
          >
            Lịch sử
          </Link>

          {!loading && user ? (
            <>
              <a href="/admin" className="hover:text-gold transition-colors">
                Quản lý
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gold text-navy rounded hover:bg-yellow-500 transition-colors"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="px-4 py-2 bg-gold text-navy rounded hover:bg-yellow-500 transition-colors"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
