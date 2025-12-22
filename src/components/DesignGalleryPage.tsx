import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Heart, Eye, ShoppingCart, ChevronRight, TrendingUp, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiServices } from '../services/apiConfig';
import { Loading } from './ui/loading';
import { ErrorDisplay } from './ui/error';

// Designs are now loaded from API

export function DesignGalleryPage() {
  const [designs, setDesigns] = useState<any[]>([]);
  const [allDesigns, setAllDesigns] = useState<any[]>([]); // Store all designs for filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('trending');
  const [likedDesigns, setLikedDesigns] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [ecoOnly, setEcoOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDesigns();
  }, [currentPage]);

  useEffect(() => {
    // Apply filters when they change
    applyFilters();
  }, [allDesigns, selectedCategories, selectedStyles, selectedTags, ecoOnly, searchQuery, sortBy]);

  const loadDesigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiServices.designs.getAll(currentPage, 100) as any; // Load more for filtering
      // Transform the API response to match the component's expected structure
      const transformedDesigns = (response.designs || []).map((design: any) => ({
        id: design.DESIGN_ID,
        title: design.title,
        artist: 'Designer', // Default since API doesn't provide this
        image: design.preview_url || 'https://placehold.co/400x400',
        likes: design.likes || 0,
        views: design.downloads || 0,
        price: 0, // Default price
        tags: design.design_tag ? [design.design_tag.toLowerCase()] : [],
        category: design.category || 'All',
        style: 'Modern', // Default
        isEco: design.category?.toLowerCase().includes('eco') || design.category?.toLowerCase().includes('nature'),
        isTrending: design.likes > 10 || design.downloads > 50,
      }));
      setAllDesigns(transformedDesigns);
      const total = response.total || 0;
      setTotalPages(Math.ceil(total / 12));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải thiết kế');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allDesigns];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(d => 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.tags && d.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes('All')) {
      filtered = filtered.filter(d => selectedCategories.includes(d.category));
    }

    // Style filter
    if (selectedStyles.length > 0) {
      filtered = filtered.filter(d => selectedStyles.includes(d.style));
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(d => 
        d.tags && d.tags.some((tag: string) => selectedTags.includes(tag))
      );
    }

    // Eco filter
    if (ecoOnly) {
      filtered = filtered.filter(d => d.isEco);
    }

    // Sort
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.likes - a.likes);
        break;
      case 'newest':
        // Assuming designs have createdAt, otherwise keep original order
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    // Paginate
    const start = (currentPage - 1) * 12;
    const end = start + 12;
    setDesigns(filtered.slice(start, end));
    setTotalPages(Math.ceil(filtered.length / 12));
  };

  const toggleLike = (id: number) => {
    setLikedDesigns(prev =>
      prev.includes(id) ? prev.filter(designId => designId !== id) : [...prev, id]
    );
  };

  const toggleCategory = (category: string) => {
    if (category === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
    setCurrentPage(1);
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedStyles([]);
    setSelectedTags([]);
    setEcoOnly(false);
    setSearchQuery('');
    setCurrentPage(1);
  };

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#BCF181] to-[#ca6946] text-black py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-['Lora'] mb-4">Khám phá thiết kế độc đáo</h1>
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
                className="w-full pl-14 pr-4 py-4 rounded-full border-2 border-white/50 focus:outline-none focus:border-white bg-white/90 backdrop-blur-sm"
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
                  <h3 className="font-['Lato'] uppercase">Bộ lọc</h3>
                  <button 
                    onClick={clearAllFilters}
                    className="text-[#ca6946] hover:underline"
                  >
                    Xóa tất cả
                  </button>
                </div>

                {/* Category */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Danh mục</h4>
                  <div className="space-y-2">
                    {['All', 'Nature', 'Typography', 'Illustration', 'Abstract', 'Vintage', 'Modern'].map((cat) => (
                      <label 
                        key={cat} 
                        className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]"
                      >
                        <Checkbox 
                          checked={cat === 'All' ? selectedCategories.length === 0 : selectedCategories.includes(cat)}
                          onCheckedChange={() => toggleCategory(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Phong cách</h4>
                  <div className="space-y-2">
                    {['Minimalist', 'Vintage', 'Modern', 'Hand-drawn', 'Geometric', 'Organic'].map((style) => (
                      <label 
                        key={style} 
                        className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]"
                      >
                        <Checkbox 
                          checked={selectedStyles.includes(style)}
                          onCheckedChange={() => toggleStyle(style)}
                        />
                        <span className="text-sm">{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Thẻ phổ biến</h4>
                  <div className="flex flex-wrap gap-2">
                    {['eco', 'nature', 'minimal', 'vintage', 'quote', 'animal', 'plant', 'ocean'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 border rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'border-[#ca6946] text-[#ca6946] bg-[#ca6946]/10'
                            : 'border-gray-300 hover:border-[#ca6946] hover:text-[#ca6946]'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Eco Only */}
                <div className="mb-6 pb-6 border-b">
                  <label 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setEcoOnly(!ecoOnly);
                      setCurrentPage(1);
                    }}
                  >
                    <Checkbox 
                      checked={ecoOnly}
                      onCheckedChange={(checked) => {
                        setEcoOnly(checked as boolean);
                        setCurrentPage(1);
                      }}
                    />
                    <Leaf className="w-4 h-4 text-green-700" />
                    <span>Chỉ chủ đề Xanh</span>
                  </label>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-['Lato'] mb-3">Khoảng giá</h4>
                  <div className="space-y-2">
                    {['Under 400k', '400k - 500k', '500k - 600k', 'Over 600k'].map((range) => (
                      <label key={range} className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]">
                        <Checkbox />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort & Filter Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Hiển thị <span className="font-medium">{designs.length}</span> thiết kế
                </p>

                <Select 
                  value={sortBy} 
                  onValueChange={(value) => {
                    setSortBy(value);
                    setCurrentPage(1);
                  }}
                >
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

              {/* Design Grid */}
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
                            <span className="text-green-800 text-xs">Eco</span>
                          </div>
                        )}
                        {design.isTrending && (
                          <div className="bg-[#ca6946] px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-white" />
                            <span className="text-white text-xs">Trending</span>
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
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors pointer-events-auto ${likedDesigns.includes(design.id)
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
                        <h3 className="font-['Lato'] mb-1 hover:text-[#ca6946] transition-colors">{design.title}</h3>
                      </a>
                      <p className="text-sm text-gray-600 mb-3">by {design.artist}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(design.tags || []).slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
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
                        <p className="font-medium">{(design.price || 0).toLocaleString('vi-VN')}₫</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                  Trước
                </button>
                <button className="px-4 py-2 bg-black text-white rounded">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}