# Kết quả chạy test EShop

- Bắt đầu: 2026-10-27 14:37:21 (UTC+07:00).
- Thời gian: 68.40 giây.
- Trạng thái runner: **failed**.
- Trình duyệt cấu hình: chrome.
- SUT: [ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut).
- Nguồn kết quả: callback thực tế của Playwright trong lần chạy này.

## Tổng hợp

| Số ca được chọn | Pass | Fail | Timeout | Skip | Interrupted | Chưa chạy | Số lần thực thi |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 15 | 5 | 10 | 0 | 0 | 0 | 0 | 15 |

| Chức năng | Ca | Pass | Fail/Timeout | Skip/Interrupted/Chưa chạy |
|---|---:|---:|---:|---:|
| Giỏ hàng | 15 | 5 | 10 | 0 |

## Từng test case

| # | Chức năng | Test case | Kết quả | Giây | Vị trí source |
|---:|---|---|---|---:|---|
| 1 | Giỏ hàng | empty-cart-state | FAIL | 4.79 | tests/cart.spec.mjs:85 |
| 2 | Giỏ hàng | empty-cart-continue-shopping | PASS | 0.83 | tests/cart.spec.mjs:93 |
| 3 | Giỏ hàng | add-product-from-home | PASS | 0.76 | tests/cart.spec.mjs:101 |
| 4 | Giỏ hàng | cart-column-headings | FAIL | 4.77 | tests/cart.spec.mjs:111 |
| 5 | Giỏ hàng | merge-duplicate-product | FAIL | 4.95 | tests/cart.spec.mjs:117 |
| 6 | Giỏ hàng | sum-distinct-products | PASS | 0.91 | tests/cart.spec.mjs:130 |
| 7 | Giỏ hàng | total-label | FAIL | 4.75 | tests/cart.spec.mjs:139 |
| 8 | Giỏ hàng | increase-quantity | FAIL | 4.88 | tests/cart.spec.mjs:146 |
| 9 | Giỏ hàng | decrease-quantity | FAIL | 4.93 | tests/cart.spec.mjs:158 |
| 10 | Giỏ hàng | cancel-product-removal | FAIL | 4.95 | tests/cart.spec.mjs:172 |
| 11 | Giỏ hàng | confirm-product-removal | FAIL | 5.00 | tests/cart.spec.mjs:180 |
| 12 | Giỏ hàng | remove-last-product-shows-empty-state | PASS | 0.82 | tests/cart.spec.mjs:189 |
| 13 | Giỏ hàng | continue-shopping-retains-cart | PASS | 0.79 | tests/cart.spec.mjs:197 |
| 14 | Giỏ hàng | cart-badge-updates | FAIL | 4.56 | tests/cart.spec.mjs:208 |
| 15 | Giỏ hàng | cart-breadcrumb-navigation | FAIL | 4.91 | tests/cart.spec.mjs:220 |

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

## Giới hạn kết quả

Report chỉ phản ánh các ca được chọn trong lần chạy này, không gộp lịch sử. Một ca fail không chứng minh tất cả checkpoints của ca đều đã được chạy. Đọc assertion và trace để phân biệt lỗi SUT với lỗi test hoặc môi trường; reporter không tự kết luận nguyên nhân.

Report được ghi lại sau mỗi lần chạy, kể cả khi có test fail. JSON: [results.json](results.json). HTML cục bộ: `../playwright-report/index.html`.
