# 📋 PHÂN TÍCH CÁC PAGES CÒN THIẾU

## ✅ CÁC PAGES ĐÃ CÓ

1. **Home** - Trang chủ
2. **BlanksListingPage** - Danh sách sản phẩm blank
3. **BlankDetailPage** - Chi tiết sản phẩm blank
4. **DesignGalleryPage** - Gallery designs
5. **DesignDetailPage** - Chi tiết design
6. **ShoppingCartPage** - Giỏ hàng
7. **UserDashboardPage** - Dashboard user (có tabs nhưng chưa đầy đủ)
8. **CustomizerPage** - Customizer
9. **CheckoutPage** - Checkout
10. **OrderSuccessPage** - Trang thành công sau khi đặt hàng
11. **LoginPage** - Đăng nhập
12. **RegisterPage** - Đăng ký
13. **ForgotPasswordPage** - Quên mật khẩu
14. **AboutGreenPage** - Về chúng tôi
15. **HelpPage** - Trợ giúp
16. **ContactPage** - Liên hệ
17. **AdminDashboard** - Dashboard admin

---

## ❌ CÁC PAGES CÒN THIẾU

### 1️⃣ **ORDERS MODULE** - `/orders`

#### ❌ OrdersListPage
- **API:** `GET /api/orders?page=1&limit=10&status=completed`
- **Mô tả:** Trang danh sách tất cả orders của user
- **Features:**
  - Hiển thị danh sách orders với pagination
  - Filter theo status (pending, processing, shipped, delivered, cancelled)
  - Sort theo date, total
  - Click vào order để xem chi tiết
- **Route:** `#orders` hoặc `#dashboard?tab=orders`

#### ❌ OrderDetailPage
- **API:** `GET /api/orders/:id`
- **Mô tả:** Trang chi tiết 1 order
- **Features:**
  - Hiển thị thông tin order (items, total, status, dates)
  - Hiển thị shipping address
  - Hiển thị payment info
  - Button để track order
  - Button để cancel order (nếu chưa shipped)
- **Route:** `#order-detail?id=:orderId`

#### ❌ OrderTrackingPage
- **API:** `GET /api/orders/:id/tracking` hoặc `GET /api/shipments/order/:orderId`
- **Mô tả:** Trang tracking đơn hàng
- **Features:**
  - Hiển thị timeline tracking events
  - Hiển thị tracking number
  - Hiển thị carrier info
  - Hiển thị estimated delivery date
  - Map location (nếu có)
- **Route:** `#order-tracking?id=:orderId` hoặc `#order-detail?id=:orderId&tab=tracking`

---

### 2️⃣ **FAVORITES MODULE** - `/favorites`

#### ❌ FavoritesPage
- **API:** `GET /api/favorites`, `DELETE /api/favorites/:favoriteId`
- **Mô tả:** Trang riêng để xem và quản lý favorites
- **Features:**
  - Hiển thị danh sách favorite designs
  - Remove favorite
  - Add to cart từ favorite
  - Filter/sort favorites
- **Route:** `#favorites` hoặc `#dashboard?tab=favorites`

---

### 3️⃣ **REWARDS MODULE** - `/rewards`

#### ❌ RewardsPage
- **API:** `GET /api/rewards/balance`, `GET /api/rewards/history`, `POST /api/rewards/redeem`
- **Mô tả:** Trang quản lý reward points
- **Features:**
  - Hiển thị balance (available, pending, total)
  - Hiển thị history với pagination
  - Redeem points (chọn reward và redeem)
  - Filter history theo type
- **Route:** `#rewards` hoặc `#dashboard?tab=rewards`

---

### 4️⃣ **VOUCHERS MODULE** - `/vouchers`

#### ❌ VouchersPage
- **API:** `GET /api/vouchers`, `POST /api/vouchers/validate`
- **Mô tả:** Trang quản lý vouchers
- **Features:**
  - Hiển thị danh sách vouchers (available, used, expired)
  - Copy voucher code
  - Validate voucher code
  - Filter theo status
- **Route:** `#vouchers` hoặc `#dashboard?tab=vouchers`

---

### 5️⃣ **ADDRESSES MODULE** - `/addresses`

#### ❌ AddressesPage
- **API:** `GET /api/addresses`, `POST /api/addresses`, `PATCH /api/addresses/:id`, `DELETE /api/addresses/:id`
- **Mô tả:** Trang quản lý addresses
- **Features:**
  - Hiển thị danh sách addresses
  - Add new address
  - Edit address
  - Delete address
  - Set default address
- **Route:** `#addresses` hoặc `#dashboard?tab=addresses`

---

### 6️⃣ **REVIEWS MODULE** - `/reviews`

#### ⚠️ ReviewsPage (Optional)
- **API:** `GET /api/reviews/product/:productId`, `POST /api/reviews`, `PATCH /api/reviews/:id`, `DELETE /api/reviews/:id`
- **Mô tả:** Trang để xem và quản lý reviews của user
- **Features:**
  - Hiển thị reviews của user
  - Edit/delete review
  - View product reviews (có thể tích hợp vào product detail page)
- **Route:** `#reviews` hoặc `#dashboard?tab=reviews`
- **Note:** Reviews có thể được tích hợp vào BlankDetailPage, nhưng nên có page riêng để user quản lý reviews của mình

---

### 7️⃣ **ADMIN MODULE** - Admin Pages

#### ❌ InventoryManagementPage
- **API:** `GET /api/inventory/stock`, `POST /api/inventory/stock/:skuId/inbound`, etc.
- **Mô tả:** Trang quản lý inventory
- **Features:**
  - Hiển thị stock levels
  - Inbound/outbound stock
  - Reserve/release stock
  - View stock movements history
- **Route:** `#admin?tab=inventory`

#### ❌ PackagingManagementPage
- **API:** CRUD `/api/packaging`
- **Mô tả:** Trang quản lý packaging
- **Features:**
  - List all packaging
  - Create/Edit/Delete packaging
- **Route:** `#admin?tab=packaging`

#### ❌ CatalogManagementPages
- **API:** CRUD `/api/sizes`, `/api/materials`, `/api/print-methods`
- **Mô tả:** Trang quản lý catalogs (sizes, materials, print methods)
- **Features:**
  - Tabs cho từng catalog type
  - CRUD operations cho mỗi catalog
- **Route:** `#admin?tab=catalogs`

#### ❌ ReturnReasonsManagementPage
- **API:** CRUD `/api/return-reasons`
- **Mô tả:** Trang quản lý return reasons
- **Features:**
  - List all return reasons
  - Create/Edit/Delete return reasons
- **Route:** `#admin?tab=return-reasons`

#### ❌ EmployeesManagementPage
- **API:** CRUD `/api/employees`
- **Mô tả:** Trang quản lý employees
- **Features:**
  - List all employees
  - Create/Edit/Delete employees
  - View employee details
- **Route:** `#admin?tab=employees`

#### ❌ AssetsManagementPage
- **API:** CRUD `/api/assets`, `POST /api/assets/:id/dispose`, `GET /api/assets/:id/disposals`
- **Mô tả:** Trang quản lý assets
- **Features:**
  - List all assets
  - Upload new asset
  - Edit/Delete asset
  - Dispose asset (ghi log tiêu hủy)
  - View disposal history
- **Route:** `#admin?tab=assets`

---

## 📊 TỔNG KẾT

### User Pages (Customer-facing):
1. ❌ OrdersListPage
2. ❌ OrderDetailPage
3. ❌ OrderTrackingPage
4. ❌ FavoritesPage
5. ❌ RewardsPage
6. ❌ VouchersPage
7. ❌ AddressesPage
8. ⚠️ ReviewsPage (optional, có thể tích hợp vào product detail)

### Admin Pages:
1. ❌ InventoryManagementPage
2. ❌ PackagingManagementPage
3. ❌ CatalogManagementPages (Sizes/Materials/Print Methods)
4. ❌ ReturnReasonsManagementPage
5. ❌ EmployeesManagementPage
6. ❌ AssetsManagementPage

**Tổng cộng:** ~14 pages còn thiếu (7 user pages + 6 admin pages + 1 optional)

---

## 🎯 ĐỀ XUẤT ƯU TIÊN

### Priority 1 (High - Core Features):
1. **OrdersListPage** - User cần xem orders của mình
2. **OrderDetailPage** - User cần xem chi tiết order
3. **OrderTrackingPage** - User cần track orders
4. **AddressesPage** - User cần quản lý addresses

### Priority 2 (Medium - Nice to have):
5. **FavoritesPage** - User cần xem favorites riêng
6. **RewardsPage** - User cần xem và redeem rewards
7. **VouchersPage** - User cần xem vouchers

### Priority 3 (Low - Admin only):
8. **InventoryManagementPage**
9. **PackagingManagementPage**
10. **CatalogManagementPages**
11. **ReturnReasonsManagementPage**
12. **EmployeesManagementPage**
13. **AssetsManagementPage**

### Optional:
14. **ReviewsPage** - Có thể tích hợp vào product detail page

