import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Leaf, Recycle, Search, Star, Grid3x3, List, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const blanksProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1596723524688-176682618fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFuayUyMHdoaXRlJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Organic Cotton T-Shirt",
    category: "T-Shirt",
    type: "V-Neck",
    price: 299000,
    material: "Organic Cotton",
    inkType: "Water-based",
    rating: 4.8,
    reviews: 124,
    isEco: true,
    isRecycled: false,
    colors: ["#FFFFFF", "#000000", "#3B82F6", "#10B981"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1675239514439-1c128b0cffcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Recycled Cotton Tee",
    category: "T-Shirt",
    type: "Crew Neck",
    price: 259000,
    material: "Recycled Cotton",
    inkType: "Eco-Certified",
    rating: 4.6,
    reviews: 89,
    isEco: true,
    isRecycled: true,
    colors: ["#FFFFFF", "#000000", "#F59E0B", "#EF4444", "#8B5CF6"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1759738099669-d64b0656f6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmYWJyaWMlMjB0ZXh0aWxlfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Bamboo Blend Henley",
    category: "Henley",
    type: "Henley Style",
    price: 349000,
    material: "Bamboo Blend",
    inkType: "Water-based",
    rating: 4.9,
    reviews: 156,
    isEco: true,
    isRecycled: false,
    colors: ["#FFFFFF", "#000000", "#6B7280", "#92400E"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHdoaXRlJTIwaG9vZGllfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Eco Fleece Hoodie",
    category: "Hoodie",
    type: "Full Zip",
    price: 599000,
    material: "Recycled Polyester",
    inkType: "Water-based",
    rating: 4.7,
    reviews: 203,
    isEco: true,
    isRecycled: true,
    colors: ["#000000", "#6B7280"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1695548487486-3649bfc8dd9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGFwcGFyZWx8ZW58MXx8fHwxNzYzODU1Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Hemp Cotton Blend Tee",
    category: "T-Shirt",
    type: "Crew Neck",
    price: 319000,
    material: "Hemp Cotton",
    inkType: "Eco-Certified",
    rating: 4.5,
    reviews: 67,
    isEco: true,
    isRecycled: false,
    colors: ["#FFFFFF", "#000000", "#10B981"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1671438118097-479e63198629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xvJTIwc2hpcnQlMjBtb2NrdXB8ZW58MXx8fHwxNzYzODU1MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Organic Polo Shirt",
    category: "Polo",
    type: "Classic Polo",
    price: 379000,
    material: "Organic Cotton",
    inkType: "Water-based",
    rating: 4.8,
    reviews: 145,
    isEco: true,
    isRecycled: false,
    colors: ["#FFFFFF", "#000000", "#3B82F6"],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1744551472645-7fd56c0406ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW5rJTIwdG9wJTIwYXRobGV0aWN8ZW58MXx8fHwxNzYzODU1MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Recycled Tank Top",
    category: "Tank Top",
    type: "Athletic",
    price: 229000,
    material: "Recycled Cotton",
    inkType: "Eco-Certified",
    rating: 4.4,
    reviews: 92,
    isEco: true,
    isRecycled: true,
    colors: ["#FFFFFF", "#000000", "#6B7280"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1649879681508-e21645a743bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25nJTIwc2xlZXZlJTIwc2hpcnR8ZW58MXx8fHwxNzYzODU1MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Bamboo Long Sleeve",
    category: "Long Sleeve",
    type: "Crew Neck",
    price: 399000,
    material: "Bamboo Blend",
    inkType: "Water-based",
    rating: 4.9,
    reviews: 178,
    isEco: true,
    isRecycled: false,
    colors: ["#FFFFFF", "#000000", "#92400E"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

export function BlanksListingPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="#home" className="hover:text-black">Home</a>
              <span>/</span>
              <span className="text-black">Shop Sustainable Blanks</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar - Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-['Lato'] uppercase">Filters</h3>
                  <button className="text-[#ca6946] hover:underline">Clear All</button>
                </div>

                {/* Category */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Category</h4>
                  <div className="space-y-2">
                    {['T-Shirt', 'Hoodie', 'Henley', 'Polo', 'Tank Top', 'Long Sleeve'].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]">
                        <Checkbox />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Material */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Material</h4>
                  <div className="space-y-2">
                    {['Organic Cotton', 'Recycled Cotton', 'Bamboo Blend', 'Hemp Cotton', 'Recycled Polyester'].map((mat) => (
                      <label key={mat} className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]">
                        <Checkbox />
                        <span className="text-sm">{mat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ink Type */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Ink Type</h4>
                  <div className="space-y-2">
                    {['Water-based', 'Eco-Certified', 'Plant-based', 'Non-toxic'].map((ink) => (
                      <label key={ink} className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]">
                        <Checkbox />
                        <span className="text-sm">{ink}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map((size) => (
                      <button
                        key={size}
                        className="px-3 py-1 border border-gray-300 rounded hover:border-black hover:bg-black hover:text-white transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Color</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {['#FFFFFF', '#000000', '#6B7280', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#92400E'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Price Range</h4>
                  <Slider defaultValue={[0, 1000000]} max={1000000} step={10000} className="mb-3" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0₫</span>
                    <span>1,000,000₫</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-['Lato'] mb-3">Avg. Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]">
                        <Checkbox />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm ml-1">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search & Sort Bar */}
              <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm phôi áo..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#BCF181]"
                    />
                  </div>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    <span>Filters</span>
                  </button>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="best-selling">Best Selling</SelectItem>
                      <SelectItem value="top-rated">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="hidden md:flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 border rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                      <Grid3x3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 border rounded ${viewMode === 'list' ? 'bg-black text-white' : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Results Count */}
                <p className="text-gray-600">
                  Showing <span className="font-medium">{blanksProducts.length}</span> products
                </p>
              </div>

              {/* Product Grid */}
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {blanksProducts.map((product) => (
                  <a
                    key={product.id}
                    href="#blank-detail"
                    className={`group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all ${
                      viewMode === 'list' ? 'flex gap-4' : ''
                    }`}
                  >
                    <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'aspect-[3/4]' : 'w-48 h-48'}`}>
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isEco && (
                          <div className="bg-[#BCF181] px-2 py-1 rounded-full flex items-center gap-1">
                            <Leaf className="w-3 h-3 text-green-800" />
                            <span className="text-green-800 text-xs">Eco</span>
                          </div>
                        )}
                        {product.isRecycled && (
                          <div className="bg-blue-100 px-2 py-1 rounded-full flex items-center gap-1">
                            <Recycle className="w-3 h-3 text-blue-800" />
                            <span className="text-blue-800 text-xs">Recycled</span>
                          </div>
                        )}
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                    </div>

                    <div className="p-4 flex-1">
                      <p className="text-gray-500 text-sm mb-1">{product.type}</p>
                      <h3 className="font-['Lato'] mb-2">{product.name}</h3>
                      
                      {/* Material & Ink */}
                      <div className="text-xs text-gray-600 mb-2">
                        <p>{product.material} • {product.inkType}</p>
                      </div>

                      {/* Colors */}
                      <div className="flex items-center gap-2 mb-3">
                        {product.colors.slice(0, 4).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        {product.colors.length > 4 && (
                          <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                        )}
                      </div>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <p className="font-['Lato']">{product.price.toLocaleString('vi-VN')}₫</p>
                        <button className="bg-[#ca6946] hover:bg-[#b55835] text-white px-4 py-2 rounded-full transition-colors text-sm">
                          Customize
                        </button>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 bg-black text-white rounded">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                  Next
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