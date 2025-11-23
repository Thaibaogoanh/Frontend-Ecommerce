import imgRectangle18 from "../imports/figma:asset/ec5dee110611d8fa4386b7342909242db3aabd49.png";
import imgRectangle17 from "../imports/figma:asset/5de3554431d6c0f521e30ae15d7346a37c0da80e.png";
import { Header } from './Header';
import { Footer } from './Footer';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { 
  ChevronRight, 
  Leaf, 
  Truck, 
  CreditCard, 
  MapPin,
  Check,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

interface CheckoutStep {
  number: number;
  title: string;
  completed: boolean;
}

export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [useGreenPoints, setUseGreenPoints] = useState(false);

  const steps: CheckoutStep[] = [
    { number: 1, title: "Shipping Address", completed: currentStep > 1 },
    { number: 2, title: "Delivery Method", completed: currentStep > 2 },
    { number: 3, title: "Payment", completed: false },
  ];

  const cartItems = [
    {
      id: 1,
      image: imgRectangle18,
      name: "Organic Cotton T-Shirt",
      design: "Minimalist Nature",
      size: "M",
      color: "White",
      quantity: 1,
      price: 749000,
    },
    {
      id: 2,
      image: imgRectangle17,
      name: "Eco Fleece Hoodie",
      design: "Save The Planet",
      size: "L",
      color: "Black",
      quantity: 1,
      price: 998000,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === "express" ? 50000 : 0;
  const greenPointsDiscount = useGreenPoints ? 50000 : 0;
  const total = subtotal + shippingCost - greenPointsDiscount;

  const availableGreenPoints = 500;

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
              <a href="#cart" className="hover:text-black">Cart</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">Checkout</span>
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
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.completed
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
                      className={`h-1 flex-1 mx-4 transition-colors ${
                        step.completed ? 'bg-green-600' : 'bg-gray-300'
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
              <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                currentStep === 1 ? 'border-[#ca6946]' : currentStep > 1 ? 'border-green-600' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-[#ca6946]" />
                    <h2 className="font-['Lato'] uppercase tracking-wider">Shipping Address</h2>
                  </div>
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-sm text-[#ca6946] hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {currentStep === 1 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name *</Label>
                        <Input placeholder="Nguyễn" defaultValue="Nguyễn" />
                      </div>
                      <div>
                        <Label>Last Name *</Label>
                        <Input placeholder="Văn A" defaultValue="Văn A" />
                      </div>
                    </div>

                    <div>
                      <Label>Phone Number *</Label>
                      <Input type="tel" placeholder="+84 123 456 789" defaultValue="+84 123 456 789" />
                    </div>

                    <div>
                      <Label>Address *</Label>
                      <Input placeholder="123 Đường ABC" defaultValue="123 Đường ABC" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>City *</Label>
                        <Input placeholder="Hồ Chí Minh" defaultValue="Hồ Chí Minh" />
                      </div>
                      <div>
                        <Label>District *</Label>
                        <Input placeholder="Quận 1" defaultValue="Quận 1" />
                      </div>
                      <div>
                        <Label>Postal Code</Label>
                        <Input placeholder="700000" defaultValue="700000" />
                      </div>
                    </div>

                    <div>
                      <Label>Delivery Notes (Optional)</Label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-[#BCF181]"
                        rows={3}
                        placeholder="Add any special delivery instructions..."
                      />
                    </div>

                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-3 rounded-full transition-all"
                    >
                      Continue to Delivery
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    <p>Nguyễn Văn A</p>
                    <p>+84 123 456 789</p>
                    <p>123 Đường ABC, Quận 1, Hồ Chí Minh</p>
                  </div>
                )}
              </div>

              {/* Step 2: Delivery Method */}
              <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                currentStep === 2 ? 'border-[#ca6946]' : currentStep > 2 ? 'border-green-600' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-[#ca6946]" />
                    <h2 className="font-['Lato'] uppercase tracking-wider">Delivery Method</h2>
                  </div>
                  {currentStep > 2 && (
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-sm text-[#ca6946] hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {currentStep === 2 ? (
                  <div className="space-y-4">
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        shippingMethod === "standard" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200 hover:border-gray-400'
                      }`}>
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">Standard Delivery</p>
                              <p className="font-bold text-green-700">FREE</p>
                            </div>
                            <p className="text-sm text-gray-600">Estimated delivery: 5-7 business days</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Leaf className="w-4 h-4 text-green-700" />
                              <span className="text-xs text-green-700">Carbon-neutral shipping</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        shippingMethod === "express" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200 hover:border-gray-400'
                      }`}>
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="express" id="express" />
                          <label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">Express Delivery</p>
                              <p className="font-bold">50,000₫</p>
                            </div>
                            <p className="text-sm text-gray-600">Estimated delivery: 2-3 business days</p>
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
              <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                currentStep === 3 ? 'border-[#ca6946]' : 'border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#ca6946]" />
                  <h2 className="font-['Lato'] uppercase tracking-wider">Payment Method</h2>
                </div>

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "vnpay" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="vnpay" id="vnpay" />
                          <label htmlFor="vnpay" className="flex-1 cursor-pointer">
                            <p className="font-medium">VNPAY</p>
                            <p className="text-sm text-gray-600">Pay via VNPAY gateway</p>
                          </label>
                        </div>
                      </div>

                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "momo" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="momo" id="momo" />
                          <label htmlFor="momo" className="flex-1 cursor-pointer">
                            <p className="font-medium">Momo</p>
                            <p className="text-sm text-gray-600">Pay via Momo e-wallet</p>
                          </label>
                        </div>
                      </div>

                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "cod" ? 'border-[#ca6946] bg-[#BCF181]/10' : 'border-gray-200'
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
                      <a
                        href="#order-success"
                        className="flex-1 bg-[#ca6946] hover:bg-[#b55835] text-white py-3 rounded-full transition-all text-center"
                      >
                        Place Order
                      </a>
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
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-20 h-20 bg-white rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm mb-1 truncate">{item.name}</p>
                        <p className="text-xs text-gray-600 mb-1">Design: {item.design}</p>
                        <p className="text-xs text-gray-600">{item.size} • {item.color} • Qty: {item.quantity}</p>
                        <p className="text-sm font-medium mt-1">{item.price.toLocaleString('vi-VN')}₫</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-700" : ""}>
                      {shippingCost === 0 ? "FREE" : `${shippingCost.toLocaleString('vi-VN')}₫`}
                    </span>
                  </div>
                  {useGreenPoints && (
                    <div className="flex justify-between text-sm text-green-700">
                      <span className="flex items-center gap-1">
                        <Leaf className="w-4 h-4" />
                        Green Points
                      </span>
                      <span>-{greenPointsDiscount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between mb-6">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">{total.toLocaleString('vi-VN')}₫</span>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span>Eco-friendly packaging</span>
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
