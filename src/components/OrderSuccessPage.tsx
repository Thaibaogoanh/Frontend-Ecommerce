import imgRectangle18 from "../imports/figma:asset/ec5dee110611d8fa4386b7342909242db3aabd49.png";
import imgRectangle17 from "../imports/figma:asset/5de3554431d6c0f521e30ae15d7346a37c0da80e.png";
import { Header } from './Header';
import { Footer } from './Footer';
import { CheckCircle, Package, Truck, Mail, Leaf, Download } from 'lucide-react';

export function OrderSuccessPage() {
  const orderId = "ORD-2024-" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');

  const orderItems = [
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

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-['Lora'] mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for choosing sustainable fashion
            </p>
            <p className="text-gray-600">
              Order confirmation has been sent to <span className="font-medium">customer@sustainique.com</span>
            </p>
          </div>

          {/* Order Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b">
              {/* Order Number */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="font-bold text-xl">{orderId}</p>
              </div>

              {/* Estimated Delivery */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                <p className="font-bold text-xl">{estimatedDelivery}</p>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="mb-8 pb-8 border-b">
              <h3 className="font-['Lato'] uppercase tracking-wider mb-6">Order Status</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="font-medium mb-1">Order Placed</p>
                    <p className="text-sm text-gray-600">Your order has been received</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleString('vi-VN')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="font-medium text-gray-600 mb-1">Processing</p>
                    <p className="text-sm text-gray-500">We're preparing your items</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-600 mb-1">Shipped</p>
                    <p className="text-sm text-gray-500">Your order is on the way</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8 pb-8 border-b">
              <h3 className="font-['Lato'] uppercase tracking-wider mb-4">Order Items</h3>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">{item.name}</p>
                      <p className="text-sm text-gray-600 mb-1">Design: {item.design}</p>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} • Color: {item.color} • Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{item.price.toLocaleString('vi-VN')}₫</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl">Total Paid</span>
              <span className="font-bold text-2xl text-[#ca6946]">{total.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>

          {/* Green Impact */}
          <div className="bg-gradient-to-r from-[#BCF181] to-[#ca6946] rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6 text-green-700" />
              </div>
              <div className="text-white">
                <h3 className="font-['Lato'] uppercase tracking-wider mb-2">Your Green Impact</h3>
                <p className="text-white/90 mb-4">
                  By choosing eco-friendly products, you've contributed to a sustainable future!
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-2xl font-bold">2.5kg</p>
                    <p className="text-sm text-white/80">CO₂ Saved</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-2xl font-bold">+120</p>
                    <p className="text-sm text-white/80">Green Points</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-white/80">Tree Planted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <a
              href="#dashboard"
              className="border-2 border-black hover:bg-black hover:text-white py-4 rounded-full transition-all text-center flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Track Order
            </a>
            <button className="border-2 border-gray-300 hover:bg-gray-50 py-4 rounded-full transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
            <a
              href="#home"
              className="bg-[#ca6946] hover:bg-[#b55835] text-white py-4 rounded-full transition-all text-center"
            >
              Continue Shopping
            </a>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <Mail className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <h4 className="font-medium mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-4">
              If you have any questions about your order, feel free to contact us
            </p>
            <a
              href="#contact"
              className="inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
