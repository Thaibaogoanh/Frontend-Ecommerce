import imgRectangle18 from "../imports/figma:asset/ec5dee110611d8fa4386b7342909242db3aabd49.png";
import imgRectangle17 from "../imports/figma:asset/5de3554431d6c0f521e30ae15d7346a37c0da80e.png";
import imgRectangle19 from "../imports/figma:asset/b203d16943a71fae8c9da3a081b78351aea74830.png";
import { Header } from './Header';
import { Footer } from './Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  Gift, 
  Leaf, 
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-11-05",
    status: "Delivered",
    items: 2,
    total: 1398000,
    image: imgRectangle18,
  },
  {
    id: "ORD-2024-002",
    date: "2024-11-03",
    status: "In Transit",
    items: 1,
    total: 749000,
    image: imgRectangle17,
  },
  {
    id: "ORD-2024-003",
    date: "2024-10-28",
    status: "Processing",
    items: 3,
    total: 2145000,
    image: imgRectangle19,
  },
];

const favorites = [
  { id: 1, image: imgRectangle18, name: "Minimalist Nature", price: 450000 },
  { id: 2, image: imgRectangle17, name: "Save The Planet", price: 399000 },
  { id: 3, image: imgRectangle19, name: "Forest Spirit", price: 520000 },
];

export function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'In Transit':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'Processing':
        return <Package className="w-5 h-5 text-orange-600" />;
      default:
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

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
              <span className="text-black">My Account</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#BCF181] to-[#ca6946] rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-600" />
              </div>
              <div className="text-white">
                <h1 className="font-['Lora'] mb-2">Nguyễn Văn A</h1>
                <p className="text-white/90 mb-2">customer@sustainique.com</p>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm">Eco Champion - 1,250 Green Points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingBag className="w-4 h-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">12</div>
                    <p className="text-xs text-gray-600 mt-1">3 in last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Green Points</CardTitle>
                    <Leaf className="w-4 h-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">1,250</div>
                    <p className="text-xs text-gray-600 mt-1">250 points to next reward</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Saved Designs</CardTitle>
                    <Heart className="w-4 h-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">{favorites.length}</div>
                    <p className="text-xs text-gray-600 mt-1">Your favorite designs</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <img src={order.image} alt="Order" className="w-16 h-16 rounded object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{order.id}</p>
                            {getStatusIcon(order.status)}
                            <span className="text-sm text-gray-600">{order.status}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{order.total.toLocaleString('vi-VN')}₫</p>
                          <button className="text-sm text-[#ca6946] hover:underline">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track all your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-['Lato'] mb-1">{order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {order.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <img src={order.image} alt="Order" className="w-20 h-20 rounded object-cover" />
                          <div>
                            <p className="text-sm text-gray-600">{order.items} items</p>
                            <p className="font-bold">{order.total.toLocaleString('vi-VN')}₫</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                          {order.status === 'Delivered' && (
                            <button className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors">
                              Buy Again
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Designs</CardTitle>
                  <CardDescription>Your favorite designs and products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {favorites.map((item) => (
                      <div key={item.id} className="group">
                        <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                          </button>
                        </div>
                        <h3 className="font-['Lato'] mb-1">{item.name}</h3>
                        <p className="font-medium mb-2">{item.price.toLocaleString('vi-VN')}₫</p>
                        <button className="w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-2 rounded-full transition-all">
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      Green Points
                    </CardTitle>
                    <CardDescription>Earn points with every eco-friendly purchase</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-bold text-4xl">1,250</span>
                        <span className="text-gray-600">points</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#BCF181] h-2 rounded-full" style={{ width: '83%' }} />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">250 points until next reward tier</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">How to earn points:</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• 10 points per 100,000₫ spent</p>
                        <p>• 50 bonus points for eco-friendly products</p>
                        <p>• 100 points for writing reviews</p>
                        <p>• 200 points for referring friends</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-[#ca6946]" />
                      Available Vouchers
                    </CardTitle>
                    <CardDescription>Redeem your points for rewards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-[#BCF181] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">10% OFF</h4>
                          <span className="text-sm text-gray-600">500 points</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">On orders over 500,000₫</p>
                        <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors">
                          Redeem
                        </button>
                      </div>

                      <div className="border-2 border-dashed border-[#BCF181] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">FREE SHIPPING</h4>
                          <span className="text-sm text-gray-600">300 points</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">On your next order</p>
                        <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors">
                          Redeem
                        </button>
                      </div>

                      <div className="border-2 border-gray-200 rounded-lg p-4 opacity-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">20% OFF</h4>
                          <span className="text-sm text-gray-600">1,500 points</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">On orders over 1,000,000₫</p>
                        <button className="w-full bg-gray-300 text-gray-500 py-2 rounded-full cursor-not-allowed">
                          Not Enough Points
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Nguyễn Văn A"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#BCF181]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email" 
                        defaultValue="customer@sustainique.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#BCF181]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input 
                        type="tel" 
                        defaultValue="+84 123 456 789"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#BCF181]"
                      />
                    </div>
                    <button className="w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-3 rounded-full transition-all">
                      Save Changes
                    </button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about orders</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-600">Get special offers and news</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Eco Tips</p>
                        <p className="text-sm text-gray-600">Weekly sustainability tips</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
