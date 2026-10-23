# Kết quả chạy test EShop

- Bắt đầu: 2026-10-23 20:41:13 (UTC+07:00).
- Thời gian: 177.75 giây.
- Trạng thái runner: **failed**.
- Trình duyệt cấu hình: chrome.
- SUT: [ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut).
- Nguồn kết quả: callback thực tế của Playwright trong lần chạy này.

## Tổng hợp

| Số ca được chọn | Pass | Fail | Timeout | Skip | Interrupted | Chưa chạy | Số lần thực thi |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 41 | 15 | 26 | 0 | 0 | 0 | 0 | 41 |

| Chức năng | Ca | Pass | Fail/Timeout | Skip/Interrupted/Chưa chạy |
|---|---:|---:|---:|---:|
| Giỏ hàng | 27 | 8 | 19 | 0 |
| Đăng nhập | 14 | 7 | 7 | 0 |

## Từng test case

| # | Chức năng | Test case | Kết quả | Giây | Vị trí source |
|---:|---|---|---|---:|---|
| 1 | Giỏ hàng | empty-cart-message | PASS | 0.56 | tests/cart.spec.mjs:99 |
| 2 | Giỏ hàng | empty-cart-illustration | FAIL | 4.49 | tests/cart.spec.mjs:107 |
| 3 | Giỏ hàng | empty-cart-continue-shopping | PASS | 0.74 | tests/cart.spec.mjs:114 |
| 4 | Giỏ hàng | add-product-from-home | PASS | 0.59 | tests/cart.spec.mjs:122 |
| 5 | Giỏ hàng | cart-column-headings | FAIL | 4.67 | tests/cart.spec.mjs:132 |
| 6 | Giỏ hàng | merge-duplicate-product | FAIL | 4.83 | tests/cart.spec.mjs:138 |
| 7 | Giỏ hàng | sum-distinct-products | PASS | 0.81 | tests/cart.spec.mjs:151 |
| 8 | Giỏ hàng | total-label | FAIL | 4.64 | tests/cart.spec.mjs:160 |
| 9 | Giỏ hàng | increase-quantity | FAIL | 4.76 | tests/cart.spec.mjs:167 |
| 10 | Giỏ hàng | decrease-quantity | FAIL | 4.82 | tests/cart.spec.mjs:179 |
| 11 | Giỏ hàng | cancel-product-removal | FAIL | 4.79 | tests/cart.spec.mjs:193 |
| 12 | Giỏ hàng | confirm-product-removal | FAIL | 4.99 | tests/cart.spec.mjs:201 |
| 13 | Giỏ hàng | remove-row-recalculates-total | PASS | 0.80 | tests/cart.spec.mjs:210 |
| 14 | Giỏ hàng | remove-last-product-shows-empty-state | PASS | 0.71 | tests/cart.spec.mjs:219 |
| 15 | Giỏ hàng | continue-shopping-retains-cart | PASS | 0.79 | tests/cart.spec.mjs:227 |
| 16 | Giỏ hàng | cart-badge-updates | FAIL | 4.54 | tests/cart.spec.mjs:238 |
| 17 | Giỏ hàng | product-detail-add-on-first-click | FAIL | 4.75 | tests/cart.spec.mjs:250 |
| 18 | Giỏ hàng | quantity-cannot-decrease-below-one | FAIL | 4.75 | tests/cart.spec.mjs:261 |
| 19 | Giỏ hàng | reject-zero-product-quantity | FAIL | 4.99 | tests/cart.spec.mjs:276 |
| 20 | Giỏ hàng | reject-negative-product-quantity | FAIL | 4.89 | tests/cart.spec.mjs:276 |
| 21 | Giỏ hàng | reject-fractional-product-quantity | FAIL | 4.78 | tests/cart.spec.mjs:276 |
| 22 | Giỏ hàng | reject-empty-product-quantity | FAIL | 4.78 | tests/cart.spec.mjs:276 |
| 23 | Giỏ hàng | home-add-shows-feedback | FAIL | 4.65 | tests/cart.spec.mjs:293 |
| 24 | Giỏ hàng | product-detail-add-shows-feedback | FAIL | 4.64 | tests/cart.spec.mjs:300 |
| 25 | Giỏ hàng | cart-breadcrumb-navigation | FAIL | 4.75 | tests/cart.spec.mjs:308 |
| 26 | Giỏ hàng | merge-different-requested-quantities | FAIL | 4.83 | tests/cart.spec.mjs:321 |
| 27 | Giỏ hàng | remove-middle-product-keeps-other-rows | PASS | 0.92 | tests/cart.spec.mjs:342 |
| 28 | Đăng nhập | valid-login | PASS | 0.58 | tests/login.spec.mjs:47 |
| 29 | Đăng nhập | reject-wrong-password | PASS | 0.54 | tests/login.spec.mjs:57 |
| 30 | Đăng nhập | reject-unknown-email | PASS | 0.63 | tests/login.spec.mjs:62 |
| 31 | Đăng nhập | empty-email-blocked | PASS | 0.56 | tests/login.spec.mjs:67 |
| 32 | Đăng nhập | empty-password-blocked | PASS | 0.73 | tests/login.spec.mjs:81 |
| 33 | Đăng nhập | email-input-type | FAIL | 4.41 | tests/login.spec.mjs:95 |
| 34 | Đăng nhập | malformed-email-validation | FAIL | 0.69 | tests/login.spec.mjs:101 |
| 35 | Đăng nhập | password-masking | FAIL | 4.51 | tests/login.spec.mjs:108 |
| 36 | Đăng nhập | not-locked-after-two-failures | FAIL | 1.16 | tests/login.spec.mjs:114 |
| 37 | Đăng nhập | locked-after-three-failures | PASS | 1.28 | tests/login.spec.mjs:123 |
| 38 | Đăng nhập | lock-expires-after-thirty-seconds | FAIL | 32.22 | tests/login.spec.mjs:131 |
| 39 | Đăng nhập | success-breaks-failure-streak | PASS | 2.10 | tests/login.spec.mjs:141 |
| 40 | Đăng nhập | required-fields-have-markers | FAIL | 0.54 | tests/login.spec.mjs:153 |
| 41 | Đăng nhập | error-above-submit | FAIL | 0.84 | tests/login.spec.mjs:161 |

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

### quantity-cannot-decrease-below-one

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) }).getByRole('button', { name: /^(-|−|Giảm|Giảm số lượng)$/i })
Expected: visible
Timeout: 4000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) }).getByRole('button', { name: /^(-|−|Giảm|Giảm số lượng)$/i })

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-quantity-cannot-decrease-below-one/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-quantity-cannot-decrease-below-one/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-quantity-cannot-decrease-below-one/trace.zip`

### reject-zero-product-quantity

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: FR-06: invalid quantity "0" must not add a row

expect(locator).toHaveCount(expected) failed

Locator:  getByRole('main').locator('tbody tr')
Expected: 0
Received: 1
Timeout:  4000ms

Call log:
  - FR-06: invalid quantity "0" must not add a row with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr')
    12 × locator resolved to 1 element
       - unexpected value "1"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-zero-product-quantity/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-zero-product-quantity/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-zero-product-quantity/trace.zip`

### reject-negative-product-quantity

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: FR-06: invalid quantity "-1" must not add a row

expect(locator).toHaveCount(expected) failed

Locator:  getByRole('main').locator('tbody tr')
Expected: 0
Received: 1
Timeout:  4000ms

Call log:
  - FR-06: invalid quantity "-1" must not add a row with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr')
    12 × locator resolved to 1 element
       - unexpected value "1"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-negative-product-quantity/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-negative-product-quantity/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-negative-product-quantity/trace.zip`

### reject-fractional-product-quantity

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: FR-06: invalid quantity "1.5" must not add a row

expect(locator).toHaveCount(expected) failed

Locator:  getByRole('main').locator('tbody tr')
Expected: 0
Received: 1
Timeout:  4000ms

Call log:
  - FR-06: invalid quantity "1.5" must not add a row with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr')
    12 × locator resolved to 1 element
       - unexpected value "1"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-fractional-product-quantity/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-fractional-product-quantity/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-fractional-product-quantity/trace.zip`

### reject-empty-product-quantity

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: FR-06: invalid quantity "" must not add a row

expect(locator).toHaveCount(expected) failed

Locator:  getByRole('main').locator('tbody tr')
Expected: 0
Received: 1
Timeout:  4000ms

Call log:
  - FR-06: invalid quantity "" must not add a row with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr')
    12 × locator resolved to 1 element
       - unexpected value "1"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-empty-product-quantity/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-empty-product-quantity/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-reject-empty-product-quantity/trace.zip`

### home-add-shows-feedback

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: FR-06 / FR-24: adding must show a toast or update the cart badge

FR-06 / FR-24: adding must show a toast or update the cart badge

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 4000ms exceeded while waiting on the predicate
```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-home-add-shows-feedback/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-home-add-shows-feedback/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-home-add-shows-feedback/trace.zip`

### product-detail-add-shows-feedback

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: FR-06 / FR-24: adding must show a toast or update the cart badge

FR-06 / FR-24: adding must show a toast or update the cart badge

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 4000ms exceeded while waiting on the predicate
```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-product-detail-add-shows-feedback/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-product-detail-add-shows-feedback/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-product-detail-add-shows-feedback/trace.zip`

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

### merge-different-requested-quantities

Nhóm: Giỏ hàng. Trạng thái: **FAIL**.

```text
Error: Setup: first addition must create a row before checking merge

expect(locator).toHaveCount(expected) failed

Locator:  getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) })
Expected: 1
Received: 0
Timeout:  4000ms

Call log:
  - Setup: first addition must create a row before checking merge with timeout 4000ms
  - waiting for getByRole('main').locator('tbody tr').filter({ has: getByRole('cell', { name: 'iPhone 15 Pro Max', exact: true }) })
    12 × locator resolved to 0 elements
       - unexpected value "0"

```

- screenshot (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-merge-different-requested-quantities/test-failed-1.png`
- error-context (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-merge-different-requested-quantities/error-context.md`
- trace (chỉ có trên máy chạy): `../test-results/artifacts/cart-Giỏ-hàng-merge-different-requested-quantities/trace.zip`

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
