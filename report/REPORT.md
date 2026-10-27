# Kết quả chạy test EShop

- Bắt đầu: 2026-10-27 17:37:53 (UTC+07:00).
- Thời gian: 198.76 giây.
- Trạng thái runner: **failed**.
- Trình duyệt cấu hình: chrome.
- SUT: [ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut).
- Nguồn kết quả: callback thực tế của Playwright trong lần chạy này.

## Tổng hợp

| Số ca được chọn | Pass | Fail | Timeout | Skip | Interrupted | Chưa chạy | Số lần thực thi |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 35 | 15 | 19 | 1 | 0 | 0 | 0 | 35 |

| Chức năng | Ca | Pass | Fail/Timeout | Skip/Interrupted/Chưa chạy |
|---|---:|---:|---:|---:|
| Giỏ hàng | 15 | 5 | 10 | 0 |
| Thanh toán | 6 | 3 | 3 | 0 |
| Đăng nhập | 14 | 7 | 7 | 0 |

## Từng test case

| # | Chức năng | Test case | Kết quả | Giây | Vị trí source |
|---:|---|---|---|---:|---|
| 1 | Giỏ hàng | empty-cart-state | FAIL | 4.65 | tests/cart.spec.mjs:85 |
| 2 | Giỏ hàng | empty-cart-continue-shopping | PASS | 0.71 | tests/cart.spec.mjs:93 |
| 3 | Giỏ hàng | add-product-from-home | PASS | 0.78 | tests/cart.spec.mjs:101 |
| 4 | Giỏ hàng | cart-column-headings | FAIL | 4.72 | tests/cart.spec.mjs:111 |
| 5 | Giỏ hàng | merge-duplicate-product | FAIL | 4.99 | tests/cart.spec.mjs:117 |
| 6 | Giỏ hàng | sum-distinct-products | PASS | 0.91 | tests/cart.spec.mjs:130 |
| 7 | Giỏ hàng | total-label | FAIL | 4.69 | tests/cart.spec.mjs:139 |
| 8 | Giỏ hàng | increase-quantity | FAIL | 4.75 | tests/cart.spec.mjs:146 |
| 9 | Giỏ hàng | decrease-quantity | FAIL | 4.81 | tests/cart.spec.mjs:158 |
| 10 | Giỏ hàng | cancel-product-removal | FAIL | 4.87 | tests/cart.spec.mjs:172 |
| 11 | Giỏ hàng | confirm-product-removal | FAIL | 4.86 | tests/cart.spec.mjs:180 |
| 12 | Giỏ hàng | remove-last-product-shows-empty-state | PASS | 0.93 | tests/cart.spec.mjs:189 |
| 13 | Giỏ hàng | continue-shopping-retains-cart | PASS | 0.81 | tests/cart.spec.mjs:197 |
| 14 | Giỏ hàng | cart-badge-updates | FAIL | 4.62 | tests/cart.spec.mjs:208 |
| 15 | Giỏ hàng | cart-breadcrumb-navigation | FAIL | 4.81 | tests/cart.spec.mjs:220 |
| 16 | Thanh toán | guest-must-sign-in-before-checkout | TIMEOUT | 55.13 | tests/checkout.spec.mjs:57 |
| 17 | Thanh toán | checkout-shows-cart-product-and-total | PASS | 1.24 | tests/checkout.spec.mjs:71 |
| 18 | Thanh toán | checkout-total-is-not-editable | FAIL | 4.96 | tests/checkout.spec.mjs:85 |
| 19 | Thanh toán | rejects-unknown-coupon | PASS | 1.22 | tests/checkout.spec.mjs:92 |
| 20 | Thanh toán | rejects-expired-coupon | PASS | 1.16 | tests/checkout.spec.mjs:100 |
| 21 | Thanh toán | applies-seeded-percent-coupon | FAIL | 5.01 | tests/checkout.spec.mjs:108 |
| 22 | Đăng nhập | valid-login | PASS | 0.81 | tests/login.spec.mjs:47 |
| 23 | Đăng nhập | reject-wrong-password | PASS | 0.60 | tests/login.spec.mjs:57 |
| 24 | Đăng nhập | reject-unknown-email | PASS | 0.58 | tests/login.spec.mjs:62 |
| 25 | Đăng nhập | empty-email-blocked | PASS | 0.69 | tests/login.spec.mjs:67 |
| 26 | Đăng nhập | empty-password-blocked | PASS | 0.49 | tests/login.spec.mjs:81 |
| 27 | Đăng nhập | email-input-type | FAIL | 4.44 | tests/login.spec.mjs:95 |
| 28 | Đăng nhập | malformed-email-validation | FAIL | 0.70 | tests/login.spec.mjs:101 |
| 29 | Đăng nhập | password-masking | FAIL | 4.54 | tests/login.spec.mjs:108 |
| 30 | Đăng nhập | not-locked-after-two-failures | FAIL | 1.28 | tests/login.spec.mjs:114 |
| 31 | Đăng nhập | locked-after-three-failures | PASS | 1.46 | tests/login.spec.mjs:123 |
| 32 | Đăng nhập | lock-expires-after-thirty-seconds | FAIL | 32.27 | tests/login.spec.mjs:131 |
| 33 | Đăng nhập | success-breaks-failure-streak | PASS | 2.43 | tests/login.spec.mjs:141 |
| 34 | Đăng nhập | required-fields-have-markers | FAIL | 0.57 | tests/login.spec.mjs:153 |
| 35 | Đăng nhập | error-above-submit | FAIL | 0.94 | tests/login.spec.mjs:161 |

## Chi tiết lỗi

### empty-cart-state

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

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-empty-cart-state/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-empty-cart-state/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-empty-cart-state/trace.zip`

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

### cart-breadcrumb-navigation

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('navigation', { name: /breadcrumb|đường dẫn/i })
Expected: visible
Timeout: 4000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 4000ms
  - waiting for getByRole('navigation', { name: /breadcrumb|đường dẫn/i })

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cart-breadcrumb-navigation/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cart-breadcrumb-navigation/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-cart-breadcrumb-navigation/trace.zip`

### guest-must-sign-in-before-checkout

Nhóm: Thanh toán. Trạng thái: **TIMEOUT**.

```text
Test timeout of 45000ms exceeded.
```

```text
Error: locator.click: Test timeout of 45000ms exceeded.
Call log:
  - waiting for getByRole('main').getByRole('button', { name: 'Tiến hành thanh toán', exact: true })
    - locator resolved to <button class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Tiến hành thanh toán</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

- error-context (chỉ có trên máy chạy): `../test-results/artifacts/checkout-Thanh-toán-guest-must-sign-in-before-checkout/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/checkout-Thanh-toán-guest-must-sign-in-before-checkout/trace.zip`

### checkout-total-is-not-editable

Nhóm: Thanh toán. Trạng thái: **FAIL**.

```text
Error: expect(locator).not.toBeEditable() failed

Locator:  getByRole('main').getByRole('spinbutton')
Expected: not editable
Received: editable
Timeout:  4000ms

Call log:
  - Expect "not toBeEditable" with timeout 4000ms
  - waiting for getByRole('main').getByRole('spinbutton')
    12 × locator resolved to <input type="number" value="30000000" class="border p-2 rounded text-red-600 font-bold"/>
       - unexpected value "editable"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/checkout-Thanh-toán-checkout-total-is-not-editable/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/checkout-Thanh-toán-checkout-total-is-not-editable/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/checkout-Thanh-toán-checkout-total-is-not-editable/trace.zip`

### applies-seeded-percent-coupon

Nhóm: Thanh toán. Trạng thái: **FAIL**.

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('main').getByText('Áp dụng thành công! Giảm 10%', { exact: true })
Expected: visible
Timeout: 4000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 4000ms
  - waiting for getByRole('main').getByText('Áp dụng thành công! Giảm 10%', { exact: true })

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/checkout-Thanh-toán-applies-seeded-percent-coupon/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/checkout-Thanh-toán-applies-seeded-percent-coupon/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/checkout-Thanh-toán-applies-seeded-percent-coupon/trace.zip`

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
