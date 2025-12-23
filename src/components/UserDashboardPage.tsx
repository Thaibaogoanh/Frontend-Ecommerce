import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
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
  ChevronRight,
  Trash2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { apiServices } from '../services/apiConfig';
import { useAuth } from '../hooks/useAuth';
import { Loading } from './ui/loading';
import { ErrorDisplay } from './ui/error';
import { toast } from "sonner";
import { Input } from './ui/input';

// ====== CHANGE PASSWORD FORM COMPONENT ======
function ChangePasswordForm({ onSuccess }: { token?: string; onSuccess?: () => void }) {
  const { getToken } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Vui lòng điền đầy đủ các trường');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Mật khẩu mới phải có ít nhất 8 ký tự');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        toast.error('Vui lòng đăng nhập lại');
        return;
      }

      // Call change password API
      await apiServices.auth.changePassword(
        {
          currentPassword,
          newPassword,
          confirmPassword
        },
        token
      );

      toast.success('Đã đổi mật khẩu thành công!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Không thể đổi mật khẩu';
      toast.error(msg);
      console.error('Change password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleChangePassword} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Mật khẩu hiện tại</label>
        <div className="relative">
          <Input
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Nhập mật khẩu hiện tại"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
        <div className="relative">
          <Input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu</label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Xác nhận mật khẩu mới"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ca6946] hover:bg-[#b55835] disabled:opacity-50 text-white py-3 rounded-full transition-all font-medium"
      >
        {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
      </button>
    </form>
  );
}

export function UserDashboardPage() {
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingFavorite, setRemovingFavorite] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getToken();
      if (!token) {
        setError('Not authenticated');
        return;
      }

      const [profileData, statsData, ordersData, favoritesData] = await Promise.all([
        apiServices.users.getProfile(token).catch(() => null),
        apiServices.users.getDashboardStats(token),
        apiServices.users.getRecentOrders(token, 10),
        apiServices.favorites.getAll(token)
      ]);

      setUserProfile(profileData);
      setStats(statsData);
      
      // Format orders từ API
      const ordersArray = Array.isArray(ordersData) ? ordersData : ((ordersData as any)?.orders || []);
      const formattedOrders = ordersArray.map((order: any) => ({
        id: order.id,
        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : '',
        status: order.status || order.Status || 'Processing',
        items: order.items?.length || 0,
        total: order.total || order.totalAmount || order.Total || 0,
        image: order.items?.[0]?.product?.image || 'https://placehold.co/400x300',
        order: order // Giữ nguyên order object để xem chi tiết
      }));
      setOrders(formattedOrders);
      
      // Format favorites từ API (có thể là design hoặc product)
      const favoritesList = Array.isArray(favoritesData) ? favoritesData : ((favoritesData as any)?.favorites || []);
      const formattedFavorites = favoritesList.map((fav: any) => {
        if (fav.designId || fav.DESIGN_ID || fav.design) {
          const design = fav.design || {};
          return {
            id: fav.id || fav.FAVORITE_ID,
            favoriteId: fav.id || fav.FAVORITE_ID,
            type: 'design',
            designId: fav.designId || fav.DESIGN_ID || design.DESIGN_ID,
            image: design.preview_url || fav.preview_url || 'https://placehold.co/400x400',
            name: design.title || fav.title || 'Thiết kế',
            price: 0, // Design không có price trực tiếp
            link: `#design-detail?id=${fav.designId || fav.DESIGN_ID || design.DESIGN_ID}`
          };
        } else if (fav.productId || fav.PRODUCT_ID || fav.product) {
          const product = fav.product || {};
          return {
            id: fav.id || fav.FAVORITE_ID,
            favoriteId: fav.id || fav.FAVORITE_ID,
            type: 'product',
            productId: fav.productId || fav.PRODUCT_ID || product.id,
            image: product.image || 'https://placehold.co/400x400',
            name: product.name || product.title || 'Sản phẩm',
            price: product.price || 0,
            link: `#blank-detail?id=${fav.productId || fav.PRODUCT_ID || product.id}`
          };
        }
        return null;
      }).filter(Boolean);
      setFavorites(formattedFavorites);
    } catch (err) {
      console.error('Dashboard load error:', err);
      const msg = err instanceof Error ? err.message : 'Không thể tải bảng điều khiển';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: string) => {
    const token = getToken();
    if (!token) return;
    
    try {
      setRemovingFavorite(favoriteId);
      await apiServices.favorites.remove(favoriteId, token);
      // Reload favorites
      const favoritesData = await apiServices.favorites.getAll(token);
      const favoritesList = Array.isArray(favoritesData) ? favoritesData : ((favoritesData as any)?.favorites || []);
      const formattedFavorites = favoritesList.map((fav: any) => {
        if (fav.designId || fav.DESIGN_ID || fav.design) {
          const design = fav.design || {};
          return {
            id: fav.id || fav.FAVORITE_ID,
            favoriteId: fav.id || fav.FAVORITE_ID,
            type: 'design',
            designId: fav.designId || fav.DESIGN_ID || design.DESIGN_ID,
            image: design.preview_url || fav.preview_url || 'https://placehold.co/400x400',
            name: design.title || fav.title || 'Thiết kế',
            price: 0,
            link: `#design-detail?id=${fav.designId || fav.DESIGN_ID || design.DESIGN_ID}`
          };
        } else if (fav.productId || fav.PRODUCT_ID || fav.product) {
          const product = fav.product || {};
          return {
            id: fav.id || fav.FAVORITE_ID,
            favoriteId: fav.id || fav.FAVORITE_ID,
            type: 'product',
            productId: fav.productId || fav.PRODUCT_ID || product.id,
            image: product.image || 'https://placehold.co/400x400',
            name: product.name || product.title || 'Sản phẩm',
            price: product.price || 0,
            link: `#blank-detail?id=${fav.productId || fav.PRODUCT_ID || product.id}`
          };
        }
        return null;
      }).filter(Boolean);
      setFavorites(formattedFavorites);
      toast.success('Đã xóa khỏi danh sách yêu thích');
    } catch (err) {
      console.error('Remove favorite error:', err);
      toast.error('Không thể xóa yêu thích');
    } finally {
      setRemovingFavorite(null);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <ErrorDisplay message={error} onRetry={loadDashboardData} />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loading text="Đang tải bảng điều khiển..." />
        </div>
        <Footer />
      </div>
    );
  }

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
              <a href="#home" className="hover:text-black">Trang chủ</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">Tài khoản của tôi</span>
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
                <h1 className="font-['Lora'] mb-2">{userProfile?.name || userProfile?.fullName || 'Người dùng'}</h1>
                <p className="text-white/90 mb-2">{userProfile?.email || 'email@example.com'}</p>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm">
                    {stats?.greenPoints ? `${stats.greenPoints.toLocaleString('vi-VN')} Điểm Xanh` : '0 Điểm Xanh'}
                    {stats?.treesPlanted ? ` • ${stats.treesPlanted} cây đã trồng` : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
              <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
              <TabsTrigger value="rewards">Phần thưởng</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
                    <ShoppingBag className="w-4 h-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">{stats?.totalOrders || 0}</div>
                    <p className="text-xs text-gray-600 mt-1">{orders.length} đơn hàng gần đây</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Điểm Xanh</CardTitle>
                    <Leaf className="w-4 h-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">{(stats?.greenPoints || 0).toLocaleString('vi-VN')}</div>
                    <p className="text-xs text-gray-600 mt-1">
                      {stats?.greenPoints && stats.greenPoints < 1500 
                        ? `${(1500 - stats.greenPoints).toLocaleString('vi-VN')} điểm đến phần thưởng tiếp theo`
                        : 'Đã đạt mức tối đa'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Thiết kế đã lưu</CardTitle>
                    <Heart className="w-4 h-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-2xl">{favorites.length}</div>
                    <p className="text-xs text-gray-600 mt-1">Thiết kế và sản phẩm yêu thích</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Đơn hàng gần đây</CardTitle>
                  <CardDescription>Giao dịch mua hàng mới nhất của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Chưa có đơn hàng nào</p>
                    ) : (
                      orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <ImageWithFallback 
                            src={order.image} 
                            alt="Order" 
                            className="w-16 h-16 rounded object-cover" 
                          />
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
                            <a 
                              href={`#order-detail?id=${order.id}`}
                              className="text-sm text-[#ca6946] hover:underline"
                            >
                              Xem chi tiết
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử đơn hàng</CardTitle>
                  <CardDescription>Xem và theo dõi tất cả đơn hàng của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Chưa có đơn hàng nào</p>
                    ) : (
                      orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-['Lato'] mb-1">{order.id}</h3>
                              <p className="text-sm text-gray-600">Đặt vào {order.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(order.status)}
                              <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Delivered' || order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'In Transit' || order.status === 'in_transit' || order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                  'bg-orange-100 text-orange-700'
                                }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            <ImageWithFallback 
                              src={order.image} 
                              alt="Order" 
                              className="w-20 h-20 rounded object-cover" 
                            />
                            <div>
                              <p className="text-sm text-gray-600">{order.items} items</p>
                              <p className="font-bold">{order.total.toLocaleString('vi-VN')}₫</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <a 
                              href={`#order-detail?id=${order.id}`}
                              className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors text-center"
                            >
                              Xem chi tiết
                            </a>
                            {(order.status === 'Delivered' || order.status === 'delivered') && (
                              <button className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors">
                                Mua lại
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Thiết kế đã lưu</CardTitle>
                  <CardDescription>Thiết kế và sản phẩm yêu thích của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {favorites.length === 0 ? (
                      <div className="col-span-3 text-center text-gray-500 py-8">
                        <p>Chưa có mục yêu thích nào</p>
                        <a href="#designs" className="text-[#ca6946] hover:underline mt-2 inline-block">
                          Khám phá thiết kế
                        </a>
                      </div>
                    ) : (
                      favorites.map((item) => (
                        <div key={item.id} className="group">
                          <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                            <a href={item.link}>
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </a>
                            <button
                              onClick={() => item.favoriteId && handleRemoveFavorite(item.favoriteId)}
                              disabled={removingFavorite === item.favoriteId}
                              className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 disabled:opacity-50"
                              title="Xóa khỏi yêu thích"
                            >
                              {removingFavorite === item.favoriteId ? (
                                <Loading text="" />
                              ) : (
                                <Trash2 className="w-5 h-5 text-red-500" />
                              )}
                            </button>
                          </div>
                          <a href={item.link}>
                            <h3 className="font-['Lato'] mb-1 hover:text-[#ca6946]">{item.name}</h3>
                          </a>
                          {item.price > 0 && (
                            <p className="font-medium mb-2">{item.price.toLocaleString('vi-VN')}₫</p>
                          )}
                          {item.type === 'product' && (
                            <a
                              href={item.link}
                              className="w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-2 rounded-full transition-all block text-center"
                            >
                              Xem chi tiết
                            </a>
                          )}
                          {item.type === 'design' && (
                            <a
                              href={item.link}
                              className="w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-2 rounded-full transition-all block text-center"
                            >
                              Xem thiết kế
                            </a>
                          )}
                        </div>
                      ))
                    )}
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
                      Điểm Xanh
                    </CardTitle>
                    <CardDescription>Kiếm điểm với mỗi lần mua sản phẩm thân thiện môi trường</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-bold text-4xl">{(stats?.greenPoints || 0).toLocaleString('vi-VN')}</span>
                        <span className="text-gray-600">điểm</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#BCF181] h-2 rounded-full" 
                          style={{ width: `${Math.min(100, ((stats?.greenPoints || 0) / 1500) * 100)}%` }} 
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {stats?.greenPoints && stats.greenPoints < 1500
                          ? `${(1500 - stats.greenPoints).toLocaleString('vi-VN')} điểm đến cấp phần thưởng tiếp theo`
                          : 'Đã đạt mức tối đa'}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Cách kiếm điểm:</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• 10 điểm cho mỗi 100.000₫ chi tiêu</p>
                        <p>• 50 điểm thưởng cho sản phẩm thân thiện môi trường</p>
                        <p>• 100 điểm cho việc viết đánh giá</p>
                        <p>• 200 điểm cho việc giới thiệu bạn bè</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-[#ca6946]" />
                      Voucher có sẵn
                    </CardTitle>
                    <CardDescription>Đổi điểm của bạn để nhận phần thưởng</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-[#BCF181] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">GIẢM 10%</h4>
                          <span className="text-sm text-gray-600">500 điểm</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Cho đơn hàng trên 500.000₫</p>
                        <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors">
                          Đổi điểm
                        </button>
                      </div>

                      <div className="border-2 border-dashed border-[#BCF181] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">MIỄN PHÍ VẬN CHUYỂN</h4>
                          <span className="text-sm text-gray-600">300 điểm</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Cho đơn hàng tiếp theo</p>
                        <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors">
                          Đổi điểm
                        </button>
                      </div>

                      <div className="border-2 border-gray-200 rounded-lg p-4 opacity-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">GIẢM 20%</h4>
                          <span className="text-sm text-gray-600">1.500 điểm</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Cho đơn hàng trên 1.000.000₫</p>
                        <button className="w-full bg-gray-300 text-gray-500 py-2 rounded-full cursor-not-allowed">
                          Không đủ điểm
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
                      Thông tin cá nhân
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Họ và tên</label>
                      <input
                        type="text"
                        defaultValue={userProfile?.name || userProfile?.fullName || ''}
                        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#BCF181]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={userProfile?.email || ''}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                      <input
                        type="tel"
                        defaultValue={userProfile?.phone || ''}
                        onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#BCF181]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                      <input
                        type="text"
                        defaultValue={userProfile?.address || ''}
                        onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#BCF181]"
                      />
                    </div>
                    <button 
                      onClick={async () => {
                        try {
                          const token = getToken();
                          if (!token) return;
                          await apiServices.users.updateProfile({
                            name: userProfile?.name,
                            phone: userProfile?.phone,
                            address: userProfile?.address,
                          }, token);
                          toast.success('Đã cập nhật thông tin thành công!');
                          await loadDashboardData();
                        } catch (err) {
                          const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
                          toast.error('Không thể cập nhật thông tin: ' + msg);
                        }
                      }}
                      className="w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-3 rounded-full transition-all"
                    >
                      Lưu thay đổi
                    </button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Đổi mật khẩu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChangePasswordForm token={userProfile?.token} onSuccess={() => loadDashboardData()} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Tùy chọn
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Thông báo Email</p>
                        <p className="text-sm text-gray-600">Nhận cập nhật về đơn hàng</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Marketing</p>
                        <p className="text-sm text-gray-600">Nhận ưu đãi đặc biệt và tin tức</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mẹo Xanh</p>
                        <p className="text-sm text-gray-600">Mẹo bền vững hàng tuần</p>
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
