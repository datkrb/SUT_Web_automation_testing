# Kết quả chạy test EShop

- Bắt đầu: 2026-10-23 14:24:06 (UTC+07:00).
- Thời gian: 64.62 giây.
- Trạng thái runner: **failed**.
- Trình duyệt cấu hình: chrome.
- SUT: [ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut).
- Nguồn kết quả: callback thực tế của Playwright trong lần chạy này.

## Tổng hợp

| Số ca được chọn | Pass | Fail | Timeout | Skip | Interrupted | Chưa chạy | Số lần thực thi |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 14 | 7 | 7 | 0 | 0 | 0 | 0 | 14 |

| Chức năng | Ca | Pass | Fail/Timeout | Skip/Interrupted/Chưa chạy |
|---|---:|---:|---:|---:|
| Đăng nhập | 14 | 7 | 7 | 0 |

## Từng test case

| # | Chức năng | Test case | Kết quả | Giây | Vị trí source |
|---:|---|---|---|---:|---|
| 1 | Đăng nhập | valid-login | PASS | 0.96 | tests/login.spec.mjs:47 |
| 2 | Đăng nhập | reject-wrong-password | PASS | 0.63 | tests/login.spec.mjs:57 |
| 3 | Đăng nhập | reject-unknown-email | PASS | 0.61 | tests/login.spec.mjs:62 |
| 4 | Đăng nhập | empty-email-blocked | PASS | 0.66 | tests/login.spec.mjs:67 |
| 5 | Đăng nhập | empty-password-blocked | PASS | 0.62 | tests/login.spec.mjs:81 |
| 6 | Đăng nhập | email-input-type | FAIL | 4.49 | tests/login.spec.mjs:95 |
| 7 | Đăng nhập | malformed-email-validation | FAIL | 0.67 | tests/login.spec.mjs:101 |
| 8 | Đăng nhập | password-masking | FAIL | 4.61 | tests/login.spec.mjs:108 |
| 9 | Đăng nhập | not-locked-after-two-failures | FAIL | 1.39 | tests/login.spec.mjs:114 |
| 10 | Đăng nhập | locked-after-three-failures | PASS | 1.52 | tests/login.spec.mjs:123 |
| 11 | Đăng nhập | lock-expires-after-thirty-seconds | FAIL | 32.51 | tests/login.spec.mjs:131 |
| 12 | Đăng nhập | success-breaks-failure-streak | PASS | 2.18 | tests/login.spec.mjs:141 |
| 13 | Đăng nhập | required-fields-have-markers | FAIL | 0.53 | tests/login.spec.mjs:153 |
| 14 | Đăng nhập | error-above-submit | FAIL | 0.94 | tests/login.spec.mjs:161 |

## Chi tiết lỗi

### email-input-type

Nhóm: Đăng nhập. Trạng thái: **FAIL**.

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('form input').first()
Expected: "email"
Received: "text"
Timeout:  4000ms

Call log:
  - Expect "toHaveAttribute" with timeout 4000ms
  - waiting for locator('form input').first()
    12 × locator resolved to <input value="" required="" type="text" class="w-full border p-2 rounded"/>
       - unexpected value "text"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-email-input-type/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-email-input-type/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-email-input-type/trace.zip`

### malformed-email-validation

Nhóm: Đăng nhập. Trạng thái: **FAIL**.

```text
Error: FR-02 requires HTML5 email-format validation

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-malformed-email-validation/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-malformed-email-validation/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-malformed-email-validation/trace.zip`

### password-masking

Nhóm: Đăng nhập. Trạng thái: **FAIL**.

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('form input').nth(1)
Expected: "password"
Received: "text"
Timeout:  4000ms

Call log:
  - Expect "toHaveAttribute" with timeout 4000ms
  - waiting for locator('form input').nth(1)
    12 × locator resolved to <input value="" required="" type="text" class="w-full border p-2 rounded"/>
       - unexpected value "text"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-password-masking/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-password-masking/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-password-masking/trace.zip`

### not-locked-after-two-failures

Nhóm: Đăng nhập. Trạng thái: **FAIL**.

```text
Error: FR-02: two failures must not lock the account

expect(received).toBeTruthy()

Received: false
```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-not-locked-after-two-failures/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-not-locked-after-two-failures/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-not-locked-after-two-failures/trace.zip`

### lock-expires-after-thirty-seconds

Nhóm: Đăng nhập. Trạng thái: **FAIL**.

```text
Error: FR-02: lock must expire after 30 seconds

expect(received).toBeTruthy()

Received: false
```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-lock-expires-after-thirty-seconds/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-lock-expires-after-thirty-seconds/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-lock-expires-after-thirty-seconds/trace.zip`

### required-fields-have-markers

Nhóm: Đăng nhập. Trạng thái: **FAIL**.

```text
Error: FR-22: required labels missing *

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "Username",
+   "Mật khẩu",
+ ]
```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-required-fields-have-markers/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-required-fields-have-markers/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-required-fields-have-markers/trace.zip`

### error-above-submit

Nhóm: Đăng nhập. Trạng thái: **FAIL**.

```text
Error: FR-22: error must appear above the submit button

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 425
Received:    565
```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-error-above-submit/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-error-above-submit/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/login-Đăng-nhập-error-above-submit/trace.zip`

## Giới hạn kết quả

Report chỉ phản ánh các ca được chọn trong lần chạy này, không gộp lịch sử. Một ca fail không chứng minh tất cả checkpoints của ca đều đã được chạy. Đọc assertion và trace để phân biệt lỗi SUT với lỗi test hoặc môi trường; reporter không tự kết luận nguyên nhân.

Report được ghi lại sau mỗi lần chạy, kể cả khi có test fail. JSON: [results.json](results.json). HTML cục bộ: `../playwright-report/index.html`.
