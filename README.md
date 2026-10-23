# SUT Web Automation Testing

Bộ test Playwright cho EShop: **FR-02 đăng nhập, FR-07 giỏ hàng, FR-08 thanh toán**. Mỗi chức năng được bổ sung trong một commit riêng. Source được Codex AI sinh với skill Microsoft `playwright-cli`; sinh viên cần đọc, xác minh và khai báo mức sử dụng AI khi nộp bài.

## Cài đặt và chạy

Cần Node.js **22.12 trở lên**, npm, Git và source EShop gốc. Repo này chỉ chứa bộ test, không chứa ứng dụng EShop.

```powershell
git clone https://github.com/datkrb/SUT_Web_automation_testing.git
cd SUT_Web_automation_testing
npm.cmd ci
npx.cmd playwright install chromium
```

Dùng trực tiếp SUT có sẵn tại `D:\KI7\testing\eshop-sut` (tự tìm qua `../../eshop-sut`). Không sao chép SUT vào repo test. Khi clone sang nơi khác, chỉ định đường dẫn tới thư mục chứa `backend` và `frontend-web`:

```powershell
$env:SUT_ROOT = 'D:\duong-dan\eshop-sut'
```

Nếu SUT chưa có dependency, cài ngay trong SUT có sẵn:

```powershell
npm.cmd install --prefix "$env:SUT_ROOT/backend"
npm.cmd install --prefix "$env:SUT_ROOT/frontend-web"
```

Chạy bộ test hoặc riêng chức năng:

```powershell
npm.cmd test
npm.cmd run test:headed
npm.cmd run test:login
npm.cmd run test:cart
npm.cmd run test:checkout
npm.cmd run report
```

Để chạy đúng một ca:

```powershell
npx.cmd playwright test tests/login/valid-login.spec.mjs --headed
```

Playwright dùng API `http://localhost:3000` và Web `http://localhost:5180`. Nếu server đã chạy trên các cổng này, Playwright dùng lại; nếu chưa, tự khởi động từ SUT có sẵn và tắt khi test xong. Không cần tự mở server. Mặc định dùng Chromium đã cài; có thể dùng Chrome sẵn trên máy bằng `$env:BROWSER_CHANNEL = 'chrome'` và bỏ biến bằng `Remove-Item Env:BROWSER_CHANNEL`.

Mỗi test có browser context mới; test cần user tạo tài khoản UUID qua API thật, không dùng tài khoản cá nhân. Giỏ hàng dùng bộ nhớ React nên test đi bằng liên kết trong SPA. UI gọi API thật trên cổng 3000, không mock response và không có port adapter. Lưu ý cụ thể của SUT học tập: `backend/database.js` reset và seed database mỗi lần backend khởi động; khi test đăng ký/thanh toán cũng tạo dữ liệu thử nghiệm.

## Kế hoạch test và nguồn expected result

Nguồn nghiệp vụ: [EShop SRS](https://github.com/ttbhanh/eshop-sut/blob/main/README.md), bản local `eshop-sut/README.md`, các mục FR-02, FR-07, FR-08 và FR-22 cho che mật khẩu. Bước thao tác/locator được khảo sát trên giao diện thật bằng CLI; expected result lấy từ SRS, không thay đổi để chấp nhận lỗi hiện có.

Seed khảo sát qua CLI: browser context mới và trang `/login`. Khi chạy tự động, mỗi test có context mới và tự mở trang theo kế hoạch bên dưới. Fixture tạo user mới như `tests/helpers/fixtures.mjs`; các ca chỉ xem thuộc tính form hoặc giỏ hàng không cần user. Mỗi ca nằm trong một file độc lập; bước đánh số trong source tương ứng kế hoạch dưới đây.

### Đăng nhập

| File trong `tests/login/` | Bước và kết quả cần kiểm tra |
|---|---|
| `valid-login.spec.mjs` | Nhập đúng email/mật khẩu → về Home, greeting đúng user, JWT tồn tại. |
| `reject-wrong-password.spec.mjs` | Nhập sai mật khẩu → bị từ chối, lỗi chung, không token, còn ở Login. |
| `reject-unknown-email.spec.mjs` | Nhập email chưa đăng ký → bị từ chối, lỗi chung, không token. |
| `email-format-validation.spec.mjs` | Mở Login → email dùng `type=email`, email sai định dạng bị HTML5 chặn. |
| `password-masking.spec.mjs` | Mở Login → mật khẩu dùng `type=password` (FR-22). |
| `not-locked-after-two-failures.spec.mjs` | Sai 2 lần rồi nhập đúng → đăng nhập thành công vì chưa đạt ngưỡng 3. |
| `locked-after-three-failures.spec.mjs` | Sai 3 lần rồi nhập đúng ngay → vẫn bị khóa, không token. |
| `lock-expires-after-thirty-seconds.spec.mjs` | Sai 3 lần, đợi 31 giây thực rồi nhập đúng → đăng nhập thành công. Đây là kiểm tra thời gian khóa, không dùng sleep để chờ UI. |

### Giỏ hàng

Seed: context mới, giỏ trống. Sản phẩm seed là `iPhone 15 Pro Max`, ID 1; giá kỳ vọng đọc từ API sản phẩm thật.

| File trong `tests/cart/` | Bước và kết quả cần kiểm tra |
|---|---|
| `empty-cart.spec.mjs` | Mở giỏ mới → thông báo trống và link tiếp tục mua sắm. |
| `add-single-product.spec.mjs` | Từ Home thêm một sản phẩm, mở giỏ bằng link → đúng một dòng, số lượng 1 và thành tiền đúng. |
| `merge-duplicate-product.spec.mjs` | Thêm cùng sản phẩm hai lần, mở giỏ → một dòng, số lượng 2. |
| `adjust-quantity.spec.mjs` | Có một sản phẩm → bấm + rồi - → số lượng 2 rồi 1, thành tiền tương ứng. |
| `confirm-before-removing.spec.mjs` | Có một sản phẩm → bấm Xóa → có xác nhận; hủy thì dòng vẫn còn; xác nhận xóa thì giỏ trống. |
| `correct-total-label.spec.mjs` | Có một sản phẩm → hiển thị nhãn chính xác `Tổng cộng` và số tiền đúng. |

### Thanh toán

Seed: context mới; đăng nhập user UUID, thêm một sản phẩm ID 1 từ Home, đi bằng link tới Cart rồi bấm Tiến hành thanh toán. Hai ca guest bỏ qua đăng nhập.

| File trong `tests/checkout/` | Bước và kết quả cần kiểm tra |
|---|---|
| `guest-checkout-ui-rejected.spec.mjs` | Chưa đăng nhập, thêm sản phẩm, bấm thanh toán → yêu cầu đăng nhập. |
| `guest-checkout-api-rejected.spec.mjs` | Gửi checkout không token → API trả 401. |
| `order-summary.spec.mjs` | Đăng nhập, thêm một sản phẩm, mở Checkout → danh sách có đúng sản phẩm, số lượng và thành tiền. |
| `read-only-total.spec.mjs` | Mở Checkout có sản phẩm → tổng đúng giá server và không cho chỉnh trực tiếp. |
| `successful-checkout-clears-cart.spec.mjs` | Thanh toán qua UI → response thành công, banner thành công, đơn lưu đúng, quay lại giỏ phải trống. |
| `server-recalculates-total.spec.mjs` | Đăng nhập qua UI; gửi API checkout với `total_amount=1` và giá sản phẩm giả 1 → từ chối 4xx hoặc lưu đơn với tổng tính từ giá server. Không chấp nhận HTTP 200 làm bằng chứng tổng đúng. |

Ca API không token dùng hợp đồng API của bản SUT (401). Ca tổng giả kiểm tra FR-08 ở backend độc lập với widget readonly; không cần sửa DOM hay mở khóa input để gửi request. Những assertion sau checkpoint fail chưa được kiểm chứng.

HTTP 2xx/4xx, chuỗi lỗi giao diện và vị trí lưu JWT trong `localStorage.token` là hợp đồng của bản SUT được khảo sát; SRS quy định kết quả nghiệp vụ, không ấn định các chi tiết này. Bộ test không tuyên bố bao phủ toàn bộ SRS. Controls +/- thiếu trong SUT được giữ thành lỗi yêu cầu; chưa có giao diện để xác minh locator sau khi SUT bổ sung controls đó.

## Kết quả kiểm chứng local (2026-10-23)

Đã kiểm chứng bằng Chrome, Playwright 1.62.1 với SUT có sẵn tại `testing/eshop-sut`:

| Chức năng | Số ca | Pass | Fail |
|---|---:|---:|---:|
| Đăng nhập | 8 | 4 | 4 |
| Giỏ hàng | 6 | 2 | 4 |
| Thanh toán | 6 | 3 | 3 |
| **Tổng** | **20** | **9** | **11** |

Bốn lỗi đăng nhập quan sát được: email và mật khẩu đều có `type=text`; tài khoản bị khóa sau mới 2 lần sai; sau 31 giây vẫn chưa mở khóa. Đây là khác biệt so với FR-02/FR-22. Những ca kiểm tra sai mật khẩu, email không tồn tại, đăng nhập đúng và trạng thái khóa sau 3 lần sai đều pass. Ca khóa sau 3 lần pass không chứng minh ngưỡng khóa đúng; ca 2 lần kiểm tra riêng ngưỡng dưới.

Bốn lỗi giỏ hàng: thiếu controls +/−; xóa ngay không xác nhận; nhãn `Tổng tạm tính` thay vì `Tổng cộng`; thêm trùng tạo 2 dòng thay vì gộp. Empty state và thêm một sản phẩm có số lượng/thành tiền đúng đều pass.

Ba lỗi thanh toán: tổng tiền vẫn editable; backend lưu tổng giả `1` thay vì tự tính `30.000.000`; thanh toán thành công chưa xóa giỏ. Chặn guest ở UI/API và danh sách sản phẩm checkout đều pass.

Các số trên tổng hợp hai lượt chạy độc lập trên SUT có sẵn: 14 ca đăng nhập/giỏ hàng và 6 ca thanh toán, không tính đợt đăng nhập đầu dùng bản sao. HTML report luôn hiển thị lượt chạy gần nhất; chạy `npm.cmd test` để tạo report chung cho đủ 20 ca. JSON kiểm chứng local được giữ trong `test-results/verification/` và không đưa lên Git.

## Đọc kết quả

HTML report ở `playwright-report/index.html`; JSON ở `test-results/results.json`; trace và screenshot lỗi ở `test-results/artifacts/`. Lệnh có exit code 1 khi có test thất bại. Phân biệt lỗi SUT vi phạm SRS với lỗi môi trường hoặc locator. Không bỏ qua test, không đổi expected theo bug và không sửa SUT để đạt pass. Assertion sau checkpoint thất bại chưa được thực thi.

Dependency, snapshot sinh mã và report đều được Git bỏ qua. Chỉ source test, cấu hình chạy và README được đưa lên repo.

## Skill và công cụ

- [Microsoft playwright-cli skill](https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli): AI đọc kế hoạch, khảo sát qua CLI, lấy mã thao tác rồi bổ sung assertions.
- [Playwright Test](https://playwright.dev/docs/writing-tests): runner thực thi source đã lưu. `npm test` không gọi AI hay sinh test mới.
- CLI dùng trực tiếp từ dependency đã ghim: `npx.cmd playwright cli --help`; không bắt buộc cài global `playwright-cli` để chạy bộ test.
