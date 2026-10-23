# Playwright — kiểm thử đăng nhập và giỏ hàng EShop

Phạm vi hiện tại: **đăng nhập FR-02, form login FR-22, giỏ hàng FR-07 và các yêu cầu liên quan FR-06/FR-23/FR-24** của [EShop SUT](https://github.com/ttbhanh/eshop-sut). Expected result lấy từ SRS README của bản checkout SUT đang kiểm thử.

- [`skills/playwright-cli/SKILL.md`](skills/playwright-cli/SKILL.md): skill Microsoft dùng để khảo sát và hỗ trợ AI sinh test.
- [`tests/login.spec.mjs`](tests/login.spec.mjs): toàn bộ fixture, helper và test đăng nhập trong một file.
- [`tests/cart.spec.mjs`](tests/cart.spec.mjs): fixture, helper và 17 test giỏ hàng, mỗi ca dùng context mới.
- [`report/REPORT.md`](report/REPORT.md): kết quả lần chạy gần nhất, được đưa lên GitHub khi commit/push.
- [`report/results.json`](report/results.json): kết quả máy đọc được của cùng lượt chạy.

## 1. Dùng skill để sinh test login

Skill cần AI agent như Codex để đọc yêu cầu, thao tác qua Playwright CLI và bổ sung assertions. Có thể giao việc bằng prompt:

```text
Đọc và dùng skills/playwright-cli/SKILL.md.
SUT: https://github.com/ttbhanh/eshop-sut
Đọc SRS README.md của SUT, mục FR-02 và FR-22 áp dụng cho form login.
Chỉ sinh test đăng nhập theo kế hoạch trong README repo test; khảo sát giao diện
thật bằng Playwright CLI. Lưu fixture, helper và test vào tests/login.spec.mjs.
Giữ expected theo SRS, phân biệt lỗi test/môi trường với bug SUT.
Không sửa logic SUT và không đưa source SUT vào repo test.
Kiểm chứng, xuất kết quả Markdown và JSON vào report/; không commit/push tự động.
```

CLI sinh mã thao tác; AI thiết kế ca và assertions. Chạy test đã lưu không cần gọi AI. Nếu sinh lại test, đọc diff và đối chiếu SRS trước khi sử dụng. Phần review của sinh viên chưa được tự coi là hoàn tất.

## 2. Cài đặt

Cần Node.js **22.12 trở lên**, npm và Git. Tại thư mục repo test:

```powershell
npm.cmd ci
npx.cmd playwright install chromium
```

Dùng bản checkout [SUT](https://github.com/ttbhanh/eshop-sut) có sẵn. Nếu chưa có, ví dụ clone bên cạnh repo test:

```powershell
git clone https://github.com/ttbhanh/eshop-sut.git ../eshop-sut
$env:SUT_ROOT = (Resolve-Path '../eshop-sut').Path
npm.cmd install --prefix "$env:SUT_ROOT/backend"
npm.cmd install --prefix "$env:SUT_ROOT/frontend-web"
```

Nếu đã có SUT/dependency thì không cần clone/cài lại; đặt `SUT_ROOT` tới thư mục SUT khi nó nằm ngoài vị trí mặc định `../eshop-sut` (hai repo nằm cạnh nhau). Playwright dùng trực tiếp SUT và tự khởi động API cổng **3000**, Web cổng **5180**, hoặc dùng lại server đang chạy ở các cổng đó. Không sao chép SUT vào repo này. Backend học tập reset/seed database khi khởi động; test đăng nhập tạo tài khoản thử nghiệm riêng.

## 3. Chạy test

```powershell
npm.cmd run test:login
npm.cmd run test:cart
npm.cmd test
```

Xem trình duyệt chạy từng bước:

```powershell
npm.cmd run test:headed
```

Chạy đúng một ca hoặc liệt kê ca:

```powershell
npx.cmd playwright test --grep 'valid-login' --headed
npx.cmd playwright test --list --reporter=list
```

`npm.cmd test` chạy cả login và giỏ hàng. Mặc định dùng Chromium đã cài; muốn dùng Chrome có sẵn thì đặt `$env:BROWSER_CHANNEL = 'chrome'` trước khi chạy. Bỏ lựa chọn này bằng `Remove-Item Env:BROWSER_CHANNEL`.

## 4. Kế hoạch test login

Seed khảo sát CLI: context mới, mở `/login`, pause qua seed test. Khi chạy tự động, mỗi test có context mới; các ca cần user tạo tài khoản UUID qua API register thật để tránh dùng chung trạng thái khóa. Đây là fixture, không phải kiểm thử đăng ký.

| ID | Test | Expected chính | Nguồn |
|---|---|---|---|
| LG-01 | `valid-login` | Đúng thông tin → Home, greeting, JWT lưu client, request có Bearer token. | FR-02 |
| LG-02 | `reject-wrong-password` | Sai mật khẩu → từ chối, lỗi chung, không token. | FR-02 |
| LG-03 | `reject-unknown-email` | Email chưa đăng ký → từ chối, cùng lỗi chung, không token. | FR-02 |
| LG-04 | `empty-email-blocked` | Email rỗng → HTML required ngăn gửi form. | Điều kiện nhập Email FR-02; cơ chế required của UI khảo sát |
| LG-05 | `empty-password-blocked` | Mật khẩu rỗng → HTML required ngăn gửi form. | Điều kiện nhập Mật khẩu FR-02; cơ chế required của UI khảo sát |
| LG-06 | `email-input-type` | Email dùng type=email. | FR-02/FR-22 |
| LG-07 | `malformed-email-validation` | Email sai định dạng bị HTML5 đánh dấu typeMismatch. | FR-02 |
| LG-08 | `password-masking` | Mật khẩu dùng type=password. | FR-22 |
| LG-09 | `not-locked-after-two-failures` | Sai 2 lần rồi nhập đúng → đăng nhập được. | FR-02 |
| LG-10 | `locked-after-three-failures` | Sai 3 lần rồi nhập đúng ngay → vẫn bị khóa. | FR-02 |
| LG-11 | `lock-expires-after-thirty-seconds` | Sau 31 giây thực → đăng nhập đúng được. | FR-02 |
| LG-12 | `success-breaks-failure-streak` | Xen kẽ sai một lần và đăng nhập đúng → không tích lũy thành chuỗi 3 sai liên tiếp. | FR-02: điều kiện liên tiếp |
| LG-13 | `required-fields-have-markers` | Nhãn trường bắt buộc có dấu *. | FR-22 |
| LG-14 | `error-above-submit` | Thông báo lỗi nằm trên nút submit. | FR-22 |

HTTP status cụ thể, text lỗi, `localStorage.token` và selector fallback cho label không liên kết input là hợp đồng của bản UI/API khảo sát; SRS quyết định expected nghiệp vụ. Ca khóa chờ 31 giây thực vì kiểm tra backend, không dùng sleep để chờ UI. Không đổi expected, skip ca hay sửa SUT để làm xanh. Bộ test không tuyên bố bao phủ mọi biến thể đăng nhập; assertion sau checkpoint fail chưa được thực thi.

## 5. Kế hoạch test giỏ hàng

Khảo sát giao diện thật bằng `skills/playwright-cli/SKILL.md`. Mỗi ca có context trình duyệt riêng; fixture chỉ đọc API sản phẩm thật và chọn hai sản phẩm có giá nguyên dương. Thêm/xóa/điều hướng đều qua UI, không mock API hoặc gán trạng thái giỏ hàng. Không yêu cầu đăng nhập để kiểm thử FR-07.

| ID | Test | Expected chính | Nguồn |
|---|---|---|---|
| GH-01 | `empty-cart-message` | Context mới có thông báo giỏ trống, không có dòng hàng/nút thanh toán. | FR-07; UI khảo sát |
| GH-02 | `empty-cart-illustration` | Giỏ trống có icon/hình minh họa. | FR-07/FR-24 |
| GH-03 | `empty-cart-continue-shopping` | Link tiếp tục mua sắm về danh sách sản phẩm. | FR-07 |
| GH-04 | `add-product-from-home` | Thêm một sản phẩm: đúng tên, giá, số lượng 1 và thành tiền. | FR-07 |
| GH-05 | `cart-column-headings` | Đủ 5 cột, nhãn đơn giá là “Đơn giá”. | FR-07 |
| GH-06 | `merge-duplicate-product` | Thêm trùng: chỉ một dòng, số lượng và tiền cộng dồn. | FR-07 |
| GH-07 | `sum-distinct-products` | Thành tiền từng dòng và tổng bằng giá từ API thực. | FR-07 |
| GH-08 | `total-label` | Nhãn “Tổng cộng”, không dùng “Tổng tạm tính”. | FR-07 |
| GH-09 | `increase-quantity` | Nút + tăng số lượng, thành tiền và tổng tiền. | FR-07 |
| GH-10 | `decrease-quantity` | Tăng lên 3 rồi nút - giảm về 2, tiền cập nhật. | FR-07 |
| GH-11 | `cancel-product-removal` | Có xác nhận; hủy giữ nguyên hàng và tổng tiền. | FR-07/FR-24 |
| GH-12 | `confirm-product-removal` | Có xác nhận; đồng ý chỉ xóa dòng được chọn và tính lại tiền. | FR-07/FR-24 |
| GH-13 | `remove-row-recalculates-total` | Xóa một trong hai sản phẩm, giữ dòng còn lại và tổng đúng. | FR-07 |
| GH-14 | `remove-last-product-shows-empty-state` | Xóa dòng cuối chuyển về trạng thái trống. | FR-07 |
| GH-15 | `continue-shopping-retains-cart` | Mua tiếp về Home, thêm hàng khác và giữ sản phẩm cũ. | FR-07 |
| GH-16 | `cart-badge-updates` | Badge lần lượt 1, 2, 1 khi thêm hai sản phẩm khác nhau rồi xóa một. | FR-23 |
| GH-17 | `product-detail-add-on-first-click` | Chi tiết sản phẩm: nhập 3, bấm thêm một lần thì giỏ có số lượng 3. | FR-06/FR-07 |

GH-04–16 dùng nút thêm tại Home để kiểm tra giỏ hàng độc lập với lỗi lần bấm đầu ở trang chi tiết (GH-17). GH-13/14 chấp nhận xóa trực tiếp để kiểm tra kết quả xóa; yêu cầu dialog được kiểm tra riêng ở GH-11/12. Helper xác nhận hỗ trợ native confirm hoặc dialog có role và nút tiếng Việt/OK/Cancel. Selector, cấu trúc bảng và định dạng tiền là hợp đồng UI khảo sát; không đổi expected nghiệp vụ để làm xanh.

Phạm vi này chưa bao phủ thanh toán FR-08, lưu giỏ sau reload, mọi biến thể số lượng đầu vào, breadcrumb hay mọi hình thức feedback. SRS không quy định lưu giỏ qua reload; test dùng điều hướng nội bộ để giữ giỏ trong phiên. Một ca fail ở checkpoint đầu chưa kiểm chứng các assertion phía sau.

## 6. Xem report

Sau mỗi lượt chạy, tự cập nhật:

- `report/REPORT.md`: thời gian, tổng pass/fail, từng ca và lỗi assertion.
- `report/results.json`: kết quả JSON cùng lượt chạy.
- `playwright-report/index.html`: HTML, mở bằng `npm.cmd run report`.
- `test-results/artifacts/`: screenshot/trace cục bộ cho ca lỗi; không đưa lên Git.

Markdown và JSON trong `report/` được commit để xem trên GitHub. Screenshot/trace là bằng chứng cục bộ, đường dẫn được ghi rõ trong Markdown; chúng không phải file đã publish lên GitHub. Nếu chỉ chạy một ca, report sẽ chỉ phản ánh ca đó và ghi đè kết quả trước. Liệt kê bằng `--reporter=list` không ghi đè report.

Kết quả thực thi và assertion lỗi của lần chạy gần nhất nằm trong [report/REPORT.md](report/REPORT.md). Không retry, không đánh dấu expected-fail hoặc skip các ca phát hiện lỗi SUT. Số ca fail không tương đương số bug độc lập; nhiều ca có thể cùng bị chặn bởi một vấn đề.

JSON report dùng đường dẫn tương đối của repo thay cho đường dẫn máy cá nhân; thông tin này được ghi trong metadata. File kết quả trên GitHub là snapshot của lần kiểm chứng, chỉ thay đổi trên GitHub khi bạn commit/push kết quả chạy mới.
