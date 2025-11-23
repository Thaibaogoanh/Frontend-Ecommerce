import { ImageWithFallback } from './figma/ImageWithFallback';
import { Leaf, Palette } from 'lucide-react';

const blanks = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1596723524688-176682618fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFuayUyMHdoaXRlJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Organic Cotton T-Shirt",
    type: "V-Neck",
    price: 299000,
    isEco: true,
    colors: ["#FFFFFF", "#000000", "#3B82F6", "#10B981"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1675239514439-1c128b0cffcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Recycled Cotton Tee",
    type: "Crew Neck",
    price: 259000,
    isEco: true,
    colors: ["#FFFFFF", "#000000", "#F59E0B", "#EF4444", "#8B5CF6"],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1759738099669-d64b0656f6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmYWJyaWMlMjB0ZXh0aWxlfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Bamboo Blend Henley",
    type: "Henley Style",
    price: 349000,
    isEco: true,
    colors: ["#FFFFFF", "#000000", "#6B7280", "#92400E"],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHdoaXRlJTIwaG9vZGllfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Eco Fleece Hoodie",
    type: "Full Zip",
    price: 599000,
    isEco: true,
    colors: ["#000000", "#6B7280"],
  },
];

export function ShopSustainableBlanks() {
  return (
    <section id="shop-blanks" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#BCF181]/20 px-4 py-2 rounded-full mb-4">
            <Leaf className="w-4 h-4 text-green-700" />
            <span className="text-green-700">Sustainable Materials</span>
          </div>
          <h2 className="font-['Lato'] uppercase tracking-wider mb-3">
            Shop Sustainable Blanks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chọn từ bộ sưu tập phôi áo cao cấp làm từ vật liệu bền vững. 
            Mỗi sản phẩm đều được chứng nhận organic và thân thiện với môi trường.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {blanks.map((blank) => (
            <a key={blank.id} href="#blank-detail" className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden aspect-[3/4]">
                <ImageWithFallback
                  src={blank.image}
                  alt={blank.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Eco Badge */}
                {blank.isEco && (
                  <div className="absolute top-3 left-3 bg-[#BCF181] px-3 py-1 rounded-full flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-green-800" />
                    <span className="text-green-800 text-xs">Eco</span>
                  </div>
                )}

                {/* Customize Button - Shows on Hover */}
                <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#ca6946] text-white px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#b55835] flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0">
                  <Palette className="w-4 h-4" />
                  Customize
                </button>
              </div>

              <div className="p-4">
                <p className="text-gray-500 text-sm mb-1">{blank.type}</p>
                <h3 className="font-['Lato'] mb-2">{blank.name}</h3>
                
                {/* Colors */}
                <div className="flex items-center gap-2 mb-3">
                  {blank.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {blank.colors.length > 3 && (
                    <span className="text-xs text-gray-500">+{blank.colors.length - 3}</span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <p className="font-['Lato']">{blank.price.toLocaleString('vi-VN')}₫</p>
                  <button className="text-[#ca6946] hover:underline">
                    Chi tiết
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <a
            href="#blanks"
            className="inline-block border-2 border-black hover:bg-black hover:text-white px-8 py-3 rounded-full transition-all"
          >
            View All Blanks ({blanks.length + 12})
          </a>
        </div>
      </div>
    </section>
  );
}