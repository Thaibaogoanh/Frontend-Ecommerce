import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Heart, Eye, ShoppingCart, ChevronRight, TrendingUp, Leaf } from 'lucide-react';
import { apiServices } from '../services/apiConfig';
import { useAuth } from '../hooks/useAuth';
import { Loading } from './ui/loading';
import { ErrorDisplay } from './ui/error';
import { toast } from 'sonner';

export function DesignGalleryPage() {
  // ==================
  // STATE MANAGEMENT
  // ==================
  const [designs, setDesigns] = useState<any[]>([]);
  const [allDesigns, setAllDesigns] = useState<any[]>([]); // Store all designs for client-side filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDesigns, setTotalDesigns] = useState(0);
  const ITEMS_PER_PAGE = 12;
  
  // Sorting
  const [sortBy, setSortBy] = useState('trending');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [ecoOnly, setEcoOnly] = useState(false);
  
  // Favorites/Likes
  const [likedDesigns, setLikedDesigns] = useState<string[]>([]);

  // ==================
  // EFFECTS
  // ==================
  
  useEffect(() => {
    loadDesigns();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [allDesigns, selectedCategories, selectedStyles, selectedTags, ecoOnly, searchQuery, sortBy, currentPage]);

  // ==================
  // DATA LOADING
  // ==================

  const loadDesigns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load all approved designs (pagination on frontend for simplicity)
      const response = await apiServices.designs.getAll(1, 100) as any;
      
      // Transform API response to match component structure
      const transformedDesigns = (response.designs || response || []).map((design: any) => ({
        id: design.DESIGN_ID || design.id,
        title: design.title || 'Untitled Design',
        artist: design.artist || 'Unknown Artist',
        image: design.preview_url || design.image || 'https://placehold.co/400x400',
        likes: design.likes || 0,
        views: design.downloads || design.views || 0,
        price: design.price || 0,
        // Parse tags - can be comma-separated string or array
        tags: design.design_tag 
          ? (typeof design.design_tag === 'string' 
              ? design.design_tag.split(',').map((t: string) => t.trim().toLowerCase()) 
              : [design.design_tag.toLowerCase()])
          : [],
        category: design.category || 'Modern',
        style: 'Modern', // Default - could be extended
        status: design.status || 'approved',
        // Badges
        isEco: (design.design_tag || '').toLowerCase().includes('eco') || 
               (design.category || '').toLowerCase().includes('eco') ||
               (design.category || '').toLowerCase().includes('nature') ||
               (design.category || '').toLowerCase().includes('sustainable'),
        isTrending: (design.likes || 0) > 5 || (design.downloads || 0) > 20,
      }));
      
      setAllDesigns(transformedDesigns);
      setTotalDesigns(transformedDesigns.length);
      setCurrentPage(1);
    } catch (err) {
      console.error('Design loading error:', err);
      setError(err instanceof Error ? err.message : 'Không thể tải thiết kế');
    } finally {
      setLoading(false);
    }
  };

  // ==================
  // FILTERING & SORTING
  // ==================

  const applyFiltersAndSort = () => {
    let filtered = [...allDesigns];

    // 1. SEARCH FILTER
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(design => 
        design.title.toLowerCase().includes(query) ||
        design.artist.toLowerCase().includes(query) ||
        (Array.isArray(design.tags) && design.tags.some(tag => tag.includes(query)))
      );
    }

    // 2. CATEGORY FILTER
    if (selectedCategories.length > 0 && !selectedCategories.includes('All')) {
      filtered = filtered.filter(design => 
        selectedCategories.some(cat => 
          design.category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // 3. STYLE FILTER
    if (selectedStyles.length > 0) {
      filtered = filtered.filter(design => 
        selectedStyles.includes(design.style)
      );
    }

    // 4. TAG FILTER
    if (selectedTags.length > 0) {
      filtered = filtered.filter(design => 
        Array.isArray(design.tags) && design.tags.some(tag => selectedTags.includes(tag))
      );
    }

    // 5. ECO FILTER
    if (ecoOnly) {
      filtered = filtered.filter(design => design.isEco);
    }

    // 6. SORTING
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'trending':
      default:
        filtered.sort((a, b) => b.likes - a.likes);
    }

    // 7. PAGINATION (Client-side)
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedDesigns = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    setDesigns(paginatedDesigns);
    setTotalDesigns(filtered.length);
  };

  // ==================
  // INTERACTION HANDLERS
  // ==================

  const { getToken } = useAuth();
  
  const toggleLike = async (designId: string) => {
    const token = getToken();
    if (!token) {
      toast.error('Vui lòng đăng nhập để lưu yêu thích');
      window.location.hash = '#login';
      return;
    }

    try {
      const isCurrentlyLiked = likedDesigns.includes(designId);
      
      if (isCurrentlyLiked) {
        // Remove from favorites
        // Find favorite ID by design ID
        // For now, we'll just update local state and try to find it
        const designObj = designs.find(d => d.id === designId);
        if (designObj && designObj.favoriteId) {
          await apiServices.favorites.remove(designObj.favoriteId, token);
        }
      } else {
        // Add to favorites
        await apiServices.favorites.add({ designId }, token);
      }
      
      // Update local state after successful backend operation
      setLikedDesigns(prev =>
        prev.includes(designId) 
          ? prev.filter(id => id !== designId) 
          : [...prev, designId]
      );
      
      toast.success(isCurrentlyLiked ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào yêu thích');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Lỗi khi cập nhật yêu thích';
      toast.error(message);
      console.error('Error toggling like:', err);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedStyles([]);
    setSelectedTags([]);
    setEcoOnly(false);
    setSortBy('trending');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalDesigns / ITEMS_PER_PAGE);

  // ==================
  // ERROR STATE
  // ==================

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <ErrorDisplay message={error} onRetry={loadDesigns} />
        </div>
        <Footer />
      </div>
    );
  }

  // ==================
  // LOADING STATE
  // ==================

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  // ==================
  // RENDER
  // ==================

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#BCF181] to-[#ca6946] text-black py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-['Lora'] text-4xl mb-4">Khám phá thiết kế độc đáo</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Duyệt hàng nghìn thiết kế thân thiện môi trường từ các nghệ sĩ tài năng trên khắp thế giới
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm thiết kế..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-14 pr-4 py-4 rounded-full border-2 border-white/50 focus:outline-none focus:border-white bg-white/90 backdrop-blur-sm transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="#home" className="hover:text-black">Trang chủ</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">Thư viện thiết kế</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar - Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-['Lato'] text-sm font-bold uppercase">Bộ lọc</h3>
                  <button 
                    onClick={clearAllFilters}
                    className="text-[#ca6946] hover:underline text-xs"
                  >
                    Xóa tất cả
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] font-semibold mb-3 text-sm">Danh mục</h4>
                  <div className="space-y-2">
                    {['All', 'Modern', 'Vintage', 'Minimalist', 'Nature', 'Abstract'].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946] text-sm">
                        <Checkbox
                          checked={selectedCategories.includes(cat)}
                          onCheckedChange={() => toggleCategory(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Style Filter */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] font-semibold mb-3 text-sm">Phong cách</h4>
                  <div className="space-y-2">
                    {['Minimalist', 'Vintage', 'Modern', 'Hand-drawn', 'Geometric', 'Organic'].map((style) => (
                      <label key={style} className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946] text-sm">
                        <Checkbox
                          checked={selectedStyles.includes(style)}
                          onCheckedChange={() => toggleStyle(style)}
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags Filter */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] font-semibold mb-3 text-sm">Thẻ phổ biến</h4>
                  <div className="flex flex-wrap gap-2">
                    {['eco', 'nature', 'minimal', 'vintage', 'quote', 'animal', 'plant', 'ocean'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 border rounded-full text-xs transition-colors ${
                          selectedTags.includes(tag)
                            ? 'border-[#ca6946] bg-[#ca6946] text-white'
                            : 'border-gray-300 hover:border-[#ca6946] hover:text-[#ca6946]'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Eco Only Filter */}
                <div className="mb-6 pb-6 border-b">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]">
                    <Checkbox
                      checked={ecoOnly}
                      onCheckedChange={(checked) => setEcoOnly(checked as boolean)}
                    />
                    <Leaf className="w-4 h-4 text-green-700" />
                    <span className="text-sm">Chỉ thiết kế Xanh</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort & Filter Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 text-sm">
                  Hiển thị <span className="font-medium">{designs.length}</span> / {totalDesigns} thiết kế
                </p>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Đang thịnh hành</SelectItem>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="popular">Phổ biến nhất</SelectItem>
                    <SelectItem value="price-low">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price-high">Giá: Cao đến thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* No Results Message */}
              {designs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Không tìm thấy thiết kế phù hợp</p>
                  <button
                    onClick={clearAllFilters}
                    className="text-[#ca6946] hover:underline mt-2"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}

              {/* Design Grid */}
              {designs.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {designs.map((design) => (
                      <div key={design.id} className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
                        {/* Image */}
                        <div className="block aspect-square relative overflow-hidden">
                          <a href={`#design-detail?id=${design.id}`} className="block w-full h-full">
                            <ImageWithFallback
                              src={design.image}
                              alt={design.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </a>

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                            {design.isEco && (
                              <div className="bg-[#BCF181] px-2 py-1 rounded-full flex items-center gap-1">
                                <Leaf className="w-3 h-3 text-green-800" />
                                <span className="text-green-800 text-xs font-semibold">Eco</span>
                              </div>
                            )}
                            {design.isTrending && (
                              <div className="bg-[#ca6946] px-2 py-1 rounded-full flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-white" />
                                <span className="text-white text-xs font-semibold">Trending</span>
                              </div>
                            )}
                          </div>

                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 pointer-events-none">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleLike(design.id);
                              }}
                              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors pointer-events-auto ${
                                likedDesigns.includes(design.id)
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white text-black hover:bg-red-500 hover:text-white'
                              }`}
                            >
                              <Heart className={`w-5 h-5 ${likedDesigns.includes(design.id) ? 'fill-current' : ''}`} />
                            </button>
                            <a
                              href={`#design-detail?id=${design.id}`}
                              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#BCF181] transition-colors pointer-events-auto"
                            >
                              <Eye className="w-5 h-5 text-black" />
                            </a>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#ca6946] hover:text-white transition-colors pointer-events-auto"
                            >
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          <a href={`#design-detail?id=${design.id}`}>
                            <h3 className="font-['Lato'] font-semibold mb-1 hover:text-[#ca6946] transition-colors line-clamp-2">{design.title}</h3>
                          </a>
                          <p className="text-sm text-gray-600 mb-3">by {design.artist}</p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {Array.isArray(design.tags) && design.tags.length > 0 ? (
                              design.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                                  #{tag}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">Không có tag</span>
                            )}
                          </div>

                          {/* Stats & Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {design.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {design.views}
                              </span>
                            </div>
                            <p className="font-semibold text-[#ca6946]">
                              {design.price > 0 ? `${design.price.toLocaleString('vi-VN')}₫` : 'Miễn phí'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mb-8">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        ← Trước
                      </button>

                      {/* Page Numbers */}
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded transition-colors ${
                              currentPage === page
                                ? 'bg-black text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Sau →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
