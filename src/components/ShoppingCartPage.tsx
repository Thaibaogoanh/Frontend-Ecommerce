import imgRectangle18 from "../imports/figma:asset/ec5dee110611d8fa4386b7342909242db3aabd49.png";
import imgRectangle17 from "../imports/figma:asset/5de3554431d6c0f521e30ae15d7346a37c0da80e.png";
import imgRectangle19 from "../imports/figma:asset/b203d16943a71fae8c9da3a081b78351aea74830.png";
import { Header } from './Header';
import { Footer } from './Footer';
import { Input } from './ui/input';
import { Leaf, X, ChevronRight, Tag, Truck, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: number;
  image: string;
  name: string;
  design: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  isEco: boolean;
}

export function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      image: imgRectangle18,
      name: "Organic Cotton T-Shirt",
      design: "Minimalist Nature",
      size: "M",
      color: "White",
      price: 749000,
      quantity: 1,
      isEco: true,
    },
    {
      id: 2,
      image: imgRectangle17,
      name: "Eco Fleece Hoodie",
      design: "Save The Planet",
      size: "L",
      color: "Black",
      price: 998000,
      quantity: 2,
      isEco: true,
    },
    {
      id: 3,
      image: imgRectangle19,
      name: "Bamboo Blend Henley",
      design: "Forest Spirit",
      size: "XL",
      color: "Gray",
      price: 869000,
      quantity: 1,
      isEco: true,
    },
  ]);

  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number } | null>(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyVoucher = () => {
    // Mock voucher validation
    if (voucherCode.toUpperCase() === "GREEN20") {
      setAppliedVoucher({ code: voucherCode, discount: 0.2 });
    } else {
      alert("Invalid voucher code");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedVoucher ? subtotal * appliedVoucher.discount : 0;
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="#home" className="hover:text-black">Home</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">Shopping Cart</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="font-['Lora'] mb-8">Shopping Cart ({cartItems.length} items)</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-6">Your cart is empty</p>
              <a
                href="#home"
                className="inline-block bg-[#ca6946] hover:bg-[#b55835] text-white px-8 py-3 rounded-full transition-all"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-['Lato'] mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">Design: {item.design}</p>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <span>Size: {item.size}</span>
                              <span>•</span>
                              <span>Color: {item.color}</span>
                            </div>
                            {item.isEco && (
                              <div className="flex items-center gap-1 mt-2">
                                <Leaf className="w-3 h-3 text-green-700" />
                                <span className="text-xs text-green-700">Eco-Friendly Product</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <p className="font-bold">{(item.price * item.quantity).toLocaleString('vi-VN')}₫</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <a
                  href="#blanks"
                  className="inline-block mt-6 text-[#ca6946] hover:underline"
                >
                  ← Continue Shopping
                </a>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                  <h2 className="font-['Lato'] mb-6">Order Summary</h2>

                  {/* Voucher */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Voucher Code</label>
                    <div className="flex gap-2">
                      <Input
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1"
                      />
                      <button
                        onClick={applyVoucher}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedVoucher && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
                        <Tag className="w-4 h-4" />
                        <span>Voucher "{appliedVoucher.code}" applied (-{appliedVoucher.discount * 100}%)</span>
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6 pb-6 border-b">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                    </div>
                    {appliedVoucher && (
                      <div className="flex justify-between text-green-700">
                        <span>Discount</span>
                        <span>-{discount.toLocaleString('vi-VN')}₫</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className={shipping === 0 ? "text-green-700" : ""}>
                        {shipping === 0 ? "FREE" : `${shipping.toLocaleString('vi-VN')}₫`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-gray-500">
                        Add {(500000 - subtotal).toLocaleString('vi-VN')}₫ more for FREE shipping
                      </p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between mb-6">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">{total.toLocaleString('vi-VN')}₫</span>
                  </div>

                  {/* Checkout Button */}
                  <a
                    href="#checkout"
                    className="block w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-4 rounded-full transition-all mb-4 text-center"
                  >
                    Proceed to Checkout
                  </a>

                  {/* Trust Badges */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Truck className="w-5 h-5" />
                      <span>Free shipping on orders over 500k</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ShieldCheck className="w-5 h-5" />
                      <span>Secure checkout guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Leaf className="w-5 h-5 text-green-700" />
                      <span className="text-green-700">Carbon-neutral shipping</span>
                    </div>
                  </div>

                  {/* Green Commitment */}
                  <div className="mt-6 p-4 bg-[#BCF181]/20 rounded-lg">
                    <p className="text-sm text-green-900">
                      🌱 Your order supports sustainable practices and helps plant trees!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
