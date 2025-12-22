// Placeholder images - replace with actual images when available
const imgRectangle18 = "https://placehold.co/400x300/90EE90/FFFFFF?text=Design+1";
const imgRectangle17 = "https://placehold.co/400x300/87CEEB/FFFFFF?text=Design+2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
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
  Search,
  AlertCircle,
  Warehouse,
  Box,
  Ruler,
  FileText,
  UserCog,
  FolderOpen,
  Save
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { apiServices } from '../../services/apiConfig';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../ui/loading';
import { ErrorDisplay } from '../ui/error';

const mockOrders = [
  { id: "ORD-2024-156", customer: "Nguyễn Văn A", date: "2024-11-07", status: "Processing", total: 749000, items: 1 },
  { id: "ORD-2024-155", customer: "Trần Thị B", date: "2024-11-07", status: "Printing", total: 1498000, items: 2 },
  { id: "ORD-2024-154", customer: "Lê Văn C", date: "2024-11-06", status: "Shipped", total: 998000, items: 1 },
];

const mockProducts = [
  { id: 1, name: "Organic Cotton T-Shirt", category: "T-Shirts", price: 299000, stock: 0, status: "Active" },
  { id: 2, name: "Eco Fleece Hoodie", category: "Hoodies", price: 599000, stock: 0, status: "Active" },
];

const mockDesigns = [
  { id: 1, name: "Minimalist Nature", artist: "Green Artist", status: "Approved", sales: 89, image: imgRectangle18 },
  { id: 2, name: "Save The Planet", artist: "Eco Designer", status: "Pending", sales: 45, image: imgRectangle17 },
];

export function AdminDashboard() {
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [designs, setDesigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  // Admin tabs data
  const [inventory, setInventory] = useState<any[]>([]);
  const [packaging, setPackaging] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [printMethods, setPrintMethods] = useState<any[]>([]);
  const [returnReasons, setReturnReasons] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<string>('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Filter states
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [designStatusFilter, setDesignStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (token && user?.role === 'admin') {
      loadAdminData();
    } else {
      setError('Truy cập bị từ chối. Yêu cầu quyền quản trị.');
      setLoading(false);
    }
  }, [token, user]);

  // Debug dialog state
  useEffect(() => {
    console.log('Dialog state changed:', { isDialogOpen, dialogType, formData });
  }, [isDialogOpen, dialogType, formData]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!token) return;

      // Load all data in parallel
      const [
        ordersData,
        productsData,
        designsData,
        inventoryData,
        packagingData,
        sizesData,
        materialsData,
        printMethodsData,
        returnReasonsData,
        employeesData,
        assetsData,
        categoriesData
      ] = await Promise.all([
        apiServices.orders.getAll(token).catch(() => ({ orders: [] })),
        apiServices.products.getAll(1, 100).catch(() => ({ products: [] })),
        apiServices.designs.getAll(1, 100).catch(() => ({ designs: [] })),
        apiServices.inventory.getStock(token).catch(() => ({ stock: [] })),
        apiServices.packaging.getAll(token).catch(() => ({ packaging: [] })),
        apiServices.sizes.getAll(token).catch(() => ({ sizes: [] })),
        apiServices.materials.getAll(token).catch(() => ({ materials: [] })),
        apiServices.printMethods.getAll(token).catch(() => ({ printMethods: [] })),
        apiServices.returnReasons.getAll(token).catch(() => ({ returnReasons: [] })),
        apiServices.employees.getAll(token).catch(() => ({ employees: [] })),
        apiServices.assets.getAll(token).catch(() => ({ assets: [] })),
        apiServices.categories.getAll().catch(() => [])
      ]);

      const ordersList = ordersData.orders || ordersData || [];
      const productsList = productsData.products || [];
      const designsList = designsData.designs || [];
      
      setOrders(ordersList);
      setProducts(productsList);
      setDesigns(designsList);
      setInventory(inventoryData.stock || inventoryData || []);
      setPackaging(packagingData.packaging || packagingData || []);
      setSizes(sizesData.sizes || sizesData || []);
      setMaterials(materialsData.materials || materialsData || []);
      setPrintMethods(printMethodsData.printMethods || printMethodsData || []);
      setReturnReasons(returnReasonsData.returnReasons || returnReasonsData || []);
      setEmployees(employeesData.employees || employeesData || []);
      setAssets(assetsData.assets || assetsData || []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);

      // Calculate stats
      const totalRevenue = ordersList.reduce((sum: number, o: any) => sum + (o.Total || o.total || 0), 0);
      const totalOrders = ordersList.length;
      setStats({
        revenue: totalRevenue,
        orders: totalOrders,
        users: 1234, // Would need users API
        co2Saved: 890
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu quản trị');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      if (!token) return;
      await apiServices.admin.updateOrderStatus(orderId, newStatus, token);
      await loadAdminData(); // Reload data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể cập nhật đơn hàng');
    }
  };

  const handleApproveDesign = async (designId: string) => {
    try {
      if (!token) return;
      await apiServices.admin.updateDesignStatus(designId, 'approved', token);
      await loadAdminData(); // Reload data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể phê duyệt thiết kế');
    }
  };

  // Product CRUD handlers
  const handleOpenProductDialog = (type: 'create' | 'edit', product?: any) => {
    console.log('handleOpenProductDialog called', { type, product });
    setDialogType(type);
    setEditingItem(product || null);
    setFormData(product ? {
      name: product.name || '',
      title: product.title || '',
      description: product.description || '',
      price: product.price || 0,
      oldPrice: product.oldPrice || 0,
      stock: product.stock || 0,
      quantity: product.quantity || 0,
      image: product.image || '',
      categoryId: typeof product.category === 'object' ? product.category.id : product.categoryId || '',
      isNew: product.isNew || false,
      isFeatured: product.isFeatured || false,
      isActive: product.isActive !== undefined ? product.isActive : true,
    } : {
      name: '',
      title: '',
      description: '',
      price: 0,
      oldPrice: 0,
      stock: 0,
      quantity: 0,
      image: '',
      categoryId: '',
      isNew: false,
      isFeatured: false,
      isActive: true,
    });
    console.log('Setting isDialogOpen to true');
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDialogType('');
    setEditingItem(null);
    setFormData({});
  };

  const handleSaveProduct = async () => {
    try {
      if (!token) return;
      setError(null);
      
      // Validation
      if (dialogType === 'create') {
        if (!formData.name || !formData.name.trim()) {
          setError('Vui lòng nhập tên sản phẩm');
          return;
        }
        if (!formData.title || !formData.title.trim()) {
          setError('Vui lòng nhập tiêu đề sản phẩm');
          return;
        }
        if (!formData.description || !formData.description.trim()) {
          setError('Vui lòng nhập mô tả sản phẩm');
          return;
        }
        if (!formData.price || formData.price < 0) {
          setError('Vui lòng nhập giá sản phẩm hợp lệ (>= 0)');
          return;
        }
        if (!formData.categoryId) {
          setError('Vui lòng chọn danh mục');
          return;
        }
        if (!formData.stock || formData.stock < 0) {
          setError('Vui lòng nhập tồn kho hợp lệ (>= 0)');
          return;
        }
        if (!formData.quantity || formData.quantity < 0) {
          setError('Vui lòng nhập số lượng hợp lệ (>= 0)');
          return;
        }
      }
      
      // Prepare data
      const dataToSend = {
        ...formData,
        price: Number(formData.price) || 0,
        oldPrice: Number(formData.oldPrice) || 0,
        stock: Number(formData.stock) || 0,
        quantity: Number(formData.quantity) || 0,
      };
      
      if (dialogType === 'create') {
        await apiServices.products.create(dataToSend, token);
      } else if (dialogType === 'edit' && editingItem) {
        await apiServices.products.update(editingItem.id, dataToSend, token);
      }
      
      await loadAdminData();
      handleCloseDialog();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể lưu sản phẩm');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    try {
      if (!token) return;
      await apiServices.products.delete(productId, token);
      await loadAdminData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể xóa sản phẩm');
    }
  };

  // Filter products
  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = !productSearch || 
      product.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.title?.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'all' || 
      (typeof product.category === 'object' ? product.category.id === productCategoryFilter : product.categoryId === productCategoryFilter);
    return matchesSearch && matchesCategory;
  });

  // Filter orders
  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch = !orderSearch || 
      order.id?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (typeof order.customer === 'object' ? order.customer.email : order.customer)?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || 
      (order.Status || order.status || '').toLowerCase() === orderStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filter designs
  const filteredDesigns = designs.filter((design: any) => {
    const matchesStatus = designStatusFilter === 'all' || 
      (design.status || '').toLowerCase() === designStatusFilter.toLowerCase();
    return matchesStatus;
  });

  if (error && !token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">Access Denied</p>
          <p className="text-gray-600 mb-4">Admin privileges required</p>
          <a href="#login" className="text-[#ca6946] hover:underline">Go to Login</a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading text="Đang tải bảng điều khiển quản trị..." />
      </div>
    );
  }

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
              <h1 className="font-bold">Quản trị Sustainique</h1>
              <p className="text-xs text-gray-600">Quản lý In theo yêu cầu</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-black">
              Xem cửa hàng →
            </button>
            <a href="#home" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "dashboard" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Bảng điều khiển</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "orders" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Đơn hàng</span>
              {(() => {
                const pendingOrders = orders.filter((order: any) => {
                  const status = (order.Status || order.status || '').toLowerCase();
                  return status === 'pending' || status === 'processing' || status === 'printing';
                }).length;
                return pendingOrders > 0 ? (
                  <Badge className="ml-auto" variant="destructive">{pendingOrders}</Badge>
                ) : null;
              })()}
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "products" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                }`}
            >
              <Package className="w-5 h-5" />
              <span>Sản phẩm</span>
            </button>

            <button
              onClick={() => setActiveTab("designs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "designs" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                }`}
            >
              <Palette className="w-5 h-5" />
              <span>Thiết kế</span>
            </button>

            <button
              onClick={() => setActiveTab("green")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "green" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                }`}
            >
              <Leaf className="w-5 h-5" />
              <span>Quản lý Xanh</span>
            </button>

            <button
              onClick={() => setActiveTab("rewards")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "rewards" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                }`}
            >
              <Gift className="w-5 h-5" />
              <span>Phần thưởng</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "users" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                }`}
            >
              <Users className="w-5 h-5" />
              <span>Người dùng</span>
            </button>

            <div className="pt-4 mt-4 border-t">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-4">Vận hành</p>

              <button
                onClick={() => setActiveTab("inventory")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "inventory" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                  }`}
              >
                <Warehouse className="w-5 h-5" />
                <span>Kho hàng</span>
              </button>

              <button
                onClick={() => setActiveTab("packaging")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "packaging" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                  }`}
              >
                <Box className="w-5 h-5" />
                <span>Đóng gói</span>
              </button>

              <button
                onClick={() => setActiveTab("catalogs")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "catalogs" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                  }`}
              >
                <Ruler className="w-5 h-5" />
                <span>Danh mục</span>
              </button>

              <button
                onClick={() => setActiveTab("return-reasons")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "return-reasons" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                  }`}
              >
                <FileText className="w-5 h-5" />
                <span>Lý do đổi trả</span>
              </button>

              <button
                onClick={() => setActiveTab("employees")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "employees" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                  }`}
              >
                <UserCog className="w-5 h-5" />
                <span>Nhân viên</span>
              </button>

              <button
                onClick={() => setActiveTab("assets")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "assets" ? "bg-[#BCF181] text-black" : "hover:bg-gray-100"
                  }`}
              >
                <FolderOpen className="w-5 h-5" />
                <span>Tài sản</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Dashboard Overview */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="font-['Lora'] mb-8">Tổng quan bảng điều khiển</h2>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                    <DollarSign className="w-4 h-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">{(stats?.revenue || 0).toLocaleString('vi-VN')}₫</div>
                    <p className="text-xs text-green-600 mt-1">+12.5% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
                    <ShoppingBag className="w-4 h-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">{stats?.orders || orders.length}</div>
                    <p className="text-xs text-green-600 mt-1">+8.2% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Người dùng hoạt động</CardTitle>
                    <Users className="w-4 h-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">{stats?.users || 1234}</div>
                    <p className="text-xs text-green-600 mt-1">+15.3% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Tác động Xanh</CardTitle>
                    <Leaf className="w-4 h-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">{stats?.co2Saved || 890}kg</div>
                    <p className="text-xs text-gray-600 mt-1">CO₂ Tiết kiệm tháng này</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Đơn hàng gần đây</CardTitle>
                  <CardDescription>Đơn hàng khách hàng mới nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {typeof order.customer === 'object' && order.customer !== null
                              ? order.customer.name || order.customer.email || order.user?.email || 'N/A'
                              : order.customer || order.user?.email || 'N/A'}
                          </p>
                        </div>
                        <Badge variant={order.status === "Processing" ? "default" : order.status === "Shipped" ? "outline" : "secondary"}>
                          {order.status}
                        </Badge>
                        <p className="font-bold">{(order.total || order.Total || 0).toLocaleString('vi-VN')}₫</p>
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
                <h2 className="font-['Lora']">Quản lý đơn hàng</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Tìm kiếm đơn hàng..." 
                      className="pl-10"
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                    />
                  </div>
                  <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tất cả trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="processing">Đang xử lý</SelectItem>
                      <SelectItem value="printing">Đang in</SelectItem>
                      <SelectItem value="shipped">Đã gửi</SelectItem>
                      <SelectItem value="delivered">Đã giao</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
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
                          <th className="text-left p-4 font-medium">Mã đơn hàng</th>
                          <th className="text-left p-4 font-medium">Khách hàng</th>
                          <th className="text-left p-4 font-medium">Ngày</th>
                          <th className="text-left p-4 font-medium">Trạng thái</th>
                          <th className="text-left p-4 font-medium">Tổng tiền</th>
                          <th className="text-left p-4 font-medium">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-500">
                              Không tìm thấy đơn hàng
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((order: any) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                              <td className="p-4 font-medium">{order.id}</td>
                              <td className="p-4">{order.user?.email || order.customer || 'N/A'}</td>
                              <td className="p-4 text-sm text-gray-600">
                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : order.date}
                              </td>
                              <td className="p-4">
                                <Badge>{order.Status || order.status || 'Pending'}</Badge>
                              </td>
                              <td className="p-4 font-bold">{(order.Total || order.total || 0).toLocaleString('vi-VN')}₫</td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => window.location.hash = `#order-success?id=${order.id}`}
                                    className="p-2 hover:bg-gray-100 rounded"
                                  >
                                    <Download className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleUpdateOrderStatus(order.id, 'processing')}
                                    className="p-2 hover:bg-gray-100 rounded"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
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
                <h2 className="font-['Lora']">Quản lý sản phẩm</h2>
                <button 
                  onClick={() => handleOpenProductDialog('create')}
                  className="flex items-center gap-2 bg-[#ca6946] text-white px-4 py-2 rounded-lg hover:bg-[#b55835]"
                >
                  <Plus className="w-4 h-4" />
                  Thêm sản phẩm
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Tìm kiếm sản phẩm..." 
                    className="pl-10"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                <Select value={productCategoryFilter} onValueChange={setProductCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tất cả danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    {categories && categories.length > 0 ? categories.map((cat: any) => (
                      <SelectItem key={cat.id || cat.name} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    )) : (
                      <SelectItem value="" disabled>Không có danh mục</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium">Tên sản phẩm</th>
                          <th className="text-left p-4 font-medium">Danh mục</th>
                          <th className="text-left p-4 font-medium">Giá</th>
                          <th className="text-left p-4 font-medium">Tồn kho POD</th>
                          <th className="text-left p-4 font-medium">Trạng thái</th>
                          <th className="text-left p-4 font-medium">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-500">
                              Không tìm thấy sản phẩm
                            </td>
                          </tr>
                        ) : (
                          filteredProducts.map((product: any) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                              <td className="p-4 font-medium">{product.name}</td>
                              <td className="p-4">
                                {typeof product.category === 'object' && product.category !== null
                                  ? product.category.name || product.category.title || 'N/A'
                                  : product.category || 'N/A'}
                              </td>
                              <td className="p-4">{(product.price || 0).toLocaleString('vi-VN')}₫</td>
                              <td className="p-4">
                                <Badge variant="outline">On-Demand</Badge>
                              </td>
                              <td className="p-4">
                                <Badge variant={product.isActive ? "default" : "secondary"}>
                                  {product.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleOpenProductDialog('edit', product)}
                                    className="p-2 hover:bg-gray-100 rounded"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-2 hover:bg-red-100 text-red-600 rounded"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
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
                <h2 className="font-['Lora']">Quản lý thiết kế</h2>
                <div className="flex gap-3">
                  <Select value={designStatusFilter} onValueChange={setDesignStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tất cả trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="pending">Chờ duyệt</SelectItem>
                      <SelectItem value="approved">Đã duyệt</SelectItem>
                      <SelectItem value="rejected">Từ chối</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredDesigns.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    Không tìm thấy thiết kế
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDesigns.map((design: any) => (
                    <Card key={design.id}>
                      <div className="aspect-square bg-gray-100">
                        <img src={design.image || "https://images.unsplash.com/photo-1655141559787-25ac8cfca72f?w=400"} alt={design.name} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium mb-1">{design.name}</h3>
                            <p className="text-sm text-gray-600">by {design.creator || 'Unknown'}</p>
                          </div>
                          <Badge variant={design.status === "approved" ? "default" : "secondary"}>
                            {design.status || 'pending'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{design.downloads || 0} lượt tải</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.location.hash = `#design-detail?id=${design.id}`}
                            className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50"
                          >
                            Xem
                          </button>
                          {design.status !== 'approved' && (
                            <button
                              onClick={() => handleApproveDesign(design.id)}
                              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                            >
                              Duyệt
                            </button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Green Management */}
          {activeTab === "green" && (
            <div>
              <h2 className="font-['Lora'] mb-8">Quản lý Xanh</h2>

              <Tabs defaultValue="materials">
                <TabsList>
                  <TabsTrigger value="materials">Chất liệu</TabsTrigger>
                  <TabsTrigger value="inks">Loại mực</TabsTrigger>
                  <TabsTrigger value="certifications">Chứng nhận</TabsTrigger>
                </TabsList>

                <TabsContent value="materials" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chất liệu bền vững</CardTitle>
                      <CardDescription>Quản lý chất liệu thân thiện môi trường</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <button className="flex items-center gap-2 mb-6 bg-[#BCF181] px-4 py-2 rounded hover:bg-[#a8d76d]">
                        <Plus className="w-4 h-4" />
                        Thêm chất liệu
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
                      <CardTitle>Mực thân thiện môi trường</CardTitle>
                      <CardDescription>Quản lý loại mực in</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <button className="flex items-center gap-2 mb-6 bg-[#BCF181] px-4 py-2 rounded hover:bg-[#a8d76d]">
                        <Plus className="w-4 h-4" />
                        Thêm loại mực
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
              <h2 className="font-['Lora'] mb-8">Quản lý phần thưởng</h2>

              <Tabs defaultValue="vouchers">
                <TabsList>
                  <TabsTrigger value="vouchers">Voucher</TabsTrigger>
                  <TabsTrigger value="points">Điểm Xanh</TabsTrigger>
                </TabsList>

                <TabsContent value="vouchers" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quản lý Voucher</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <button className="flex items-center gap-2 mb-6 bg-[#ca6946] text-white px-4 py-2 rounded hover:bg-[#b55835]">
                        <Plus className="w-4 h-4" />
                        Tạo Voucher
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
                      <CardTitle>Cấu hình Điểm Xanh</CardTitle>
                      <CardDescription>Cấu hình quy tắc kiếm và đổi điểm</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label>Điểm cho mỗi 100.000₫</Label>
                        <Input type="number" defaultValue="10" />
                      </div>
                      <div>
                        <Label>Thưởng sản phẩm Xanh</Label>
                        <Input type="number" defaultValue="50" />
                      </div>
                      <div>
                        <Label>Thưởng đánh giá</Label>
                        <Input type="number" defaultValue="100" />
                      </div>
                      <button className="bg-[#ca6946] text-white px-6 py-2 rounded hover:bg-[#b55835]">
                        Lưu thay đổi
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
              <h2 className="font-['Lora'] mb-8">Quản lý người dùng</h2>

              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500 py-12">
                    Giao diện quản lý người dùng - Xem và quản lý tài khoản khách hàng, quyền và hoạt động
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

        </main>

        {/* Product Dialog - Rendered outside main to avoid container constraints */}
        {isDialogOpen && dialogType !== '' && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
            onClick={handleCloseDialog}
            style={{ position: 'fixed', zIndex: 9999 }}
          >
            <div 
              className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4 relative"
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', zIndex: 10000 }}
            >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {dialogType === 'create' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
                  </h2>
                  <button 
                    onClick={handleCloseDialog}
                    className="text-gray-500 hover:text-gray-700 text-2xl leading-none w-8 h-8 flex items-center justify-center"
                    type="button"
                    aria-label="Đóng"
                  >
                    ×
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {dialogType === 'create' 
                    ? 'Điền thông tin để tạo sản phẩm mới' 
                    : 'Cập nhật thông tin sản phẩm'}
                </p>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên sản phẩm *</Label>
                    <Input
                      id="name"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ví dụ: Áo thun Organic Cotton"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Tiêu đề *</Label>
                    <Input
                      id="title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Ví dụ: Áo thun thân thiện môi trường"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Mô tả *</Label>
                  <textarea
                    id="description"
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Mô tả chi tiết về sản phẩm..."
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Giá (₫) *</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      value={formData.price || 0}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="oldPrice">Giá cũ (₫)</Label>
                    <Input
                      id="oldPrice"
                      type="number"
                      min="0"
                      value={formData.oldPrice || 0}
                      onChange={(e) => setFormData({...formData, oldPrice: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryId">Danh mục *</Label>
                    <Select 
                      value={formData.categoryId || ''} 
                      onValueChange={(value) => setFormData({...formData, categoryId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent 
                        className="max-h-[200px] overflow-y-auto" 
                        style={{ zIndex: 10001 }} 
                        position="popper"
                      >
                        {categories && categories.length > 0 ? categories.map((cat: any) => (
                          <SelectItem key={cat.id || cat.name} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        )) : (
                          <SelectItem value="" disabled>Không có danh mục</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="stock">Tồn kho</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock || 0}
                      onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Số lượng</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="0"
                      value={formData.quantity || 0}
                      onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">URL Hình ảnh</Label>
                    <Input
                      id="image"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isNew"
                      checked={formData.isNew || false}
                      onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="isNew">Sản phẩm mới</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured || false}
                      onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="isFeatured">Nổi bật</Label>
                  </div>
                  {dialogType === 'edit' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive !== undefined ? formData.isActive : true}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="isActive">Kích hoạt</Label>
                    </div>
                  )}
                </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Hủy
                  </Button>
                  <Button onClick={handleSaveProduct}>
                    <Save className="w-4 h-4 mr-2" />
                    {dialogType === 'create' ? 'Tạo' : 'Lưu'}
                  </Button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
