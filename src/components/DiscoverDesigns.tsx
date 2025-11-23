import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Eye, CheckCircle2 } from 'lucide-react';

const designs = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1676134893614-fc13ef156284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMHBhdHRlcm58ZW58MXx8fHwxNjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Abstract Waves",
    artist: "Studio Verde",
    likes: 234,
    views: 1520,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610518066693-8c9f6d3d6455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwb2dyYXBoeSUyMGRlc2lnbnxlbnwxfHx8fDE3NjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Vintage Typography",
    artist: "Eco Artist",
    likes: 189,
    views: 980,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1759572095329-1dcf9522762b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdHNoaXJ0fGVufDF8fHx8MTc2MzgzMTc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Minimalist Nature",
    artist: "Green Studio",
    likes: 456,
    views: 2340,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1616397325279-e7bb752d0e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBtaW5pbWFsJTIwZGVzaWdufGVufDF8fHx8MTc2Mzg1NTM5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Geometric Patterns",
    artist: "Design Lab",
    likes: 321,
    views: 1890,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1567079292691-2ff16e275356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjB1cmJhbnxlbnwxfHx8fDE3NjM3NzI1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Urban Street Art",
    artist: "City Canvas",
    likes: 567,
    views: 3200,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1748712073377-5c200bf4cbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBpbGx1c3RyYXRpb24lMjBwbGFudHxlbnwxfHx8fDE3NjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Botanical Illustration",
    artist: "Nature Prints",
    likes: 412,
    views: 2100,
  },
];

export function DiscoverDesigns() {
  return (
    <section id="designs" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Lato'] uppercase tracking-wider mb-3">
            Discover Unique Designs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá hàng trăm thiết kế độc đáo từ cộng đồng nghệ sĩ tài năng. 
            Chọn thiết kế yêu thích và tùy chỉnh trên phôi áo bền vững của bạn.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="px-6 py-2 bg-black text-white rounded-full">
            Tất cả
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-full hover:border-black transition-colors">
            Trending
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-full hover:border-black transition-colors">
            Mới nhất
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-full hover:border-black transition-colors">
            Phổ biến
          </button>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {designs.map((design) => (
            <a key={design.id} href="#design-detail" className="group cursor-pointer bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden aspect-square">
                <ImageWithFallback
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-[#ca6946] text-white px-6 py-3 rounded-full flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                    Use This Design
                  </button>
                </div>

                {/* Stats on Hover */}
                <div className="absolute top-3 left-3 right-3 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{design.likes}</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{design.views}</span>
                  </div>
                </div>

                {/* Like Button */}
                <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-['Lato'] mb-1">{design.title}</h3>
                <p className="text-gray-500">by {design.artist}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <a
            href="#designs"
            className="inline-block border-2 border-black hover:bg-black hover:text-white px-8 py-3 rounded-full transition-all"
          >
            Explore All Designs ({designs.length + 120})
          </a>
        </div>
      </div>
    </section>
  );
}