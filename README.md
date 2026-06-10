# Tạo nội dung bằng AI — Vườn Tri Thức Việt

Prototype giao diện (HTML + React qua Babel standalone) cho luồng **Tạo nội dung bằng AI** trong ứng dụng giáo dục Vườn Tri Thức Việt.

## Các trang

- **`index.html`** / **`Tạo bài giảng V3.html`** — phiên bản mới nhất. Giống V2 (thiết lập theo **"Mức độ & số lượng bài tập"**, mỗi bài 10 câu tỉ lệ cố định: Dễ 7·2·1, TB 3·5·2, Khó 1·4·5) nhưng **Bài đọc · Sách nói · Video chỉ tạo một bản chung** cho cả bài học; chỉ **Bài tập** sinh theo số bài. Giao bài theo mức độ: Dễ→nhóm yếu · TB→nhóm khá · Khó→nhóm giỏi.
- **`Tạo bài giảng V2.html`** — như V3 nhưng **mỗi bài** sinh đủ Bài đọc · Sách nói · Video · Bài tập (nhân theo số bài).
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
