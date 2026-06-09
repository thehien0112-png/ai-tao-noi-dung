# Tạo nội dung bằng AI — Vườn Tri Thức Việt

Prototype giao diện (HTML + React qua Babel standalone) cho luồng **Tạo nội dung bằng AI** trong ứng dụng giáo dục Vườn Tri Thức Việt.

## Các trang

- **`index.html`** / **`Tạo bài giảng V2.html`** — phiên bản mới nhất. Thiết lập theo **"Mức độ & số lượng bài"** (chọn số bài Dễ/TB/Khó; mỗi bài = 10 câu hỏi theo tỉ lệ cố định: Dễ 7·2·1, TB 3·5·2, Khó 1·4·5). Mỗi bài sinh đủ **Bài đọc · Sách nói · Video · Bài tập**, hiển thị dạng danh sách đóng/mở. Giao bài tự động theo mức độ: Dễ→nhóm yếu · TB→nhóm khá · Khó→nhóm giỏi.
- **`Tạo bài giảng.html`** — bản gốc: tạo nội dung bằng AI (Bài đọc · Sách nói · Video · Bài tập) dạng accordion, giao bài theo nhóm kiểu nâng dần độ khó, lịch sử phiên bản, chọn giọng đọc.
- **`Thư viện.html`** — thư viện nội dung đã tạo, lọc/tìm/giao bài thẳng từ thư viện.
- **`Tạo bài học bằng AI.html`** — trình hướng dẫn (wizard) chọn tiết từ file phân phối chương trình.

## Xem online

Trang được host bằng **GitHub Pages** — mở đường link Pages của repo (file `index.html` là trang chính).

## Chạy cục bộ

Vì các file `.jsx` được nạp qua `<script type="text/babel" src=...>`, cần chạy qua một web server (không mở trực tiếp bằng `file://`):

```bash
python -m http.server 8000
# rồi mở http://localhost:8000
```

> Đây là bản prototype tương tác để duyệt luồng/giao diện — phần đọc file và sinh nội dung bằng AI là mô phỏng.
