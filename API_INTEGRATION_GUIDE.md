# 🔌 API Integration Guide - Frontend

## 📋 Tổng Quan

Tài liệu này mô tả cách frontend tích hợp với các API Critical Flows đã được implement ở backend.

---

## 1️⃣ VOUCHER VALIDATION INTEGRATION

### API Endpoints

#### Validate Voucher
```typescript
// File: front-end/src/services/apiConfig.ts
apiServices.vouchers.validate(code: string, orderAmount: number, token: string)
```

**Usage**:
```typescript
// Example: ShoppingCartPage.tsx
const validation = await apiServices.vouchers.validate(
  voucherCode.trim().toUpperCase(),
  cartTotal,
  currentToken
);

if (!validation.valid) {
  setError(validation.message || 'Mã voucher không hợp lệ');
  return;
}

// Apply voucher
setAppliedVoucher({
  code: voucherCode.trim().toUpperCase(),
  discount: validation.discount / cartTotal, // Convert to percentage
  discountAmount: validation.discount,
  voucher: validation.voucher,
});
```

#### Apply Voucher to Cart
```typescript
apiServices.cart.applyVoucher(code: string, token: string)
```

**Usage**:
```typescript
// Apply voucher to cart
await apiServices.cart.applyVoucher(voucherCode, token);
// Cart totals will be updated with discount
```

### Frontend Components

**ShoppingCartPage.tsx**:
- Validate voucher trước khi apply
- Hiển thị discount amount
- Lưu voucher vào localStorage để sử dụng ở checkout

**CheckoutPage.tsx**:
- Load voucher từ localStorage
- Hiển thị voucher discount trong order summary
- Gửi voucherCode khi tạo order

**VouchersPage.tsx**:
- Validate voucher code
- Hiển thị danh sách vouchers của user
- Copy voucher code

### Flow

```
1. User nhập voucher code
   ↓
2. Frontend validate: apiServices.vouchers.validate()
   ↓
3. Nếu valid:
   - Apply voucher: apiServices.cart.applyVoucher()
   - Lưu vào localStorage
   ↓
4. Checkout:
   - Load voucher từ localStorage
   - Hiển thị discount
   - Gửi voucherCode khi tạo order
```

---

## 2️⃣ EMAIL NOTIFICATIONS INTEGRATION

### Status: ✅ Auto-sent by Backend

**Không cần frontend integration** - Email được gửi tự động sau khi order được tạo thành công.

### Backend Flow

```
POST /api/orders
  ↓
Order created successfully
  ↓
emailService.sendOrderConfirmation() (non-blocking)
  ↓
Email sent to user.email
```

### Frontend Actions

**Không cần action** - Email được gửi tự động. Frontend chỉ cần:
- Hiển thị order success message
- Có thể thêm message: "Bạn sẽ nhận được email xác nhận đơn hàng"

**Example**:
```typescript
// OrderSuccessPage.tsx
<p className="text-gray-600">
  Bạn sẽ nhận được email xác nhận đơn hàng tại {userEmail}
</p>
```

---

## 3️⃣ INVENTORY MANAGEMENT INTEGRATION

### Status: ✅ Auto-validated by Backend

**Không cần frontend check stock** - Backend tự động validate stock khi tạo order.

### Backend Validation

```
POST /api/orders
  ↓
For each item:
  - Check SKU stock (if colorCode & sizeCode provided)
  - Fallback to Product stock
  - Reserve stock if order succeeds
  ↓
If insufficient stock:
  - Return 400 BadRequestException
  - Error message: "Insufficient stock for {product}..."
```

### Frontend Error Handling

**CheckoutPage.tsx**:
```typescript
try {
  const order = await apiServices.orders.create(orderData, token);
  // Order created successfully
} catch (err: any) {
  const errorMessage = err?.message || err?.response?.data?.message;
  
  // Check if it's a stock error
  if (errorMessage.includes('Insufficient stock')) {
    alert('Sản phẩm không còn đủ số lượng. Vui lòng kiểm tra lại giỏ hàng.');
    // Optionally reload cart
    window.location.hash = '#cart';
  } else {
    alert(errorMessage);
  }
}
```

### Stock Display (Optional)

Frontend có thể hiển thị stock status trong product detail:
```typescript
// BlankDetailPage.tsx
const [stock, setStock] = useState<number | null>(null);

useEffect(() => {
  // Load stock from product
  if (product) {
    setStock(product.stock);
  }
}, [product]);

// Display stock badge
{stock !== null && (
  <Badge className={stock > 10 ? 'bg-green-100' : stock > 0 ? 'bg-yellow-100' : 'bg-red-100'}>
    {stock > 10 ? 'Còn hàng' : stock > 0 ? `Còn ${stock} sản phẩm` : 'Hết hàng'}
  </Badge>
)}
```

---

## 4️⃣ PAYMENT INTEGRATION

### API Endpoints

#### Initiate Payment
```typescript
apiServices.payments.initiate({
  orderId: string,
  amount: number,
  paymentMethodId: string,
  description: string
}, token: string)
```

**Response**:
```typescript
{
  id: string,
  orderId: string,
  amount: number,
  status: 'pending',
  paymentUrl: string, // VNPay payment URL
  transactionId: null
}
```

#### Verify Payment
```typescript
apiServices.payments.verify(paymentId: string, transactionId: string, token: string)
```

#### Get Payment Status
```typescript
apiServices.payments.getStatus(paymentId: string, token: string)
```

### Frontend Components

**CheckoutPage.tsx**:
```typescript
// After order creation
if (paymentMethod === 'cod') {
  // Cash on Delivery - redirect to success
  window.location.hash = `#order-success?id=${order.id}`;
} else {
  // Online payment - initiate payment
  const paymentResponse = await apiServices.payments.initiate({
    orderId: order.id,
    amount: total,
    paymentMethodId: paymentMethod,
    description: `Thanh toán đơn hàng #${order.id}`,
  }, token);

  // Redirect to payment gateway
  if (paymentResponse?.paymentUrl) {
    window.location.href = paymentResponse.paymentUrl;
  }
}
```

**PaymentCallbackPage.tsx**:
```typescript
// Handle VNPay callback
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
  const vnp_TransactionNo = urlParams.get('vnp_TransactionNo');
  const vnp_TxnRef = urlParams.get('vnp_TxnRef'); // paymentId

  if (vnp_ResponseCode === '00') {
    // Payment successful
    // Verify payment
    apiServices.payments.verify(vnp_TxnRef, vnp_TransactionNo, token)
      .then(() => {
        window.location.hash = `#order-success?id=${orderId}`;
      });
  } else {
    // Payment failed
    window.location.hash = `#payment-cancel`;
  }
}, []);
```

**PaymentCancelPage.tsx**:
- Hiển thị thông báo payment cancelled
- Cung cấp options: View order, Return to cart, Go home

### Payment Flow

```
1. User clicks "Đặt hàng" in CheckoutPage
   ↓
2. Create order: POST /api/orders
   ↓
3. If paymentMethod === 'cod':
   - Redirect to #order-success
   ↓
4. If paymentMethod === 'vnpay':
   - Initiate payment: POST /api/payments/initiate
   - Redirect to paymentUrl (VNPay gateway)
   ↓
5. User pays on VNPay
   ↓
6. VNPay redirects to #payment-callback
   ↓
7. PaymentCallbackPage:
   - Parse URL params
   - Verify payment: POST /api/payments/:id/verify
   - Redirect to #order-success if success
   - Redirect to #payment-cancel if failed
```

---

## 🔄 COMPLETE CHECKOUT FLOW

### Step-by-Step Integration

```typescript
// CheckoutPage.tsx - handleCreateOrder()

// 1. Validate address
if (!selectedAddress) {
  alert('Vui lòng chọn địa chỉ giao hàng');
  return;
}

// 2. Prepare order data
const orderData = {
  items: cart.items.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
    colorCode: item.colorCode,
    sizeCode: item.sizeCode,
    designId: item.designId,
    customDesignData: item.customDesignData,
  })),
  shippingAddress: formatAddress(selectedAddress),
  paymentMethod: paymentMethod,
  notes: `Shipping: ${shippingMethod}`,
  voucherCode: appliedVoucher?.code, // Include voucher code
};

// 3. Create order
const order = await apiServices.orders.create(orderData, token);

// 4. Clear voucher from localStorage
localStorage.removeItem('appliedVoucher');

// 5. Handle payment
if (paymentMethod === 'cod') {
  window.location.hash = `#order-success?id=${order.id}`;
} else {
  const paymentResponse = await apiServices.payments.initiate({
    orderId: order.id,
    amount: total,
    paymentMethodId: paymentMethod,
    description: `Thanh toán đơn hàng #${order.id}`,
  }, token);

  if (paymentResponse?.paymentUrl) {
    window.location.href = paymentResponse.paymentUrl;
  }
}
```

---

## ✅ Integration Checklist

### Voucher Integration
- [x] Validate voucher before applying
- [x] Apply voucher to cart
- [x] Save voucher to localStorage
- [x] Load voucher in checkout
- [x] Send voucherCode when creating order
- [x] Clear voucher after order success

### Email Integration
- [x] Email auto-sent by backend (no action needed)
- [x] Display message about email confirmation

### Inventory Integration
- [x] Handle stock errors from backend
- [x] Display user-friendly error messages
- [x] Optional: Display stock status in product detail

### Payment Integration
- [x] Initiate payment after order creation
- [x] Handle payment callback
- [x] Verify payment status
- [x] Handle payment cancellation
- [x] Redirect to appropriate pages

---

## 🐛 Error Handling

### Common Errors

**1. Voucher Invalid**
```typescript
if (!validation.valid) {
  setError(validation.message || 'Mã voucher không hợp lệ');
  // Display error to user
}
```

**2. Insufficient Stock**
```typescript
catch (err: any) {
  if (err.message.includes('Insufficient stock')) {
    alert('Sản phẩm không còn đủ số lượng. Vui lòng kiểm tra lại giỏ hàng.');
    window.location.hash = '#cart';
  }
}
```

**3. Payment Failed**
```typescript
if (vnp_ResponseCode !== '00') {
  // Redirect to payment cancel page
  window.location.hash = '#payment-cancel';
}
```

**4. Order Creation Failed**
```typescript
catch (err: any) {
  const errorMessage = err?.response?.data?.message || err?.message || 'Không thể tạo đơn hàng';
  alert(errorMessage);
  // Stay on checkout page for user to retry
}
```

---

## 📝 Notes

1. **Voucher**: Luôn validate trước khi apply để tránh lỗi khi checkout
2. **Email**: Backend tự động gửi, frontend chỉ cần thông báo
3. **Stock**: Backend validate, frontend chỉ cần handle errors
4. **Payment**: Luôn verify payment sau callback để đảm bảo tính chính xác
5. **Error Messages**: Hiển thị message từ backend để user hiểu rõ lỗi

---

**Last Updated**: 2024-01-XX
**Version**: 1.0.0

