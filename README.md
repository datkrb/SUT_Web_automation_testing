# SUT Web Automation Testing

Bộ test cho **đăng nhập (FR-02), giỏ hàng (FR-07), thanh toán (FR-08)** trên [EShop SUT — repo ứng dụng được kiểm thử](https://github.com/ttbhanh/eshop-sut). [SRS của SUT](https://github.com/ttbhanh/eshop-sut/blob/main/README.md) là nguồn expected result; FR-22 bổ sung yêu cầu che mật khẩu.

Hai file chính:

- [`skills/playwright-cli/SKILL.md`](skills/playwright-cli/SKILL.md): skill `playwright-cli` của Microsoft đã dùng để khảo sát và hỗ trợ sinh test.
- [`tests/eshop.spec.mjs`](tests/eshop.spec.mjs): toàn bộ **20 test**, fixture và helper trong **một file**.

## 1. Chuẩn bị môi trường

Cần Node.js **22.12 trở lên**, npm, Git. Bước sinh test cần thêm AI agent có khả năng đọc file/chạy terminal, ví dụ Codex. Chạy test đã lưu chỉ cần Playwright.

```powershell
git clone https://github.com/datkrb/SUT_Web_automation_testing.git
cd SUT_Web_automation_testing
npm.cmd ci
npx.cmd playwright install chromium
```

Nguồn ứng dụng: [https://github.com/ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut). Nếu đã có bản checkout, dùng lại và đặt biến `SUT_ROOT` tới thư mục đó. Nếu chưa có, ví dụ clone bên cạnh repo test:

```powershell
git clone https://github.com/ttbhanh/eshop-sut.git ../eshop-sut
$env:SUT_ROOT = (Resolve-Path '../eshop-sut').Path
```

Nếu SUT chưa có dependency:

```powershell
npm.cmd install --prefix "$env:SUT_ROOT/backend"
npm.cmd install --prefix "$env:SUT_ROOT/frontend-web"
```

Config dùng trực tiếp source SUT, API `http://localhost:3000` và Web `http://localhost:5180`. Server trên các cổng này được dùng lại nếu đã chạy; nếu chưa, Playwright tự bật/tắt server. SUT học tập reset và seed database mỗi lần backend khởi động; các test đăng ký/thanh toán tạo dữ liệu thử nghiệm.

## 2. Dùng AI và skill để sinh bộ test

Skill là hướng dẫn cho AI agent. Gõ lệnh CLI đơn lẻ không tự thiết kế đầy đủ test; AI đọc SRS, khảo sát trang bằng CLI, thu mã thao tác và bổ sung assertions. Repo kèm skill `playwright-cli` của Microsoft; chỉ đổi link tài liệu tham khảo sang GitHub để không phải chép thêm nhiều file. Có thể yêu cầu AI đọc trực tiếp đường dẫn skill, không cần cài global.

Mở repo test trong Codex và gửi:

```text
Đọc và làm theo skills/playwright-cli/SKILL.md.
SUT: https://github.com/ttbhanh/eshop-sut
Đọc SRS trong README.md của repo SUT.
Sinh/cập nhật bộ test cho đăng nhập FR-02, giỏ hàng FR-07, thanh toán FR-08
và kiểm tra che mật khẩu FR-22 theo kế hoạch trong README của repo test.
Khảo sát giao diện thật bằng Playwright CLI. Lưu toàn bộ fixture, helper
và 20 test trong tests/eshop.spec.mjs, giữ ba nhóm Đăng nhập/Giỏ hàng/Thanh toán.
Giữ expected theo SRS, ghi rõ bug; không sửa logic SUT hay đưa source SUT vào repo test.
Kiểm chứng test và cập nhật kết quả thật; không commit/push trong lần sinh này.
```

Hoặc giao cùng công việc qua PowerShell với Codex CLI đã đăng nhập:

```powershell
codex exec --sandbox workspace-write 'Đọc skills/playwright-cli/SKILL.md và README.md. SUT: https://github.com/ttbhanh/eshop-sut; đọc SRS README.md của repo SUT. Khảo sát bằng Playwright CLI rồi sinh/cập nhật đúng 20 test của kế hoạch trong một file tests/eshop.spec.mjs, kèm fixture/helper bên trong. Kiểm chứng và ghi kết quả thật; không sửa logic SUT hay đưa source SUT vào repo test, không commit/push.'
```

Các bước AI thực hiện: đọc yêu cầu/kế hoạch → khảo sát qua seed test và CLI → viết test cùng assertions → rà soát và chạy kiểm chứng → phân loại fail và cập nhật README. Có thể xem lệnh CLI bằng `npx.cmd playwright cli --help`.

**Sau khi sinh:** đọc diff của `tests/eshop.spec.mjs`, đối chiếu expected với SRS rồi chạy bộ test theo phần 3. Đây là [skill Microsoft playwright-cli](https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli) đã dùng cho bộ test ban đầu. Yêu cầu gộp toàn bộ ca/helper vào một file ở prompt này được ưu tiên hơn quy ước một test mỗi file trong tài liệu tham khảo của skill. Review của AI không thay cho review của sinh viên.

## 3. Chạy bộ test đã sinh

```powershell
npm.cmd test
npm.cmd run test:headed
```

Chạy riêng từng tính năng trong cùng file:

```powershell
npm.cmd run test:login
npm.cmd run test:cart
npm.cmd run test:checkout
```

Chạy đúng một ca và mở report:

```powershell
npx.cmd playwright test --grep 'valid-login' --headed
npm.cmd run report
```

Mặc định dùng Chromium đã cài. Để dùng Chrome có sẵn:

```powershell
$env:BROWSER_CHANNEL = 'chrome'
npm.cmd test
```

Bỏ lựa chọn Chrome bằng `Remove-Item Env:BROWSER_CHANNEL`. Chạy `npm test` chỉ thực thi source đã lưu, không gọi AI hay sinh test mới.

Mỗi test có context mới; tài khoản UUID được tạo qua API thật khi cần. Giỏ dùng bộ nhớ React nên điều hướng bằng link SPA sau khi thêm sản phẩm. Không mock response. Ca kiểm tra hết khóa đợi **31 giây thực** theo yêu cầu khóa 30 giây của backend; không dùng sleep để chờ UI.

## 4. Kế hoạch 20 ca trong một file

Mọi tên dưới đây là tên `test(...)` trong `tests/eshop.spec.mjs`, không phải tên file riêng.

| Nhóm | Tên ca | Expected chính theo SRS |
|---|---|---|
| Đăng nhập | `valid-login` | Đúng thông tin → Home, greeting đúng user, có JWT. |
| Đăng nhập | `reject-wrong-password` | Sai mật khẩu → từ chối, lỗi chung, không token. |
| Đăng nhập | `reject-unknown-email` | Email chưa đăng ký → từ chối, không lộ nguyên nhân, không token. |
| Đăng nhập | `email-format-validation` | `type=email`, HTML5 chặn email sai định dạng. |
| Đăng nhập | `password-masking` | `type=password` theo FR-22. |
| Đăng nhập | `not-locked-after-two-failures` | Sai 2 lần rồi nhập đúng → vẫn đăng nhập được. |
| Đăng nhập | `locked-after-three-failures` | Sai 3 lần rồi nhập đúng ngay → vẫn bị khóa. |
| Đăng nhập | `lock-expires-after-thirty-seconds` | Sai 3 lần, đợi 31 giây rồi nhập đúng → thành công. |
| Giỏ hàng | `empty-cart` | Giỏ mới → empty state, có link tiếp tục mua. |
| Giỏ hàng | `add-single-product` | Thêm một sản phẩm → một dòng, quantity 1, thành tiền đúng. |
| Giỏ hàng | `merge-duplicate-product` | Thêm trùng → một dòng, quantity 2. |
| Giỏ hàng | `adjust-quantity` | Controls +/− đổi quantity 2 rồi 1, thành tiền cập nhật. |
| Giỏ hàng | `confirm-before-removing` | Xóa có xác nhận; hủy giữ dòng, xác nhận thì xóa. |
| Giỏ hàng | `correct-total-label` | Nhãn chính xác `Tổng cộng`, số tiền đúng. |
| Thanh toán | `guest-checkout-ui-rejected` | Guest bấm thanh toán → yêu cầu đăng nhập. |
| Thanh toán | `guest-checkout-api-rejected` | Checkout không token → API từ chối (401). |
| Thanh toán | `order-summary` | Đúng sản phẩm, quantity và thành tiền. |
| Thanh toán | `read-only-total` | Tổng tự tính, không chỉnh trực tiếp được. |
| Thanh toán | `successful-checkout-clears-cart` | Thanh toán thành công, đơn lưu đúng và giỏ được xóa. |
| Thanh toán | `server-recalculates-total` | Tổng/giá giả → từ chối hoặc lưu tổng backend tự tính. |

Sản phẩm seed: `iPhone 15 Pro Max`, ID 1; giá chuẩn đọc từ API thật. Ca giả tổng đọc lại đơn của chính user, không chỉ tin HTTP 200 hay banner thành công. HTTP status cụ thể, chuỗi giao diện và `localStorage.token` là hợp đồng của bản SUT khảo sát; SRS xác định kết quả nghiệp vụ. Các controls +/− đang thiếu: locator cho giao diện sau khi bổ sung chưa được kiểm chứng. Bộ test không bao phủ toàn bộ SRS; checkpoint sau assertion fail chưa chạy đến.

## 5. Kết quả và cách đọc report

Kết quả kiểm chứng **trước khi gộp file**, ngày 2026-10-23, Chrome/Playwright 1.62.1, SUT có sẵn:

| Chức năng | Ca | Pass | Fail |
|---|---:|---:|---:|
| Đăng nhập | 8 | 4 | 4 |
| Giỏ hàng | 6 | 2 | 4 |
| Thanh toán | 6 | 3 | 3 |
| **Tổng** | **20** | **9** | **11** |

Các lỗi quan sát: email/mật khẩu dùng `type=text`; khóa sau mới 2 lần sai và sau 31 giây vẫn khóa; giỏ thiếu +/−, xóa không xác nhận, sai nhãn tổng, thêm trùng thành 2 dòng; tổng checkout vẫn editable, backend lưu tổng giả `1`, thanh toán thành công chưa xóa giỏ. Không đổi expected hay skip test để làm xanh.

Các số trên tổng hợp hai lượt chạy độc lập 14 ca và 6 ca, không tính lượt đầu dùng bản sao SUT. Việc gộp giữ nguyên nội dung 20 ca; kết quả kiểm chứng sau gộp được ghi bên dưới.

Sau khi gộp: đã đối chiếu nguyên vẹn nội dung 20 ca; Playwright nhận **20 test trong 1 file**, các npm scripts lọc đúng **8/6/6** ca. Chạy smoke `valid-login`, `add-single-product`, `order-summary`: **3/3 pass**. Không chạy lại toàn bộ 20 ca trong lần chỉ gộp file này; số 9 pass/11 fail ở bảng là kết quả trước gộp.

HTML: `playwright-report/index.html`; JSON: `test-results/results.json`; trace/screenshot lỗi: `test-results/artifacts/`. Report hiển thị lượt chạy gần nhất; chạy `npm.cmd test` để tạo report chung cho 20 ca. Exit code 1 nghĩa là có test fail; đọc lỗi để phân biệt vi phạm SRS với lỗi môi trường/locator.

Repo chỉ lưu **một file test, một file skill, README và cấu hình npm/Playwright cần chạy**. SUT, dependency, AI log và report không được commit. Nguồn công cụ: [Microsoft playwright-cli](https://github.com/microsoft/playwright-cli), [Playwright Test](https://playwright.dev/docs/writing-tests).
