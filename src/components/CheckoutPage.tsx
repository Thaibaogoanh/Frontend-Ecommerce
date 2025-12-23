import imgRectangle18 from "../imports/figma:asset/ec5dee110611d8fa4386b7342909242db3aabd49.png";
import imgRectangle17 from "../imports/figma:asset/5de3554431d6c0f521e30ae15d7346a37c0da80e.png";
import { Header } from './Header';
import { Footer } from './Footer';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  ChevronRight,
  Leaf,
  Truck,
  CreditCard,
  MapPin,
  Check,
  ShieldCheck,
  AlertCircle,
  Plus
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { apiServices } from '../services/apiConfig';
import { useAuth } from '../hooks/useAuth';
import { Loading } from './ui/loading';
import { ErrorDisplay } from './ui/error';
import { toast } from "sonner";

interface CheckoutStep {
  number: number;
  title: string;
  completed: boolean;
}

export function CheckoutPage() {
  const { token, isLoading: authLoading, getToken } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [useGreenPoints, setUseGreenPoints] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
      const [showAddressForm, setShowAddressForm] = useState(false);
  const [cart, setCart] = useState<any>(null);
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number; discountAmount?: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const hasLoadedRef = useRef(false); // Để tránh gọi API nhiều lần

  const steps: CheckoutStep[] = [
    { number: 1, title: "Địa chỉ giao hàng", completed: currentStep > 1 },
    { number: 2, title: "Phương thức giao hàng", completed: currentStep > 2 },
    { number: 3, title: "Thanh toán", completed: false },
  ];

  useEffect(() => {
    // Đợi auth loading xong trước khi check token
    // Chỉ load data một lần khi auth loading xong
    if (!authLoading && !hasLoadedRef.current) {
      const currentToken = getToken(); // Lấy token từ localStorage nếu token state chưa có
      if (currentToken) {
        hasLoadedRef.current = true; // Đánh dấu đã load
        loadData();
      } else {
        window.location.hash = '#login';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]); // Chỉ phụ thuộc vào authLoading để tránh spam API calls

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentToken = getToken(); // Lấy token từ localStorage
      if (!currentToken) {
        window.location.hash = '#login';
        return;
      }

      const [cartData, addressesData] = await Promise.all([
        apiServices.cart.get(currentToken),
        apiServices.addresses.getAll(currentToken)
      ]);

      setCart(cartData);
      // Response là Address[] trực tiếp
      const addressesList = Array.isArray(addressesData) ? addressesData : [];
      setAddresses(addressesList);
      if (addressesList.length > 0) {
        const defaultAddr = addressesList.find((a: any) => a.is_default) || addressesList[0];
        setSelectedAddress(defaultAddr);
      } else {
        setShowAddressForm(true);
      }
      
      // Load applied voucher từ localStorage
      const savedVoucher = localStorage.getItem('appliedVoucher');
      if (savedVoucher) {
        try {
          setAppliedVoucher(JSON.parse(savedVoucher));
        } catch (e) {
          localStorage.removeItem('appliedVoucher');
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Không thể tải dữ liệu thanh toán';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    try {
      setCreatingOrder(true);
      setError(null);
      const currentToken = getToken();
      if (!currentToken || !cart || !selectedAddress) {
        const msg = 'Vui lòng điền đầy đủ các trường bắt buộc';
        setError(msg);
        toast.error(msg);
        if (!currentToken) {
          window.location.hash = '#login';
        }
        return;
      }

      if (!cart.items || cart.items.length === 0) {
        const msg = 'Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng.';
        setError(msg);
        toast.error(msg);
        return;
      }

      // Tính toán tổng tiền
      const subtotal = cart?.totalAmount || cart?.total || 0;
      const shippingCost = shippingMethod === "express" ? 50000 : (subtotal >= 500000 ? 0 : 30000);
      const voucherDiscount = appliedVoucher 
        ? (appliedVoucher.discountAmount || (subtotal * appliedVoucher.discount))
        : 0;
      const greenPointsDiscount = useGreenPoints ? 50000 : 0;
      const total = Math.max(0, subtotal - voucherDiscount + shippingCost - greenPointsDiscount);

      // Format order data theo API requirements
      const orderData = {
        items: cart.items.map((item: any) => {
          // Ensure price is a valid number > 0
          const price = parseFloat(item.price || item.unit_price_snapshot || item.product?.price || 0);
          if (price <= 0) {
            throw new Error(`Invalid price for product ${item.productId}. Price must be greater than 0.`);
          }
          return {
            productId: item.productId,
            quantity: item.quantity || item.qty || 1,
            price: price,
            colorCode: item.colorCode,
            sizeCode: item.sizeCode,
            designId: item.designId,
            customDesignData: item.customDesignData, // Include custom design data from cart
          };
        }),
        shippingAddress: selectedAddress.line1 
          ? `${selectedAddress.line1}${selectedAddress.line2 ? ', ' + selectedAddress.line2 : ''}, ${selectedAddress.state || ''}, ${selectedAddress.country || 'Vietnam'} ${selectedAddress.zip || ''}`
          : 'Address not specified',
        paymentMethod: paymentMethod,
        notes: `Shipping: ${shippingMethod === 'express' ? 'Express' : 'Standard'}`,
        voucherCode: appliedVoucher?.code,
      };

      console.log('Creating order with data:', orderData);
      const order = await apiServices.orders.create(orderData, currentToken) as any;
      console.log('Order created:', order);
      toast.success('Tạo đơn hàng thành công');
      
      // Clear cart và voucher sau khi đặt hàng thành công
      try {
        await apiServices.cart.clear(currentToken);
      } catch (clearErr) {
        console.warn('Failed to clear cart:', clearErr);
      }
      localStorage.removeItem('appliedVoucher');

      // Nếu là COD (Cash on Delivery), chuyển thẳng đến order success
      if (paymentMethod === 'cod') {
        window.location.hash = `#order-success?id=${order.id}`;
        return;
      }

      // Nếu là online payment (VNPay, MoMo), initiate payment
      try {
        // Lấy payment method ID (tạm thời dùng paymentMethod string, backend sẽ map)
        // TODO: Load payment methods từ API và lấy đúng ID
        const paymentResponse = await apiServices.payments.initiate({
          orderId: order.id,
          amount: total,
          paymentMethodId: paymentMethod, // Tạm thời dùng string, backend sẽ xử lý
          description: `Thanh toán đơn hàng #${order.id}`,
        }, currentToken) as any;

        console.log('Payment initiated:', paymentResponse);

        // Nếu có paymentUrl, redirect đến payment gateway
        if (paymentResponse?.paymentUrl) {
          // Thanh toán online: chuyển tới VNPay / Momo
          toast.info('Đang chuyển đến cổng thanh toán an toàn...');
          window.location.href = paymentResponse.paymentUrl;
        } else {
          // Không có paymentUrl (mock / lỗi cấu hình)
          toast.warning('Không nhận được đường dẫn thanh toán. Đơn hàng đã được tạo, vui lòng thanh toán sau.');
          window.location.hash = `#order-success?id=${order.id}`;
        }
      } catch (paymentErr: any) {
        console.error('Payment initiation error:', paymentErr);
        // Payment endpoint not available - order still created successfully
        // User can proceed to order success page
        const msg =
          paymentErr?.response?.data?.message ||
          paymentErr?.message ||
          'Thanh toán sẽ được xử lý sau. Đơn hàng đã được tạo thành công.';
        toast.warning(msg);
        // Order was created successfully, show order success page
        window.location.hash = `#order-success?id=${order.id}`;
      }
    } catch (err: any) {
      console.error('Create order error:', err);
      const errorMessage = err?.response?.data?.message || err?.message || 'Không thể tạo đơn hàng';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setCreatingOrder(false);
    }
  };

  const subtotal = cart?.totalAmount || cart?.total || 0;
  const shippingCost = shippingMethod === "express" ? 50000 : (subtotal >= 500000 ? 0 : 30000);
  const voucherDiscount = appliedVoucher 
    ? (appliedVoucher.discountAmount || (subtotal * appliedVoucher.discount))
    : 0;
  const greenPointsDiscount = useGreenPoints ? 50000 : 0;
  const total = Math.max(0, subtotal - voucherDiscount + shippingCost - greenPointsDiscount);
  const availableGreenPoints = 500;

  // Wait for auth to load
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ca6946] mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Check if user is authenticated
  const currentToken = getToken();
  if (!currentToken) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-lg font-semibold mb-4">Vui lòng đăng nhập</p>
            <p className="text-gray-600 mb-6">Bạn cần đăng nhập để thanh toán</p>
            <a href="#login" className="inline-block bg-[#ca6946] hover:bg-[#b55835] text-white px-8 py-3 rounded-full transition-all">
              Đi đến đăng nhập
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="#home" className="hover:text-black">Trang chủ</a>
              <ChevronRight className="w-4 h-4" />
              <a href="#cart" className="hover:text-black">Giỏ hàng</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">Thanh toán</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${step.completed
                        ? 'bg-green-600 border-green-600 text-white'
                        : currentStep === step.number
                          ? 'border-[#ca6946] text-[#ca6946] bg-white'
                          : 'border-gray-300 text-gray-400 bg-white'
                        }`}
                    >
                      {step.completed ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <span className="font-bold">{step.number}</span>
                      )}
                    </div>
                    <p className={`mt-2 text-sm ${currentStep >= step.number ? 'font-medium' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-4 transition-colors ${step.completed ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Address */}
              <div className={`bg-white border-2 rounded-xl p-6 transition-all ${currentStep === 1 ? 'border-[#ca6946]' : currentStep > 1 ? 'border-green-600' : 'border-gray-200'
                }`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-[#ca6946]" />
                    <h2 className="font-['Lato'] uppercase tracking-wider">Địa chỉ giao hàng</h2>
                  </div>
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-sm text-[#ca6946] hover:underline"
                    >
                      Chỉnh sửa
                    </button>
                  )}
                </div>

                {currentStep === 1 ? (
                  <div className="space-y-4">
                    {addresses.length > 0 ? (
                      <>
                        <div className="space-y-2">
                          <Label>Chọn địa chỉ đã lưu</Label>
                          <Select
                            value={selectedAddress?.addr_id || selectedAddress?.id}
                            onValueChange={(id) => {
                              const addr = addresses.find(a => (a.addr_id || a.id) === id);
                              setSelectedAddress(addr);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn địa chỉ" />
                            </SelectTrigger>
                            <SelectContent>
                              {addresses.map((addr) => (
                                <SelectItem key={addr.addr_id || addr.id} value={addr.addr_id || addr.id}>
                                  {addr.label || 'Address'} - {addr.line1}, {addr.state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <button
                            type="button"
                            onClick={() => window.location.hash = '#addresses'}
                            className="text-sm text-[#ca6946] hover:underline flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Quản lý địa chỉ
                          </button>
                      </div>
                        {selectedAddress && (
                          <div className="p-4 bg-gray-50 rounded-lg border">
                            <p className="font-semibold mb-1">{selectedAddress.label}</p>
                            <p className="text-sm text-gray-600">{selectedAddress.line1}</p>
                            {selectedAddress.line2 && (
                              <p className="text-sm text-gray-600">{selectedAddress.line2}</p>
                            )}
                            <p className="text-sm text-gray-600">
                              {selectedAddress.state} {selectedAddress.zip}
                            </p>
                            <p className="text-sm text-gray-600">{selectedAddress.country}</p>
                      </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Bạn chưa có địa chỉ nào</p>
                        <button
                          type="button"
                          onClick={() => window.location.hash = '#addresses'}
                          className="text-[#ca6946] hover:underline"
                        >
                          Thêm địa chỉ mới
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (selectedAddress) {
                          setCurrentStep(2);
                        } else {
                          alert('Vui lòng chọn địa chỉ giao hàng');
                        }
                      }}
                      disabled={!selectedAddress}
                      className="w-full bg-[#ca6946] hover:bg-[#b55835] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-full transition-all"
                    >
                      Tiếp tục đến giao hàng
                    </button>
                  </div>
                ) : (
                  selectedAddress && (
                  <div className="text-sm text-gray-600">
                      <p className="font-semibold">{selectedAddress.label}</p>
                      <p>{selectedAddress.line1}</p>
                      {selectedAddress.line2 && <p>{selectedAddress.line2}</p>}
                      <p>{selectedAddress.state} {selectedAddress.zip}</p>
                      <p>{selectedAddress.country}</p>
                  </div>
                  )
                )}
              </div>

              {/* Step 2: Delivery Method */}
              <div className={`bg-white border-2 rounded-xl p-6 transition-all ${currentStep === 2 ? 'border-[#ca6946]' : currentStep > 2 ? 'border-green-600' : 'border-gray-200'
                }`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-[#ca6946]" />
                    <h2 className="font-['Lato'] uppercase tracking-wider">Phương thức giao hàng</h2>
                  </div>
                  {currentStep > 2 && (
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-sm text-[#ca6946] hover:underline"
                    >
                      Chỉnh sửa
                    </button>
                  )}
                </div>

                {currentStep === 2 ? (
                  <div className="space-y-4">
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${shippingMethod === "standard" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200 hover:border-gray-400'
                        }`}>
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">Giao hàng tiêu chuẩn</p>
                              <p className="font-bold text-green-700">MIỄN PHÍ</p>
                            </div>
                            <p className="text-sm text-gray-600">Thời gian giao hàng ước tính: 5-7 ngày làm việc</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Leaf className="w-4 h-4 text-green-700" />
                              <span className="text-xs text-green-700">Vận chuyển carbon-neutral</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${shippingMethod === "express" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200 hover:border-gray-400'
                        }`}>
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="express" id="express" />
                          <label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">Giao hàng nhanh</p>
                              <p className="font-bold">50.000₫</p>
                            </div>
                            <p className="text-sm text-gray-600">Thời gian giao hàng ước tính: 2-3 ngày làm việc</p>
                          </label>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="flex-1 bg-[#ca6946] hover:bg-[#b55835] text-white py-3 rounded-full transition-all"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                ) : currentStep > 2 ? (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{shippingMethod === "standard" ? "Standard Delivery" : "Express Delivery"}</p>
                    <p>Estimated: {shippingMethod === "standard" ? "5-7 business days" : "2-3 business days"}</p>
                  </div>
                ) : null}
              </div>

              {/* Step 3: Payment */}
              <div className={`bg-white border-2 rounded-xl p-6 transition-all ${currentStep === 3 ? 'border-[#ca6946]' : 'border-gray-200'
                }`}>
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#ca6946]" />
                  <h2 className="font-['Lato'] uppercase tracking-wider">Payment Method</h2>
                </div>

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "vnpay" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200'
                        }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="vnpay" id="vnpay" />
                          <label htmlFor="vnpay" className="flex-1 cursor-pointer">
                            <p className="font-medium">VNPAY</p>
                            <p className="text-sm text-gray-600">Pay via VNPAY gateway</p>
                          </label>
                        </div>
                      </div>

                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "momo" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200'
                        }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="momo" id="momo" />
                          <label htmlFor="momo" className="flex-1 cursor-pointer">
                            <p className="font-medium">Momo</p>
                            <p className="text-sm text-gray-600">Pay via Momo e-wallet</p>
                          </label>
                        </div>
                      </div>

                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "cod" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200'
                        }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="cod" id="cod" />
                          <label htmlFor="cod" className="flex-1 cursor-pointer">
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-gray-600">Pay when you receive the order</p>
                          </label>
                        </div>
                      </div>
                    </RadioGroup>

                    {/* Green Points */}
                    <div className="border-2 border-[#BCF181] rounded-lg p-4 bg-[#BCF181]/10">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={useGreenPoints}
                          onCheckedChange={(checked) => setUseGreenPoints(checked as boolean)}
                          id="greenpoints"
                        />
                        <label htmlFor="greenpoints" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <Leaf className="w-4 h-4 text-green-700" />
                            <p className="font-medium">Use Green Points</p>
                          </div>
                          <p className="text-sm text-gray-600">You have {availableGreenPoints} points (-50,000₫)</p>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleCreateOrder}
                        disabled={creatingOrder || !selectedAddress}
                        className="flex-1 bg-[#ca6946] hover:bg-[#b55835] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-full transition-all"
                      >
                        {creatingOrder ? 'Đang tạo đơn hàng...' : 'Đặt hàng'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="font-['Lato'] uppercase tracking-wider mb-6">Order Summary</h3>

                {/* Items */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  {cart?.items?.map((item: any) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-20 h-20 bg-white rounded overflow-hidden flex-shrink-0">
                        <img src={item.product?.image || item.image || 'https://placehold.co/80x80'} alt={item.product?.name || item.name || 'Product'} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm mb-1 truncate">{item.product?.name || item.name || 'Product'}</p>
                        {item.design && <p className="text-xs text-gray-600 mb-1">Design: {item.design}</p>}
                        <p className="text-xs text-gray-600">{item.sizeCode || 'N/A'} • {item.colorCode || 'N/A'} • Qty: {item.quantity || item.qty}</p>
                        <p className="text-sm font-medium mt-1">{(item.price || item.unit_price_snapshot || 0).toLocaleString('vi-VN')}₫</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  {appliedVoucher && voucherDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-700">
                      <span>Giảm giá (Voucher {appliedVoucher.code})</span>
                      <span>-{voucherDiscount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vận chuyển</span>
                    <span className={shippingCost === 0 ? "text-green-700" : ""}>
                      {shippingCost === 0 ? "MIỄN PHÍ" : `${shippingCost.toLocaleString('vi-VN')}₫`}
                    </span>
                  </div>
                  {useGreenPoints && (
                    <div className="flex justify-between text-sm text-green-700">
                      <span className="flex items-center gap-1">
                        <Leaf className="w-4 h-4" />
                        Điểm Xanh
                      </span>
                      <span>-{greenPointsDiscount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between mb-6">
                  <span className="font-bold">Tổng cộng</span>
                  <span className="font-bold text-xl">{total.toLocaleString('vi-VN')}₫</span>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span>Thanh toán an toàn</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span>Đóng gói thân thiện môi trường</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
