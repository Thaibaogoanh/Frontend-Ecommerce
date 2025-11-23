import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Heart, Eye, ShoppingCart, ChevronRight, TrendingUp, Leaf } from 'lucide-react';
import { useState } from 'react';

const designs = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1655141559787-25ac8cfca72f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGVkJTIwdHNoaXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Minimalist Nature",
    artist: "Green Artist",
    category: "Nature",
    tags: ["eco", "minimal", "leaf"],
    price: 450000,
    likes: 234,
    views: 1520,
    isEco: true,
    isTrending: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1655141559812-42f8c1e8942d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwdHNoaXJ0JTIwcHJpbnR8ZW58MXx8fHwxNzYzODU1Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Save The Planet",
    artist: "Eco Designer",
    category: "Typography",
    tags: ["eco", "quote", "planet"],
    price: 399000,
    likes: 189,
    views: 980,
    isEco: true,
    isTrending: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1748712073377-5c200bf4cbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBpbGx1c3RyYXRpb24lMjBwbGFudHxlbnwxfHx8fDE3NjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Forest Spirit",
    artist: "Nature Lover",
    category: "Illustration",
    tags: ["forest", "nature", "green"],
    price: 520000,
    likes: 312,
    views: 2100,
    isEco: true,
    isTrending: true,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1676134893614-fc13ef156284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNzg3Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Ocean Waves",
    artist: "Blue Artist",
    category: "Abstract",
    tags: ["ocean", "wave", "blue"],
    price: 480000,
    likes: 267,
    views: 1450,
    isEco: true,
    isTrending: false,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1759572095329-1dcf9522762b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdHNoaXJ0fGVufDF8fHx8MTc2MzgzMTc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Green Revolution",
    artist: "Eco Warrior",
    category: "Typography",
    tags: ["eco", "revolution", "green"],
    price: 415000,
    likes: 198,
    views: 1120,
    isEco: true,
    isTrending: true,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1610518066693-8c9f6d3d6455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwb2dyYXBoeSUyMGRlc2lnbnxlbnwxfHx8fDE3NjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Vintage Nature",
    artist: "Retro Designer",
    category: "Vintage",
    tags: ["vintage", "nature", "retro"],
    price: 465000,
    likes: 221,
    views: 1340,
    isEco: false,
    isTrending: false,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1616397325279-e7bb752d0e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBtaW5pbWFsJTIwZGVzaWdufGVufDF8fHx8MTc2Mzg1NTM5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Modern Eco",
    artist: "Modern Artist",
    category: "Modern",
    tags: ["modern", "eco", "simple"],
    price: 435000,
    likes: 245,
    views: 1680,
    isEco: true,
    isTrending: true,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1567079292691-2ff16e275356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjB1cmJhbnxlbnwxfHx8fDE3NjM3NzI1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Earth Day",
    artist: "Green Creator",
    category: "Event",
    tags: ["earth", "day", "celebrate"],
    price: 390000,
    likes: 176,
    views: 890,
    isEco: true,
    isTrending: false,
  },
];

export function DesignGalleryPage() {
  const [sortBy, setSortBy] = useState('trending');
  const [likedDesigns, setLikedDesigns] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedDesigns(prev => 
      prev.includes(id) ? prev.filter(designId => designId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#BCF181] to-[#ca6946] text-black py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-['Lora'] mb-4">Discover Unique Designs</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Browse thousands of eco-friendly designs from talented artists around the world
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm thiết kế..."
                className="w-full pl-14 pr-4 py-4 rounded-full border-2 border-white/50 focus:outline-none focus:border-white bg-white/90 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="#home" className="hover:text-black">Home</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">Design Gallery</span>
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
                    {['All', 'Nature', 'Typography', 'Illustration', 'Abstract', 'Vintage', 'Modern'].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]">
                        <Checkbox />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Style</h4>
                  <div className="space-y-2">
                    {['Minimalist', 'Vintage', 'Modern', 'Hand-drawn', 'Geometric', 'Organic'].map((style) => (
                      <label key={style} className="flex items-center gap-2 cursor-pointer hover:text-[#ca6946]">
                        <Checkbox />
                        <span className="text-sm">{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-['Lato'] mb-3">Popular Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {['eco', 'nature', 'minimal', 'vintage', 'quote', 'animal', 'plant', 'ocean'].map((tag) => (
                      <button
                        key={tag}
                        className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:border-[#ca6946] hover:text-[#ca6946] transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Eco Only */}
                <div className="mb-6 pb-6 border-b">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox />
                    <Leaf className="w-4 h-4 text-green-700" />
                    <span>Eco-themed only</span>
                  </label>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-['Lato'] mb-3">Price Range</h4>
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
                  Showing <span className="font-medium">{designs.length}</span> designs
                </p>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Design Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {designs.map((design) => (
                  <div key={design.id} className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
                    {/* Image */}
                    <div className="block aspect-square relative overflow-hidden">
                      <a href="#design-detail" className="block w-full h-full">
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
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors pointer-events-auto ${
                            likedDesigns.includes(design.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white text-black hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${likedDesigns.includes(design.id) ? 'fill-current' : ''}`} />
                        </button>
                        <a
                          href="#design-detail"
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
                      <a href="#design-detail">
                        <h3 className="font-['Lato'] mb-1 hover:text-[#ca6946] transition-colors">{design.title}</h3>
                      </a>
                      <p className="text-sm text-gray-600 mb-3">by {design.artist}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {design.tags.slice(0, 3).map((tag) => (
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
                        <p className="font-medium">{design.price.toLocaleString('vi-VN')}₫</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2">
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