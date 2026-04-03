"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";

export default function AuthPage() {
  const router = useRouter();
  const { user, signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Email không hợp lệ. Vui lòng nhập đúng định dạng email");
        setLoading(false);
        return;
      }

      // Validate password length
      if (password.length < 6) {
        toast.error("Mật khẩu phải có ít nhất 6 ký tự");
        setLoading(false);
        return;
      }

      if (!isLogin && password !== confirmPassword) {
        toast.error("Mật khẩu không trùng khớp");
        setLoading(false);
        return;
      }

      if (isLogin) {
        await signIn(email.trim(), password);
        toast.success("Đăng nhập thành công!");
      } else {
        await signUp(email.trim(), password);
        toast.success("Đăng ký thành công! Vui lòng xác nhận email.");
      }

      router.push("/");
    } catch (error: any) {
      const errorMsg = error.message || (isLogin ? "Đăng nhập thất bại" : "Đăng ký thất bại");
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-syne text-gold">ExamRoom</h1>
          <p className="text-gray-300 mt-2">Luyện thi online</p>
        </div>

        {/* Form */}
        <div className="bg-navy/50 border border-gold/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold font-syne text-gold mb-6 text-center">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                required
                className="w-full px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                placeholder="admin@exam.com"
              />
              <p className="text-xs text-gray-400 mt-1">Ví dụ: admin@exam.com</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-navy font-semibold py-2 rounded hover:bg-yellow-500 disabled:opacity-50 transition-colors mt-6"
            >
              {loading
                ? "Đang xử lý..."
                : isLogin
                ? "Đăng nhập"
                : "Đăng ký"}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="text-gold hover:text-yellow-500 font-semibold ml-2"
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gold hover:text-yellow-500 text-sm">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
