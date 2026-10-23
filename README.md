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

Trong workspace hiện tại `D:\KI7\testing\Seminar\SUT_Web_automation_testing`, script tự tìm SUT ở `D:\KI7\testing\eshop-sut`. Khi clone sang nơi khác, chỉ định đường dẫn tới thư mục chứa `backend` và `frontend-web`:

```powershell
$env:SUT_ROOT = 'D:\duong-dan\eshop-sut'
npm.cmd run prepare:sut
```

Script tạo bản sao riêng trong `.runtime`, bỏ qua database và chuyển duy nhất cổng backend của bản sao từ 3000 sang 3010. Nếu SUT đã có `node_modules`, script sao chép dependency vào bản chạy. Nếu chưa có dependency, cài sau khi prepare:

```powershell
npm.cmd install --prefix .runtime/backend
npm.cmd install --prefix .runtime/frontend-web
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

Playwright tự bật/tắt API `http://localhost:3010` và Web `http://localhost:5180`; hai cổng phải trống. Không cần tự mở server. Mặc định dùng Chromium đã cài; có thể dùng Chrome sẵn trên máy bằng `$env:BROWSER_CHANNEL = 'chrome'` và bỏ biến bằng `Remove-Item Env:BROWSER_CHANNEL`.

Mỗi test có browser context mới; test cần user tạo tài khoản UUID qua API thật, không dùng tài khoản cá nhân. Giỏ hàng dùng bộ nhớ React nên test đi bằng liên kết trong SPA. Các request từ UI tới API 3000 được chuyển sang 3010, không mock response. Database `.runtime` được chính SUT reset mỗi lần backend khởi động; chỉ chạy trên bản sao này.

## Kế hoạch test và nguồn expected result

Nguồn nghiệp vụ: [EShop SRS](https://github.com/ttbhanh/eshop-sut/blob/main/README.md), bản local `eshop-sut/README.md`, các mục FR-02, FR-07, FR-08 và FR-22 cho che mật khẩu. Bước thao tác/locator được khảo sát trên giao diện thật bằng CLI; expected result lấy từ SRS, không thay đổi để chấp nhận lỗi hiện có.

Seed chung: browser context mới và trang `/login`; fixture port adapter như `tests/helpers/fixtures.mjs`. Ca đăng nhập có dữ liệu user mới cho mỗi test, trừ kiểm tra thuộc tính form. Mỗi ca nằm trong một file độc lập; bước đánh số trong source tương ứng kế hoạch dưới đây.

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

HTTP 2xx/4xx, chuỗi lỗi giao diện và vị trí lưu JWT trong `localStorage.token` là hợp đồng của bản SUT được khảo sát; SRS quy định kết quả nghiệp vụ, không ấn định các chi tiết này. Bộ test không tuyên bố bao phủ toàn bộ SRS.

## Kết quả kiểm chứng local (2026-10-23)

Chạy bằng Chrome, Playwright 1.62.1 trên bản SUT cô lập:

| Chức năng | Số ca | Pass | Fail |
|---|---:|---:|---:|
| Đăng nhập | 8 | 4 | 4 |

Bốn lỗi đăng nhập quan sát được: email và mật khẩu đều có `type=text`; tài khoản bị khóa sau mới 2 lần sai; sau 31 giây vẫn chưa mở khóa. Đây là khác biệt so với FR-02/FR-22. Những ca kiểm tra sai mật khẩu, email không tồn tại, đăng nhập đúng và trạng thái khóa sau 3 lần sai đều pass. Ca khóa sau 3 lần pass không chứng minh ngưỡng khóa đúng; ca 2 lần kiểm tra riêng ngưỡng dưới.

## Đọc kết quả

HTML report ở `playwright-report/index.html`; JSON ở `test-results/results.json`; trace và screenshot lỗi ở `test-results/artifacts/`. Lệnh có exit code 1 khi có test thất bại. Phân biệt lỗi SUT vi phạm SRS với lỗi môi trường hoặc locator. Không bỏ qua test, không đổi expected theo bug và không sửa SUT để đạt pass. Assertion sau checkpoint thất bại chưa được thực thi.

Các thư mục runtime, dependency, snapshot sinh mã và report đều được Git bỏ qua. Chỉ source test, cấu hình chạy và README được đưa lên repo.

## Skill và công cụ

- [Microsoft playwright-cli skill](https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli): AI đọc kế hoạch, khảo sát qua CLI, lấy mã thao tác rồi bổ sung assertions.
- [Playwright Test](https://playwright.dev/docs/writing-tests): runner thực thi source đã lưu. `npm test` không gọi AI hay sinh test mới.
- CLI dùng trực tiếp từ dependency đã ghim: `npx.cmd playwright cli --help`; không bắt buộc cài global `playwright-cli` để chạy bộ test.
