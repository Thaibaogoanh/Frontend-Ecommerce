import imgRectangle18 from "../../imports/figma:asset/ec5dee110611d8fa4386b7342909242db3aabd49.png";
import imgRectangle17 from "../../imports/figma:asset/5de3554431d6c0f521e30ae15d7346a37c0da80e.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Palette, 
  Leaf, 
  Gift,
  Users,
  Star,
  Download,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  DollarSign,
  LogOut,
  Search
} from 'lucide-react';
import { useState } from 'react';

const orders = [
  { id: "ORD-2024-156", customer: "Nguyễn Văn A", date: "2024-11-07", status: "Processing", total: 749000, items: 1 },
  { id: "ORD-2024-155", customer: "Trần Thị B", date: "2024-11-07", status: "Printing", total: 1498000, items: 2 },
  { id: "ORD-2024-154", customer: "Lê Văn C", date: "2024-11-06", status: "Shipped", total: 998000, items: 1 },
];

const products = [
  { id: 1, name: "Organic Cotton T-Shirt", category: "T-Shirts", price: 299000, stock: 0, status: "Active" },
  { id: 2, name: "Eco Fleece Hoodie", category: "Hoodies", price: 599000, stock: 0, status: "Active" },
];

const designs = [
  { id: 1, name: "Minimalist Nature", artist: "Green Artist", status: "Approved", sales: 89, image: imgRectangle18 },
  { id: 2, name: "Save The Planet", artist: "Eco Designer", status: "Pending", sales: 45, image: imgRectangle17 },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#BCF181] rounded-lg p-2">
              <Leaf className="w-6 h-6 text-green-800" />
            </div>
            <div>
              <h1 className="font-bold">Sustainique Admin</h1>
              <p className="text-xs text-gray-600">Print-on-Demand Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-black">
              View Store →
            </button>
            <a href="#home" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "dashboard" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "orders" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Orders</span>
              <Badge className="ml-auto">3</Badge>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "products" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Products</span>
            </button>

            <button
              onClick={() => setActiveTab("designs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "designs" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
              }`}
            >
              <Palette className="w-5 h-5" />
              <span>Designs</span>
            </button>

            <button
              onClick={() => setActiveTab("green")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "green" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
              }`}
            >
              <Leaf className="w-5 h-5" />
              <span>Green Management</span>
            </button>

            <button
              onClick={() => setActiveTab("rewards")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "rewards" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
              }`}
            >
              <Gift className="w-5 h-5" />
              <span>Rewards</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "users" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Dashboard Overview */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="font-['Lora'] mb-8">Dashboard Overview</h2>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="w-4 h-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">15,480,000₫</div>
                    <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Orders</CardTitle>
                    <ShoppingBag className="w-4 h-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">156</div>
                    <p className="text-xs text-green-600 mt-1">+8.2% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="w-4 h-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">1,234</div>
                    <p className="text-xs text-green-600 mt-1">+15.3% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Green Impact</CardTitle>
                    <Leaf className="w-4 h-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">890kg</div>
                    <p className="text-xs text-gray-600 mt-1">CO₂ Saved This Month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                        </div>
                        <Badge variant={order.status === "Processing" ? "default" : order.status === "Shipped" ? "outline" : "secondary"}>
                          {order.status}
                        </Badge>
                        <p className="font-bold">{order.total.toLocaleString('vi-VN')}₫</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders Management */}
          {activeTab === "orders" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-['Lora']">Order Management</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search orders..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="printing">Printing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium">Order ID</th>
                          <th className="text-left p-4 font-medium">Customer</th>
                          <th className="text-left p-4 font-medium">Date</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Total</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium">{order.id}</td>
                            <td className="p-4">{order.customer}</td>
                            <td className="p-4 text-sm text-gray-600">{order.date}</td>
                            <td className="p-4">
                              <Badge>{order.status}</Badge>
                            </td>
                            <td className="p-4 font-bold">{order.total.toLocaleString('vi-VN')}₫</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded">
                                  <Download className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded">
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Products Management */}
          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-['Lora']">Product Management</h2>
                <button className="flex items-center gap-2 bg-[#ca6946] text-white px-4 py-2 rounded-lg hover:bg-[#b55835]">
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium">Product Name</th>
                          <th className="text-left p-4 font-medium">Category</th>
                          <th className="text-left p-4 font-medium">Price</th>
                          <th className="text-left p-4 font-medium">POD Stock</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium">{product.name}</td>
                            <td className="p-4">{product.category}</td>
                            <td className="p-4">{product.price.toLocaleString('vi-VN')}₫</td>
                            <td className="p-4">
                              <Badge variant="outline">On-Demand</Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant="default">{product.status}</Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-red-100 text-red-600 rounded">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Designs Management */}
          {activeTab === "designs" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-['Lora']">Design Management</h2>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((design) => (
                  <Card key={design.id}>
                    <div className="aspect-square bg-gray-100">
                      <img src={design.image} alt={design.name} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium mb-1">{design.name}</h3>
                          <p className="text-sm text-gray-600">by {design.artist}</p>
                        </div>
                        <Badge variant={design.status === "Approved" ? "default" : "secondary"}>
                          {design.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{design.sales} sales</p>
                      <div className="flex gap-2">
                        <button className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50">
                          View
                        </button>
                        <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                          Approve
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Green Management */}
          {activeTab === "green" && (
            <div>
              <h2 className="font-['Lora'] mb-8">Green Management</h2>

              <Tabs defaultValue="materials">
                <TabsList>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="inks">Ink Types</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>

                <TabsContent value="materials" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sustainable Materials</CardTitle>
                      <CardDescription>Manage eco-friendly materials</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <button className="flex items-center gap-2 mb-6 bg-[#BCF181] px-4 py-2 rounded hover:bg-[#a8d76d]">
                        <Plus className="w-4 h-4" />
                        Add Material
                      </button>
                      <div className="space-y-4">
                        {['Organic Cotton', 'Recycled Polyester', 'Bamboo Blend'].map((material, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Leaf className="w-5 h-5 text-green-700" />
                              <div>
                                <p className="font-medium">{material}</p>
                                <p className="text-sm text-gray-600">GOTS Certified</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 hover:bg-gray-100 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-red-100 text-red-600 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="inks" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Eco-Friendly Inks</CardTitle>
                      <CardDescription>Manage printing ink types</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <button className="flex items-center gap-2 mb-6 bg-[#BCF181] px-4 py-2 rounded hover:bg-[#a8d76d]">
                        <Plus className="w-4 h-4" />
                        Add Ink Type
                      </button>
                      <div className="space-y-4">
                        {['Water-Based Ink', 'Plastisol (Eco)', 'Discharge Ink'].map((ink, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{ink}</p>
                              <p className="text-sm text-gray-600">Non-toxic, PVC-free</p>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 hover:bg-gray-100 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-red-100 text-red-600 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Rewards Management */}
          {activeTab === "rewards" && (
            <div>
              <h2 className="font-['Lora'] mb-8">Rewards Management</h2>

              <Tabs defaultValue="vouchers">
                <TabsList>
                  <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
                  <TabsTrigger value="points">Green Points</TabsTrigger>
                </TabsList>

                <TabsContent value="vouchers" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Voucher Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <button className="flex items-center gap-2 mb-6 bg-[#ca6946] text-white px-4 py-2 rounded hover:bg-[#b55835]">
                        <Plus className="w-4 h-4" />
                        Create Voucher
                      </button>
                      <div className="space-y-4">
                        {['GREEN20', 'WELCOME10', 'FREESHIP'].map((code, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-bold">{code}</p>
                              <p className="text-sm text-gray-600">20% off • Expires: 2024-12-31</p>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 hover:bg-gray-100 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-red-100 text-red-600 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="points" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Green Points Configuration</CardTitle>
                      <CardDescription>Configure earning and redemption rules</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label>Points per 100,000₫</Label>
                        <Input type="number" defaultValue="10" />
                      </div>
                      <div>
                        <Label>Eco Product Bonus</Label>
                        <Input type="number" defaultValue="50" />
                      </div>
                      <div>
                        <Label>Review Bonus</Label>
                        <Input type="number" defaultValue="100" />
                      </div>
                      <button className="bg-[#ca6946] text-white px-6 py-2 rounded hover:bg-[#b55835]">
                        Save Changes
                      </button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Users Management */}
          {activeTab === "users" && (
            <div>
              <h2 className="font-['Lora'] mb-8">User Management</h2>

              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500 py-12">
                    User management interface - View and manage customer accounts, permissions, and activity
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
