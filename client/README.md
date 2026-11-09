# F11 Dashboard — bản standalone

Bản clone thư mục `client` chạy độc lập ngoài nền tảng: **giữ nguyên 100% giao diện và logic** của app, chỉ thay phần khung chạy (entry, HTTP adapter, CSS engine, trang 404/lỗi) bằng bản thay thế tương đương.

## Chạy

```bash
npm install
npm run dev        # mở http://localhost:5173
```

Build production:

```bash
npm run build      # xuất ra dist/
npm run preview    # xem thử bản build
```

## Kết nối API của bạn

Mọi request đi qua axios instance duy nhất: `src/api/http.ts` (export `axiosForBackend`).

1. **Cách nhanh (không cần CORS):** tạo file `.env` (xem `.env.example`) đặt `VITE_PROXY_TARGET=http://<may-chua-api>:<port>` — Vite dev sẽ chuyển tiếp `/api/*` sang backend của bạn.
2. **Cách trực tiếp:** đặt `VITE_API_BASE_URL=http://<origin>` — backend cần bật CORS.
3. **Thêm header (token...):** sửa `src/api/http.ts`, thêm vào `headers` hoặc gắn interceptor axios.

Các hàm gọi API nằm ở `src/api/production.ts` — endpoint hiện tại app gọi:

- `POST /api/dashboard` — trả `{ success, message, data: DashboardRecordRow[][] }` (data nhóm theo `group_name`).
- `GET /api/dashboard/injmolding` — trả `{ success, message, data: DashboardRecordRow[] }` (dòng phẳng).

Body của `POST /api/dashboard`:

```json
{
  "data": [
    { "flow": "BUTTONING-GI-F1-01", "stepNo": 540 },
    { "flow": "IRONING-GI-F1-01", "stepNo": 560 }
  ]
}
```

Ánh xạ mã chuyền FE sang các cặp `flow`/`stepNo` nằm ở
`src/config/production-lines.ts`, biến `LINE_DASHBOARD_FILTERS`.
`F11-FINISHING` dùng hai cặp ở trên. `ASSEMBLY` chưa có thông số BE;
phải bổ sung cấu hình trước khi tải dữ liệu chuyền này. FE báo lỗi rõ ràng
và không gửi request nếu chuyền chưa được cấu hình. Không suy ra flow từ mã chuyền.

Khai báo bản ghi (tên trường, kiểu dữ liệu) nằm ở `shared/api.interface.ts` — backend của bạn chỉ cần trả JSON đúng hình dạng này là app chạy nguyên trạng, không cần sửa gì thêm.

Danh sách chuyền hiển thị trên trang chủ lấy từ cấu hình FE: `src/config/production-lines.ts` (thêm/bớt chuyền ở đây).

## Khác biệt so với bản gốc (bắt buộc khi tách khỏi nền tảng)

| Hạng mục | Gốc (nền tảng) | Standalone |
|---|---|---|
| Entry | `AppContainer` của toolkit | `QueryClientProvider` + `BrowserRouter` cục bộ |
| HTTP | `getAxiosForBackend` (toolkit) | axios thường (`src/api/http.ts`), cấu hình qua `.env` |
| CSS engine | CSS của toolkit | nhúng thẳng vào đầu `src/index.css` (layer/override/font tương đương) |
| Trang 404 / lỗi | `NotFoundRender` / `ErrorRender` (toolkit) | bản cục bộ đơn giản (`src/components/platform/`) |

Toàn bộ trang, component bảng, hook phân trang/luân phiên, i18n, ảnh — copy nguyên vẹn.
