# ExamRoom - Luyện Thi Online

Nền tảng luyện thi trực tuyến cho TSA, HSA, THPT Quốc Gia

## 🚀 Công nghệ

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Rendering**: KaTeX (công thức toán học)
- **Deploy**: Replit Deployments

## 📦 Cài đặt

```bash
npm install
npm run dev
```

Truy cập: [http://localhost:3000](http://localhost:3000)

## ✅ Tính năng

### Học sinh
- 🏠 Trang chủ: Danh sách đề thi, lọc theo môn/năm
- 📝 Làm bài: Hiển thị câu hỏi với LaTeX, timer countdown
- 📊 Xem kết quả: Điểm, thời gian, review từng câu
- 📚 Lịch sử: Danh sách bài đã làm
- 🔐 Auth: Đăng ký/Đăng nhập

### Admin
- 🎯 Dashboard: Quản lý đề thi
- ✏️ Tạo đề: Form Google Form style + editor LaTeX
- 🔧 Chỉnh sửa: Cập nhật đề thi
- 🗑️ Xóa: Xoá đề thi

## 🗄️ Database Schema

### exam_sets
```sql
- id (uuid, pk)
- title (text)
- subject (text)
- year (int)
- duration (int)
- total_questions (int)
- questions (jsonb)
- created_at (timestamp)
```

### submissions
```sql
- id (uuid, pk)
- user_id (uuid, fk)
- exam_set_id (uuid, fk)
- answers (jsonb)
- score (float)
- time_spent (int)
- submitted_at (timestamp)
```

## 🔐 Bảo mật

- RLS policies: User chỉ đọc submission của mình
- Không lộ đáp án khi chưa submit
- Chặn submit 2 lần cùng 1 đề

## 🎥 Setup Supabase

1. Tạo project trên [supabase.com](https://supabase.com)
2. Tạo 2 bảng: `exam_sets`, `submissions`
3. Copy URL + Anon Key vào `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Setup RLS policies
5. Push lên Replit

## 📝 TODO

- [ ] Integrate Supabase Auth
- [ ] Implement RLS policies
- [ ] Image upload to Supabase Storage
- [ ] Email verification
- [ ] Admin authentication
- [ ] Leaderboard (tuỳ chọn)
# yeuhocdetem-examroom
