# Kết quả chạy test EShop

- Bắt đầu: 2026-10-23 20:12:52 (UTC+07:00).
- Thời gian: 123.67 giây.
- Trạng thái runner: **failed**.
- Trình duyệt cấu hình: chrome.
- SUT: [ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut).
- Nguồn kết quả: callback thực tế của Playwright trong lần chạy này.

## Tổng hợp

| Số ca được chọn | Pass | Fail | Timeout | Skip | Interrupted | Chưa chạy | Số lần thực thi |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 31 | 14 | 17 | 0 | 0 | 0 | 0 | 31 |

| Chức năng | Ca | Pass | Fail/Timeout | Skip/Interrupted/Chưa chạy |
|---|---:|---:|---:|---:|
| Giỏ hàng | 17 | 7 | 10 | 0 |
| Đăng nhập | 14 | 7 | 7 | 0 |

## Từng test case

| # | Chức năng | Test case | Kết quả | Giây | Vị trí source |
|---:|---|---|---|---:|---|
| 1 | Giỏ hàng | empty-cart-message | PASS | 0.65 | tests/cart.spec.mjs:83 |
| 2 | Giỏ hàng | empty-cart-illustration | FAIL | 4.46 | tests/cart.spec.mjs:91 |
| 3 | Giỏ hàng | empty-cart-continue-shopping | PASS | 0.74 | tests/cart.spec.mjs:98 |
| 4 | Giỏ hàng | add-product-from-home | PASS | 0.63 | tests/cart.spec.mjs:106 |
| 5 | Giỏ hàng | cart-column-headings | FAIL | 4.63 | tests/cart.spec.mjs:116 |
| 6 | Giỏ hàng | merge-duplicate-product | FAIL | 4.77 | tests/cart.spec.mjs:122 |
| 7 | Giỏ hàng | sum-distinct-products | PASS | 0.75 | tests/cart.spec.mjs:135 |
| 8 | Giỏ hàng | total-label | FAIL | 4.63 | tests/cart.spec.mjs:144 |
| 9 | Giỏ hàng | increase-quantity | FAIL | 4.77 | tests/cart.spec.mjs:151 |
| 10 | Giỏ hàng | decrease-quantity | FAIL | 4.71 | tests/cart.spec.mjs:163 |
| 11 | Giỏ hàng | cancel-product-removal | FAIL | 4.81 | tests/cart.spec.mjs:177 |
| 12 | Giỏ hàng | confirm-product-removal | FAIL | 4.84 | tests/cart.spec.mjs:185 |
| 13 | Giỏ hàng | remove-row-recalculates-total | PASS | 0.82 | tests/cart.spec.mjs:194 |
| 14 | Giỏ hàng | remove-last-product-shows-empty-state | PASS | 0.61 | tests/cart.spec.mjs:203 |
| 15 | Giỏ hàng | continue-shopping-retains-cart | PASS | 0.77 | tests/cart.spec.mjs:211 |
| 16 | Giỏ hàng | cart-badge-updates | FAIL | 4.59 | tests/cart.spec.mjs:222 |
| 17 | Giỏ hàng | product-detail-add-on-first-click | FAIL | 4.75 | tests/cart.spec.mjs:234 |
| 18 | Đăng nhập | valid-login | PASS | 0.81 | tests/login.spec.mjs:47 |
| 19 | Đăng nhập | reject-wrong-password | PASS | 0.53 | tests/login.spec.mjs:57 |
| 20 | Đăng nhập | reject-unknown-email | PASS | 0.57 | tests/login.spec.mjs:62 |
| 21 | Đăng nhập | empty-email-blocked | PASS | 0.60 | tests/login.spec.mjs:67 |
| 22 | Đăng nhập | empty-password-blocked | PASS | 0.55 | tests/login.spec.mjs:81 |
| 23 | Đăng nhập | email-input-type | FAIL | 4.49 | tests/login.spec.mjs:95 |
| 24 | Đăng nhập | malformed-email-validation | FAIL | 0.72 | tests/login.spec.mjs:101 |
| 25 | Đăng nhập | password-masking | FAIL | 4.49 | tests/login.spec.mjs:108 |
| 26 | Đăng nhập | not-locked-after-two-failures | FAIL | 1.13 | tests/login.spec.mjs:114 |
| 27 | Đăng nhập | locked-after-three-failures | PASS | 1.52 | tests/login.spec.mjs:123 |
| 28 | Đăng nhập | lock-expires-after-thirty-seconds | FAIL | 32.25 | tests/login.spec.mjs:131 |
| 29 | Đăng nhập | success-breaks-failure-streak | PASS | 2.23 | tests/login.spec.mjs:141 |
| 30 | Đăng nhập | required-fields-have-markers | FAIL | 0.50 | tests/login.spec.mjs:153 |
| 31 | Đăng nhập | error-above-submit | FAIL | 0.72 | tests/login.spec.mjs:161 |

## Chi tiết lỗi

### empty-cart-illustration

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('main').locator('img, svg, [role="img"], .material-icons, .material-symbols-outlined, i[class*="fa-"]').first()
Expected: visible
Timeout: 4000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 4000ms
  - waiting for getByRole('main').locator('img, svg, [role="img"], .material-icons, .material-symbols-outlined, i[class*="fa-"]').first()

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-empty-cart-illustration/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-empty-cart-illustration/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-empty-cart-illustration/trace.zip`

### cart-column-headings

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('main').getByRole('columnheader')
Timeout: 4000ms
- Expected  - 1
+ Received  + 1

  Array [
    "Sản phẩm",
-   "Đơn giá",
+   "Giá",
    "Số lượng",
    "Thành tiền",
    "Thao tác",
  ]

Call log:
  - Expect "toHaveText" with timeout 4000ms
  - waiting for getByRole('main').getByRole('columnheader')
    12 × locator resolved to 5 elements

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cart-column-headings/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cart-column-headings/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cart-column-headings/trace.zip`

### merge-duplicate-product

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('main').locator('tbody tr')
Expected: 1
Received: 2
Timeout:  4000ms

Call log:
  - Expect "toHaveCount" with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr')
    12 × locator resolved to 2 elements
       - unexpected value "2"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-merge-duplicate-product/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-merge-duplicate-product/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-merge-duplicate-product/trace.zip`

### total-label

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('main').getByText(/^Tổng cộng:/)
Expected: visible
Timeout: 4000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 4000ms
  - waiting for getByRole('main').getByText(/^Tổng cộng:/)

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-total-label/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-total-label/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-total-label/trace.zip`

### increase-quantity

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) }).getByRole('button', { name: /^(\+|Tăng|Tăng số lượng)$/i })
Expected: visible
Timeout: 4000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) }).getByRole('button', { name: /^(\+|Tăng|Tăng số lượng)$/i })

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-increase-quantity/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-increase-quantity/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-increase-quantity/trace.zip`

### decrease-quantity

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) }).getByRole('button', { name: /^(\+|Tăng|Tăng số lượng)$/i })
Expected: visible
Timeout: 4000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) }).getByRole('button', { name: /^(\+|Tăng|Tăng số lượng)$/i })

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-decrease-quantity/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-decrease-quantity/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-decrease-quantity/trace.zip`

### cancel-product-removal

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: FR-07 / FR-24: deleting requires a confirmation dialog

FR-07 / FR-24: deleting requires a confirmation dialog

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 4000ms exceeded while waiting on the predicate
```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cancel-product-removal/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cancel-product-removal/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cancel-product-removal/trace.zip`

### confirm-product-removal

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: FR-07 / FR-24: deleting requires a confirmation dialog

FR-07 / FR-24: deleting requires a confirmation dialog

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 4000ms exceeded while waiting on the predicate
```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-confirm-product-removal/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-confirm-product-removal/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-confirm-product-removal/trace.zip`

### cart-badge-updates

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toContainText(expected) failed

Locator: locator('header a[href="/cart"]')
Expected pattern: /\b1\b/
Received string:  "Giỏ hàng"
Timeout: 4000ms

Call log:
  - Expect "toContainText" with timeout 4000ms
  - waiting for locator('header a[href="/cart"]')
    12 × locator resolved to <a href="/cart" data-discover="true" class="hover:underline">Giỏ hàng</a>
       - unexpected value "Giỏ hàng"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cart-badge-updates/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cart-badge-updates/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cart-badge-updates/trace.zip`

### product-detail-add-on-first-click

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) })
Expected: 1
Received: 0
Timeout:  4000ms

Call log:
  - Expect "toHaveCount" with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) })
    12 × locator resolved to 0 elements
       - unexpected value "0"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-product-detail-add-on-first-click/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-product-detail-add-on-first-click/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-product-detail-add-on-first-click/trace.zip`

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
